const { dataSource } = require('../db/data-source');
const appError = require('../utils/appError');
const { isValidString } = require('../utils/validUtils');

const couponsController = {
  // POST /api/coupons/check  { code }
  async checkCoupon(req, res, next) {
    const { code } = req.body;
    if (!isValidString(code)) return next(appError(400, '請輸入優惠碼'));

    const couponRepo = dataSource.getRepository('Coupon');
    const coupon = await couponRepo.findOneBy({ code });

    if (!coupon || !coupon.is_enabled || new Date(coupon.due_date) < new Date()) {
      return next(appError(400, '優惠碼無效或已過期'));
    }

    res.json({
      status: 'success',
      data: { id: coupon.id, title: coupon.title, percent: coupon.percent },
    });
  },
};

module.exports = couponsController;
