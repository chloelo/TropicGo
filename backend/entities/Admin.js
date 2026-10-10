// 後台管理員
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Admin',
  tableName: 'admins',

  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    email: {
      type: 'varchar',
      length: 100,
      unique: true,
      nullable: false,
    },
    password: {
      type: 'varchar',
      length: 255,
      nullable: false, // bcrypt hash
    },
    name: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      nullable: false,
    },
  },
});
