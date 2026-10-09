// entities/TourImage.js — 行程圖片(一對多,取代舊版 imageUrl[] 陣列)
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
