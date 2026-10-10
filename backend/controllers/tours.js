const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');

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
    res.json({ status: 'success', data: tour });
  },
};

module.exports = toursController;
