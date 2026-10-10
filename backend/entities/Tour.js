// 產品主檔
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Tour',
  tableName: 'tours',

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
    summary: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    description: {
      type: 'text',
      nullable: false,
    },
    content: {
      type: 'text',
      nullable: false, // 費用包含（簡短條列，跟 description 的長文介紹分開）
      default: '',
    },
    unit: {
      type: 'varchar',
      length: 10,
      default: '人',
      nullable: false,
    },
    departure_city: {
      type: 'varchar',
      length: 20,
      nullable: false,
    },
    origin_price: {
      type: 'integer',
      nullable: false,
    },
    price: {
      type: 'integer',
      nullable: false,
    },
    // 成團人數：報名滿這個人數才會出團
    min_group_size: {
      type: 'integer',
      default: 15,
      nullable: false,
    },
    is_popular: {
      type: 'boolean',
      default: false,
      nullable: false,
    },
    is_enabled: {
      type: 'boolean',
      default: true,
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      nullable: false,
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
      nullable: false,
    },
  },

  relations: {
    // 所屬地區，透過 region_id 對應到 Region
    region: {
      type: 'many-to-one',
      target: 'Region',
      joinColumn: {
        name: 'region_id',
      },
      nullable: false,
    },
    images: {
      type: 'one-to-many',
      target: 'TourImage',
      inverseSide: 'tour',
    },
  },
});
