// 梯次：同一個產品的不同出發日期，各自有名額上限
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'TourDeparture',
  tableName: 'tour_departures',

  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    departure_date: {
      type: 'date',
      nullable: false,
    },
    capacity: {
      type: 'integer',
      nullable: false,
    },
    // 已報名人數：下單時鎖住這一列再累加，不用每次加總訂單明細，避免同時下單造成超賣
    booked_count: {
      type: 'integer',
      default: 0,
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
    tour: {
      type: 'many-to-one',
      target: 'Tour',
      joinColumn: {
        name: 'tour_id',
      },
      nullable: false,
    },
  },

  // 同一個產品同一天只能有一個梯次；tour_id 在最前面，依產品查梯次時也能用到這個索引
  uniques: [
    {
      name: 'UQ_tour_departures_tour_date',
      columns: ['tour', 'departure_date'],
    },
  ],

  // 資料庫層的最後防線：程式有錯也不會寫入超過名額或負數的人數
  checks: [
    {
      name: 'CHK_tour_departures_booked_count',
      expression: '"booked_count" >= 0 AND "booked_count" <= "capacity"',
    },
    {
      name: 'CHK_tour_departures_capacity',
      expression: '"capacity" > 0',
    },
  ],
});
