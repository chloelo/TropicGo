// 訂單明細：存下單當時的名稱和價格（價格快照），不受之後產品改價影響
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'OrderItem',
  tableName: 'order_items',

  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    title_snapshot: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    unit_price_snapshot: {
      type: 'integer',
      nullable: false,
    },
    quantity: {
      type: 'integer',
      nullable: false,
    },
    subtotal: {
      type: 'integer',
      nullable: false,
    },
  },

  relations: {
    order: {
      type: 'many-to-one',
      target: 'Order',
      joinColumn: {
        name: 'order_id',
      },
      nullable: false,
    },
    tour: {
      type: 'many-to-one',
      target: 'Tour',
      joinColumn: {
        name: 'tour_id',
      },
      nullable: false,
    },
  },
});
