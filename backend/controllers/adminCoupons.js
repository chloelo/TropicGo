const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');
const { isValidString, isInteger } = require('../utils/validUtils');

const PAGE_SIZE = 10;

function validateCouponInput(body) {
  const { title, code, percent, due_date } = body;

  if (!isValidString(title)) return '請輸入優惠券名稱';
  if (!isValidString(code)) return '請輸入優惠碼';
  if (!isInteger(percent) || percent <= 0 || percent > 100) return '折扣百分比須為 1~100 的整數';
  if (!isValidString(due_date) || Number.isNaN(Date.parse(due_date))) return '請輸入正確的到期日';
  return null;
}

const adminCouponsController = {
  // GET /api/admin/coupons?page=1
  async getCoupons(req, res) {
    const page = Number(req.query.page) || 1;
    const couponRepo = dataSource.getRepository('Coupon');

    const [coupons, total] = await couponRepo.findAndCount({
      order: { due_date: 'DESC' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    res.json({
      status: 'success',
      data: coupons,
      meta: { page, pageSize: PAGE_SIZE, total, totalPages: Math.ceil(total / PAGE_SIZE) },
    });
  },

  // POST /api/admin/coupons
  async postCoupon(req, res, next) {
    const errorMessage = validateCouponInput(req.body);
    if (errorMessage) return next(appError(400, errorMessage));

    const { title, code, percent, due_date, is_enabled } = req.body;

    const couponRepo = dataSource.getRepository('Coupon');
    const existing = await couponRepo.findOneBy({ code });
    if (existing) return next(appError(400, '此優惠碼已存在'));

    const coupon = await couponRepo.save({
      title,
      code,
      percent,
      due_date,
      is_enabled: is_enabled === undefined ? true : Boolean(is_enabled),
    });

    res.status(201).json({ status: 'success', data: coupon });
  },

  // PUT /api/admin/coupons/:id
  async putCoupon(req, res, next) {
    const { id } = req.params;
    const couponRepo = dataSource.getRepository('Coupon');
    const existing = await couponRepo.findOneBy({ id });
    if (!existing) return next(appError(400, '優惠券不存在'));

    const errorMessage = validateCouponInput(req.body);
    if (errorMessage) return next(appError(400, errorMessage));

    const { title, code, percent, due_date, is_enabled } = req.body;

    const codeTaken = await couponRepo.findOneBy({ code });
    if (codeTaken && codeTaken.id !== id) return next(appError(400, '此優惠碼已存在'));

    await couponRepo.update(id, {
      title,
      code,
      percent,
      due_date,
      is_enabled: Boolean(is_enabled),
    });

    const updated = await couponRepo.findOneBy({ id });
    res.json({ status: 'success', data: updated });
  },

  // DELETE /api/admin/coupons/:id
  async deleteCoupon(req, res, next) {
    const { id } = req.params;
    const couponRepo = dataSource.getRepository('Coupon');
    const existing = await couponRepo.findOneBy({ id });
    if (!existing) return next(appError(400, '優惠券不存在'));

    try {
      await couponRepo.delete(id);
    } catch {
      return next(appError(400, '此優惠券已被訂單使用,無法刪除,可改為停用(is_enabled)'));
    }

    res.json({ status: 'success', data: null });
  },
};

module.exports = adminCouponsController;
