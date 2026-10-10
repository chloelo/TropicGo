// 地區分類（亞洲、美洲、非洲、大洋洲）
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Region',
  tableName: 'regions',

  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    name: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    slug: {
      type: 'varchar',
      length: 50,
      unique: true,
      nullable: false,
    },
  },
});
