// 主機用 UTC 時間，跟台灣差 8 小時；判斷梯次是否已截止要用台灣的日期
const TAIPEI_DATE_FORMAT = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Taipei',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** 台灣今天的日期，格式 YYYY-MM-DD，可以直接跟 date 欄位的字串比較 */
function getTaipeiToday() {
  return TAIPEI_DATE_FORMAT.format(new Date());
}

/**
 * 在 transaction 裡依序鎖住梯次（SELECT ... FOR UPDATE），連同所屬產品一起回傳。
 * 依 id 排序後再鎖：多筆訂單包含相同的幾個梯次時，大家鎖的順序一致，不會互相等對方而形成死結
 * @param {import('typeorm').EntityManager} manager
 * @param {string[]} departureIds
 * @returns {Promise<Map<string, object>>} 以梯次 id 對應梯次資料；不存在的 id 不會出現在 Map 裡
 */
async function lockDepartures(manager, departureIds) {
  const locked = new Map();
  const sortedIds = [...new Set(departureIds)].sort();

  for (const id of sortedIds) {
    const departure = await manager
      .createQueryBuilder('TourDeparture', 'departure')
      .innerJoinAndSelect('departure.tour', 'tour')
      .where('departure.id = :id', { id })
      // 只鎖梯次這一列，產品資料只讀不鎖
      .setLock('pessimistic_write', undefined, ['departure'])
      .getOne();
    if (departure) locked.set(id, departure);
  }
  return locked;
}

module.exports = { getTaipeiToday, lockDepartures };
