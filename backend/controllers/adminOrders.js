const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');
const { lockDepartures } = require('../utils/departures');
const { ORDER_RELATIONS, toOrderResponse } = require('../utils/orders');

const PAGE_SIZE = 10;

/**
 * 訂單取消後，把明細報名的人數從梯次的已報名人數扣回去。
 * 加入梯次功能前建立的明細沒有梯次，直接略過
 * @param {import('typeorm').EntityManager} manager
 * @param {string} orderId
 */
async function releaseSeats(manager, orderId) {
  const items = await manager.getRepository('OrderItem').find({
    where: { order: { id: orderId } },
    relations: { departure: true },
  });
  const bookedItems = items.filter((item) => item.departure);
  const departures = await lockDepartures(
    manager,
    bookedItems.map((item) => item.departure.id),
  );

  const departureRepo = manager.getRepository('TourDeparture');
  for (const item of bookedItems) {
    const departure = departures.get(item.departure.id);
    departure.booked_count -= item.quantity;
    await departureRepo.update(departure.id, { booked_count: departure.booked_count });
  }
}

const adminOrdersController = {
  // GET /api/admin/orders?page=1
  async getOrders(req, res) {
    const page = Number(req.query.page) || 1;
    const orderRepo = dataSource.getRepository('Order');

    const [orders, total] = await orderRepo.findAndCount({
      relations: ORDER_RELATIONS,
      order: { created_at: 'DESC' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    res.json({
      status: 'success',
      data: orders.map(toOrderResponse),
      meta: { page, pageSize: PAGE_SIZE, total, totalPages: Math.ceil(total / PAGE_SIZE) },
    });
  },

  // PATCH /api/admin/orders/:id/status  { status: 'PAID' }
  async updateStatus(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      await dataSource.transaction(async (manager) => {
        const orderRepo = manager.getRepository('Order');
        // 鎖住訂單：同時送出兩次取消時，第二次要等第一次完成，才不會把名額釋出兩次
        const existing = await orderRepo.findOne({
          where: { id },
          lock: { mode: 'pessimistic_write' },
        });
        if (!existing) throw appError(400, '訂單不存在');
        if (existing.status === status) return;
        // 取消時已經釋出名額，改回其他狀態要重新佔名額，可能已經被別人報走，所以不開放
        if (existing.status === 'CANCELLED') {
          throw appError(400, '已取消的訂單不能改回其他狀態');
        }

        await orderRepo.update(id, { status });
        if (status === 'CANCELLED') await releaseSeats(manager, id);
      });
    } catch (err) {
      return next(err.status ? err : appError(500, '訂單狀態更新失敗'));
    }

    const orderRepo = dataSource.getRepository('Order');
    const updated = await orderRepo.findOne({
      where: { id },
      relations: ORDER_RELATIONS,
    });

    res.json({ status: 'success', data: toOrderResponse(updated) });
  },
};

module.exports = adminOrdersController;
