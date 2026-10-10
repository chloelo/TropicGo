const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');
const { isValidString, isNonNegativeInteger } = require('../utils/validUtils');

const PAGE_SIZE = 10;

// 出發城市的選項，跟 docs/openapi.yaml 的 TourInput.departure_city enum 要一致
const DEPARTURE_CITIES = ['台北', '桃園', '台中', '高雄'];

function validateTourInput(body) {
  const {
    title, region_id, summary, description, content,
    unit, departure_city, origin_price, price, images,
  } = body;

  if (!isValidString(title)) return '請輸入行程名稱';
  if (!isValidString(region_id)) return '請選擇地區';
  if (!isValidString(summary)) return '請輸入行程摘要';
  if (!isValidString(description)) return '請輸入行程介紹';
  if (!isValidString(content)) return '請輸入費用包含說明';
  if (!isValidString(unit)) return '請輸入單位';
  if (!DEPARTURE_CITIES.includes(departure_city)) return '請選擇出發城市';
  if (!isNonNegativeInteger(origin_price)) return '原價格式錯誤';
  if (!isNonNegativeInteger(price)) return '優惠價格式錯誤';
  if (!Array.isArray(images) || images.length === 0 || !images.every(isValidString)) {
    return '請至少提供一張圖片';
  }
  return null;
}

const adminToursController = {
  // GET /api/admin/tours?page=1
  async getTours(req, res) {
    const page = Number(req.query.page) || 1;
    const tourRepo = dataSource.getRepository('Tour');

    const [tours, total] = await tourRepo.findAndCount({
      relations: { region: true, images: true },
      order: { created_at: 'DESC' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    res.json({
      status: 'success',
      data: tours,
      meta: { page, pageSize: PAGE_SIZE, total, totalPages: Math.ceil(total / PAGE_SIZE) },
    });
  },

  // GET /api/admin/tours/:id
  async getTour(req, res, next) {
    const { id } = req.params;
    const tourRepo = dataSource.getRepository('Tour');
    const tour = await tourRepo.findOne({ where: { id }, relations: { region: true, images: true } });
    if (!tour) return next(appError(400, '行程不存在'));
    res.json({ status: 'success', data: tour });
  },

  // POST /api/admin/tours
  async postTour(req, res, next) {
    const errorMessage = validateTourInput(req.body);
    if (errorMessage) return next(appError(400, errorMessage));

    const {
      title, region_id, summary, description, content, unit, departure_city,
      origin_price, price, is_popular, is_enabled, images,
    } = req.body;

    const regionRepo = dataSource.getRepository('Region');
    const region = await regionRepo.findOneBy({ id: region_id });
    if (!region) return next(appError(400, '地區不存在'));

    const tourRepo = dataSource.getRepository('Tour');
    const tour = await tourRepo.save({
      title, summary, description, content, unit, departure_city, origin_price, price,
      is_popular: Boolean(is_popular),
      is_enabled: is_enabled === undefined ? true : Boolean(is_enabled),
      region: { id: region_id },
    });

    const tourImageRepo = dataSource.getRepository('TourImage');
    await tourImageRepo.save(
      images.map((url, index) => ({ url, sort_order: index, tour: { id: tour.id } })),
    );

    const created = await tourRepo.findOne({
      where: { id: tour.id },
      relations: { region: true, images: true },
    });
    res.status(201).json({ status: 'success', data: created });
  },

  // PUT /api/admin/tours/:id
  async putTour(req, res, next) {
    const { id } = req.params;
    const tourRepo = dataSource.getRepository('Tour');
    const existing = await tourRepo.findOneBy({ id });
    if (!existing) return next(appError(400, '行程不存在'));

    const errorMessage = validateTourInput(req.body);
    if (errorMessage) return next(appError(400, errorMessage));

    const {
      title, region_id, summary, description, content, unit, departure_city,
      origin_price, price, is_popular, is_enabled, images,
    } = req.body;

    const regionRepo = dataSource.getRepository('Region');
    const region = await regionRepo.findOneBy({ id: region_id });
    if (!region) return next(appError(400, '地區不存在'));

    await tourRepo.update(id, {
      title, summary, description, content, unit, departure_city, origin_price, price,
      is_popular: Boolean(is_popular),
      is_enabled: Boolean(is_enabled),
      region: { id: region_id },
    });

    const tourImageRepo = dataSource.getRepository('TourImage');
    await tourImageRepo.delete({ tour: { id } });
    await tourImageRepo.save(
      images.map((url, index) => ({ url, sort_order: index, tour: { id } })),
    );

    const updated = await tourRepo.findOne({
      where: { id },
      relations: { region: true, images: true },
    });
    res.json({ status: 'success', data: updated });
  },

  // DELETE /api/admin/tours/:id
  async deleteTour(req, res, next) {
    const { id } = req.params;
    const tourRepo = dataSource.getRepository('Tour');
    const existing = await tourRepo.findOneBy({ id });
    if (!existing) return next(appError(400, '行程不存在'));

    try {
      // 包在 transaction 裡：產品因為有訂單關聯刪不掉時，前面刪掉的圖片也會一起 rollback，
      // 不會留下「產品還在、圖片被清空」的狀態
      await dataSource.transaction(async (manager) => {
        await manager.getRepository('TourImage').delete({ tour: { id } });
        await manager.getRepository('Tour').delete(id);
      });
    } catch {
      return next(appError(400, '此行程已有訂單紀錄,無法刪除,可改為下架(is_enabled)'));
    }

    res.json({ status: 'success', data: null });
  },
};

module.exports = adminToursController;
