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
      // images 沒指定排序的話,TypeORM 不保證順序跟 sort_order 一致,列表跟詳情頁各自查出來的
      // 第一張可能不同——卡片封面跟進去詳情頁看到的主圖對不上,就是這裡漏寫的
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
