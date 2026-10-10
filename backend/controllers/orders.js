const { customAlphabet } = require('nanoid');
const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');
const { isValidString, isNonNegativeInteger } = require('../utils/validUtils');

// 訂單編號不含容易看錯的字元（0/O、1/I/L），客服人工對單時比較不會唸錯、抄錯
const generateOrderNumber = customAlphabet('23456789ABCDEFGHJKMNPQRSTUVWXYZ', 10);

// 付款方式的選項（存英文代碼，畫面上的中文由前端 utils/payment.ts 對應），
// 跟 docs/openapi.yaml 的 OrderInput.payment_method enum 要一致
const PAYMENT_METHODS = ['Credit', 'LinePay', 'ApplePay', 'GooglePay', 'ATM', 'CVS'];

// 每個產品一次最多報名的人數，跟前端 stores/cart.ts 的 MAX_QUANTITY、openapi.yaml 要一致
const MAX_QUANTITY = 20;

function validateOrderInput(body) {
  const { customer_name, customer_email, customer_phone, customer_address, payment_method, items } = body;

  if (!isValidString(customer_name)) return '請輸入姓名';
  if (!isValidString(customer_email)) return '請輸入 Email';
  if (!isValidString(customer_phone)) return '請輸入電話';
  if (!isValidString(customer_address)) return '請輸入地址';
  if (!PAYMENT_METHODS.includes(payment_method)) return '請選擇付款方式';
  if (!Array.isArray(items) || items.length === 0) return '購物車是空的';

  for (const item of items) {
    if (!isValidString(item.tour_id)) return '行程資料錯誤';
    if (!isNonNegativeInteger(item.quantity) || item.quantity <= 0) return '數量格式錯誤';
    if (item.quantity > MAX_QUANTITY) return `每個產品最多報名 ${MAX_QUANTITY} 人`;
  }
  return null;
}

const ordersController = {
  // POST /api/orders
  async postOrder(req, res, next) {
    const errorMessage = validateOrderInput(req.body);
    if (errorMessage) return next(appError(400, errorMessage));

    const {
      customer_name, customer_email, customer_phone, customer_address,
      payment_method, message, coupon_code, items,
    } = req.body;

    try {
      // 整個建立訂單的過程包在 transaction 裡：中途任何一步丟錯，前面存的資料都會一起 rollback
      const savedOrder = await dataSource.transaction(async (manager) => {
        const tourRepo = manager.getRepository('Tour');
        const orderRepo = manager.getRepository('Order');
        const orderItemRepo = manager.getRepository('OrderItem');
        const couponRepo = manager.getRepository('Coupon');

        // 1. 逐一查詢產品目前的價格，組成訂單明細（價格快照）
        const orderItemsData = [];
        let rawTotal = 0;

        for (const item of items) {
          const tour = await tourRepo.findOneBy({ id: item.tour_id, is_enabled: true });
          if (!tour) {
            // 丟出錯誤會讓整個 transaction rollback
            throw appError(400, `行程不存在或已下架:${item.tour_id}`);
          }
          const subtotal = tour.price * item.quantity;
          rawTotal += subtotal;
          orderItemsData.push({
            tour: { id: tour.id },
            title_snapshot: tour.title,
            unit_price_snapshot: tour.price,
            quantity: item.quantity,
            subtotal,
          });
        }

        // 2. 有帶優惠碼的話，驗證後套用折扣（percent 90 代表打 9 折，付原價的 90%）
        let coupon = null;
        let totalAmount = rawTotal;
        if (coupon_code) {
          coupon = await couponRepo.findOneBy({ code: coupon_code });
          if (!coupon || !coupon.is_enabled || new Date(coupon.due_date) < new Date()) {
            throw appError(400, '優惠碼無效或已過期');
          }
          totalAmount = Math.round((rawTotal * coupon.percent) / 100);
        }

        // 3. 建立訂單主檔
        const order = await orderRepo.save({
          order_number: generateOrderNumber(),
          customer_name,
          customer_email,
          customer_phone,
          customer_address,
          payment_method,
          message,
          coupon: coupon ? { id: coupon.id } : null,
          total_amount: totalAmount,
        });

        // 4. 建立訂單明細，關聯回訂單
        await orderItemRepo.save(
          orderItemsData.map((item) => ({ ...item, order: { id: order.id } })),
        );

        return order;
      });

      const orderRepo = dataSource.getRepository('Order');
      const fullOrder = await orderRepo.findOne({
        where: { id: savedOrder.id },
        relations: { items: true, coupon: true },
      });

      res.status(201).json({ status: 'success', data: fullOrder });
    } catch (err) {
      return next(err.status ? err : appError(500, '訂單建立失敗'));
    }
  },

  // GET /api/orders/:id
  async getOrder(req, res, next) {
    const { id } = req.params;
    const orderRepo = dataSource.getRepository('Order');
    const order = await orderRepo.findOne({
      where: { id },
      relations: { items: true, coupon: true },
    });
    if (!order) return next(appError(400, '訂單不存在'));
    res.json({ status: 'success', data: order });
  },

  // POST /api/orders/:id/pay
  // 模擬付款（沒有串金流）：結帳時按「確認付款」，待付款的訂單改成已付款
  async payOrder(req, res, next) {
    const { id } = req.params;
    const orderRepo = dataSource.getRepository('Order');
    const existing = await orderRepo.findOneBy({ id });
    if (!existing) return next(appError(400, '訂單不存在'));
    if (existing.status !== 'PENDING') return next(appError(400, '這筆訂單不是待付款狀態'));

    await orderRepo.update(id, { status: 'PAID' });
    const updated = await orderRepo.findOne({
      where: { id },
      relations: { items: true, coupon: true },
    });
    res.json({ status: 'success', data: updated });
  },
};

module.exports = ordersController;
