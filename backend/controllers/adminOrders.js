const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');

const PAGE_SIZE = 10;
const VALID_STATUSES = ['PENDING', 'PAID', 'CANCELLED', 'COMPLETED'];

const adminOrdersController = {
  // GET /api/admin/orders?page=1
  async getOrders(req, res) {
    const page = Number(req.query.page) || 1;
    const orderRepo = dataSource.getRepository('Order');

    const [orders, total] = await orderRepo.findAndCount({
      relations: { items: true, coupon: true },
      order: { created_at: 'DESC' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    res.json({
      status: 'success',
      data: orders,
      meta: { page, pageSize: PAGE_SIZE, total, totalPages: Math.ceil(total / PAGE_SIZE) },
    });
  },

  // PATCH /api/admin/orders/:id/status  { status: 'PAID' }
  async updateStatus(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return next(appError(400, `狀態必須是 ${VALID_STATUSES.join('/')} 其中之一`));
    }

    const orderRepo = dataSource.getRepository('Order');
    const existing = await orderRepo.findOneBy({ id });
    if (!existing) return next(appError(400, '訂單不存在'));

    await orderRepo.update(id, { status });
    const updated = await orderRepo.findOne({
      where: { id },
      relations: { items: true, coupon: true },
    });

    res.json({ status: 'success', data: updated });
  },
};

module.exports = adminOrdersController;
