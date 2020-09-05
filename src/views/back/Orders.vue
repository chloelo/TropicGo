<template>
  <div class="backpage backpage-orders">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- <div class="d-flex justify-content-end my-3">
            <button
              type="button"
              class="btn btn-warning"
              @click="openModal('new')"
            >
              建立新的優惠卷
            </button>
          </div> -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">下單時間</th>
                  <th scope="col">商品</th>
                  <th scope="col">付款方式</th>
                  <th scope="col">應付金額</th>
                  <th scope="col">是否付款</th>

                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in orders"
                  :key="item.id"
                >
                  <td>{{ item.created.datetime }}</td>
                  <td>
                    <ul>
                      <li
                        v-for="(product,i) in item.products"
                        :key="i+1"
                      >
                        {{ product.product.title}} - {{ product.quantity }} 人
                      </li>
                    </ul>
                  </td>
                  <td>{{ item.payment }}</td>
                  <td>{{ item.amount }}</td>
                  <td>
                    <label class="switch">
                      <input
                        type="checkbox"
                        v-model="item.paid"
                        @change="setPaidStatus(item)"
                      />
                      <span class="slider round"></span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination
            :pages="pagination"
            @emitpage="getOrders"
          ></Pagination>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      pagination: {},
      orders: [],
    };
  },

  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.pagination = res.data.meta.pagination;
          this.orders = res.data.data;
          // if (this.tempCoupon.id || this.isNew) {
          //   this.tempCoupon = { deadline_at: '' };
          //   this.deadline_date = '';
          //   this.deadline_time = '';
          // }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    setPaidStatus(item) {
      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      if (!item.paid) {
        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }
      this.$http.patch(api, item.id).then(() => {
        this.$bus.$emit('msg:push', '付款狀態已修改囉', 'success');
        this.getOrders();
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
