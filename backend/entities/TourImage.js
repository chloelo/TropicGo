// 產品圖片（一個產品多張，依 sort_order 排序）
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'TourImage',
  tableName: 'tour_images',

  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    url: {
      type: 'varchar',
      length: 2048,
      nullable: false,
    },
    sort_order: {
      type: 'integer',
      default: 0,
      nullable: false,
    },
  },

  relations: {
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
