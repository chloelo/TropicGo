// 優惠券
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Coupon',
  tableName: 'coupons',

  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    title: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    code: {
      type: 'varchar',
      length: 50,
      unique: true,
      nullable: false,
    },
    percent: {
      type: 'integer',
      nullable: false,
    },
    due_date: {
      type: 'timestamp',
      nullable: false,
    },
    is_enabled: {
      type: 'boolean',
      default: true,
      nullable: false,
    },
  },
});
