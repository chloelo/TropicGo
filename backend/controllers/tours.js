const { MoreThan } = require('typeorm');
const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');
const { getTaipeiToday } = require('../utils/departures');

const toursController = {
  // GET /api/tours?region=asia
  async getTours(req, res, next) {
    const { region } = req.query;
    const tourRepo = dataSource.getRepository('Tour');

    const where = { is_enabled: true };
    if (region) {
      const regionRepo = dataSource.getRepository('Region');
      const regionEntity = await regionRepo.findOneBy({ slug: region });
      if (!regionEntity) return next(appError(400, '地區不存在'));
      where.region = { id: regionEntity.id };
    }

    const tours = await tourRepo.find({
      where,
      relations: { region: true, images: true },
      // 圖片要指定排序：沒指定的話 TypeORM 不保證順序，列表的封面和詳情頁的主圖可能不同
      order: { created_at: 'DESC', images: { sort_order: 'ASC' } },
    });

    res.json({ status: 'success', data: tours });
  },

  // GET /api/tours/:id
  async getTour(req, res, next) {
    const { id } = req.params;
    const tourRepo = dataSource.getRepository('Tour');
    const tour = await tourRepo.findOne({
      where: { id, is_enabled: true },
      relations: { region: true, images: true },
      order: { images: { sort_order: 'ASC' } },
    });
    if (!tour) return next(appError(400, '行程不存在'));

    // 只列出還能報名的梯次（開放中、出發日期在今天之後），額滿的也列出來讓客人知道
    const departures = await dataSource.getRepository('TourDeparture').find({
      where: { tour: { id }, is_enabled: true, departure_date: MoreThan(getTaipeiToday()) },
      order: { departure_date: 'ASC' },
    });

    res.json({
      status: 'success',
      data: {
        ...tour,
        // 只回傳前台需要的欄位，名額上限、已報名人數等內部數字不直接給
        departures: departures.map((departure) => ({
          id: departure.id,
          departure_date: departure.departure_date,
          remaining_seats: departure.capacity - departure.booked_count,
          is_confirmed: departure.booked_count >= tour.min_group_size,
        })),
      },
    });
  },
};

module.exports = toursController;
