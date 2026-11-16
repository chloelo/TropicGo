const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');
const { getTaipeiToday } = require('../utils/departures');

// PostgreSQL 違反 UNIQUE 限制的錯誤代碼
const UNIQUE_VIOLATION = '23505';

const adminDeparturesController = {
  // GET /api/admin/tours/:id/departures
  async getDepartures(req, res, next) {
    const { id } = req.params;
    const tour = await dataSource.getRepository('Tour').findOneBy({ id });
    if (!tour) return next(appError(400, '行程不存在'));

    const departures = await dataSource.getRepository('TourDeparture').find({
      where: { tour: { id } },
      order: { departure_date: 'ASC' },
    });
    res.json({ status: 'success', data: departures });
  },

  // POST /api/admin/tours/:id/departures
  async postDeparture(req, res, next) {
    const { id } = req.params;
    const { departure_date, capacity, is_enabled } = req.body;
    // 要看當下的日期，所以不放在 schema 裡。修改梯次（patchDeparture）只在日期真的有變時才檢查：
    // 已經出發的梯次也要能單獨修改名額或開放狀態
    if (departure_date <= getTaipeiToday()) return next(appError(400, '出發日期必須晚於今天'));

    const tour = await dataSource.getRepository('Tour').findOneBy({ id });
    if (!tour) return next(appError(400, '行程不存在'));

    try {
      const departure = await dataSource.getRepository('TourDeparture').save({
        tour: { id },
        departure_date,
        capacity,
        is_enabled: is_enabled === undefined ? true : is_enabled,
      });
      res.status(201).json({ status: 'success', data: departure });
    } catch (err) {
      if (err.code === UNIQUE_VIOLATION) return next(appError(400, '這個日期已經有梯次'));
      return next(appError(500, '梯次建立失敗'));
    }
  },

  // PATCH /api/admin/departures/:id
  async patchDeparture(req, res, next) {
    const { id } = req.params;
    const { departure_date, capacity, is_enabled } = req.body;
    try {
      const updated = await dataSource.transaction(async (manager) => {
        const departureRepo = manager.getRepository('TourDeparture');
        // 鎖住梯次再檢查：同時有人下單時，要用最新的已報名人數判斷名額能不能調降
        const existing = await departureRepo.findOne({
          where: { id },
          lock: { mode: 'pessimistic_write' },
        });
        if (!existing) throw appError(400, '梯次不存在');

        const changes = {};
        if (departure_date !== undefined && departure_date !== existing.departure_date) {
          // 已報名的客人是依這個日期報名的，改日期等於改了客人的行程
          if (existing.booked_count > 0) throw appError(400, '已有人報名，不能修改出發日期');
          if (departure_date <= getTaipeiToday()) throw appError(400, '出發日期必須晚於今天');
          changes.departure_date = departure_date;
        }
        if (capacity !== undefined) {
          if (capacity < existing.booked_count) {
            throw appError(400, `名額不能少於已報名人數（${existing.booked_count} 人）`);
          }
          changes.capacity = capacity;
        }
        if (is_enabled !== undefined) changes.is_enabled = is_enabled;

        if (Object.keys(changes).length) await departureRepo.update(id, changes);
        return departureRepo.findOneBy({ id });
      });
      res.json({ status: 'success', data: updated });
    } catch (err) {
      if (err.code === UNIQUE_VIOLATION) return next(appError(400, '這個日期已經有梯次'));
      return next(err.status ? err : appError(500, '梯次更新失敗'));
    }
  },

  // DELETE /api/admin/departures/:id
  async deleteDeparture(req, res, next) {
    const { id } = req.params;
    const departureRepo = dataSource.getRepository('TourDeparture');
    const existing = await departureRepo.findOneBy({ id });
    if (!existing) return next(appError(400, '梯次不存在'));
    if (existing.booked_count > 0) {
      return next(appError(400, '已有人報名，無法刪除，可改為關閉報名'));
    }

    try {
      await departureRepo.delete(id);
    } catch {
      // 已取消的訂單明細仍連到這個梯次（外鍵），資料庫會擋下刪除
      return next(appError(400, '此梯次有訂單紀錄，無法刪除，可改為關閉報名'));
    }
    res.json({ status: 'success', data: null });
  },
};

module.exports = adminDeparturesController;
