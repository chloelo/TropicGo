// entities/Order.js — 訂單
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Order',
  tableName: 'orders',

  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    order_number: {
      type: 'varchar',
      length: 30,
      unique: true,
      nullable: false,
    },
    customer_name: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    customer_email: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    customer_phone: {
      type: 'varchar',
      length: 20,
      nullable: false,
    },
    customer_address: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    message: {
      type: 'text',
      nullable: true,
    },
    // 客人結帳時選的付款方式(沒有串金流,只是記錄);這個欄位是後來才加的,之前的訂單沒有值,所以允許 null
    payment_method: {
      type: 'varchar',
      length: 30,
      nullable: true,
    },
    total_amount: {
      type: 'integer',
      nullable: false,
    },
    status: {
      type: 'enum',
      enum: ['PENDING', 'PAID', 'CANCELLED', 'COMPLETED'],
      default: 'PENDING',
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      nullable: false,
    },
  },

  relations: {
    coupon: {
      type: 'many-to-one',
      target: 'Coupon',
      joinColumn: {
        name: 'coupon_id',
      },
      nullable: true,
    },
    items: {
      type: 'one-to-many',
      target: 'OrderItem',
      inverseSide: 'order',
    },
  },
});
