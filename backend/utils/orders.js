// 查訂單時一起載入的關聯：明細要帶出梯次，畫面才能顯示出發日期
const ORDER_RELATIONS = { items: { departure: true }, coupon: true };

/**
 * 整理成回傳給前端的訂單：明細的梯次只留 id 和出發日期，
 * 名額上限、已報名人數這些內部數字不回傳。加入梯次功能前的舊訂單，梯次是 null
 */
function toOrderResponse(order) {
  return {
    ...order,
    items: order.items.map(({ departure, ...item }) => ({
      ...item,
      departure: departure ? { id: departure.id, departure_date: departure.departure_date } : null,
    })),
  };
}

module.exports = { ORDER_RELATIONS, toOrderResponse };
