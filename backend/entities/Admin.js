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
    // admin：完整權限；demo：公開給面試官的示範帳號，只能瀏覽，不能新增、修改、刪除
    role: {
      type: 'enum',
      enum: ['admin', 'demo'],
      default: 'admin',
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
      nullable: false,
    },
  },
});
