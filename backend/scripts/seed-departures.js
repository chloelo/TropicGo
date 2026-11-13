// 梯次範例資料：幫上架中的產品補上未來 6 個月的梯次，每個月 1 團。
// 只新增、不修改或刪除：哪個月份已經有梯次（包含後台新增、關閉報名的）就跳過那個月
require('dotenv').config();
const config = require('../config');
const { dataSource } = require('../db/data-source');
const { getTaipeiToday } = require('../utils/departures');

const MONTHS_AHEAD = 6;
// 出發日在週三到週六輪流：產品都是 5 天以上，這幾天出發都會涵蓋一個完整的週末
const WEEKDAYS = [3, 4, 5, 6];
// 名額都比成團人數（15 人）多，每團都有機會成團
const CAPACITIES = [20, 25, 30];

/** 某年某月第 n 個星期幾，回傳 YYYY-MM-DD（month 從 1 開始，weekday 0 是週日） */
function nthWeekdayOfMonth(year, month, weekday, n) {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const day = 1 + ((weekday - firstWeekday + 7) % 7) + (n - 1) * 7;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/** 從下個月開始的 MONTHS_AHEAD 個月，每個元素是 { year, month } */
function upcomingMonths() {
  const [year, month] = getTaipeiToday().split('-').map(Number);
  return Array.from({ length: MONTHS_AHEAD }, (_, i) => {
    const index = month + i; // month 是 1～12，當成從 0 起算的月份時，month + i 就是下個月起的第 i 個月
    return { year: year + Math.floor(index / 12), month: (index % 12) + 1 };
  });
}

async function seed() {
  await dataSource.initialize();
  console.log(`資料庫：${config.get('db.host')}`);

  const tourRepo = dataSource.getRepository('Tour');
  const departureRepo = dataSource.getRepository('TourDeparture');
  const months = upcomingMonths();

  // 依建立時間排序，每次執行時同一個產品分到的出發日、名額都一樣
  const tours = await tourRepo.find({
    where: { is_enabled: true },
    order: { created_at: 'ASC', id: 'ASC' },
  });

  let total = 0;
  for (const [index, tour] of tours.entries()) {
    // 每個產品固定一個出發日和第幾週：星期每個產品換一天，第幾週每 4 個產品換一次
    const weekday = WEEKDAYS[index % WEEKDAYS.length];
    const week = (Math.floor(index / WEEKDAYS.length) % 4) + 1;
    const capacity = CAPACITIES[index % CAPACITIES.length];

    const existing = await departureRepo.find({ where: { tour: { id: tour.id } } });
    const bookedMonths = new Set(existing.map((d) => d.departure_date.slice(0, 7)));

    const newDepartures = months
      .map(({ year, month }) => nthWeekdayOfMonth(year, month, weekday, week))
      .filter((date) => !bookedMonths.has(date.slice(0, 7)))
      .map((date) =>
        departureRepo.create({ tour: { id: tour.id }, departure_date: date, capacity }),
      );

    await departureRepo.save(newDepartures);
    total += newDepartures.length;
    console.log(
      newDepartures.length
        ? `+ ${tour.title}：新增 ${newDepartures.length} 團（${newDepartures.map((d) => d.departure_date).join('、')}）`
        : `= ${tour.title}：略過（已排滿）`,
    );
  }

  await dataSource.destroy();
  console.log(`Seed departures 完成，共新增 ${total} 團`);
}

seed().catch((err) => {
  console.error('Seed departures 失敗', err);
  process.exit(1);
});
