<template>
  <div class="backpage backpage-coupons">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-end my-3">
            <button
              type="button"
              class="btn btn-warning"
              @click="openModal('new')"
            >
              建立新的優惠卷
            </button>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">名稱</th>
                  <th scope="col">折扣百分比</th>
                  <th scope="col">到期日</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in coupons"
                  :key="item.id"
                >
                  <th scope="row">{{ item.title }}</th>
                  <td>{{ item.percent }}</td>
                  <td>{{ item.deadline.datetime }}</td>
                  <td>
                    <label class="switch">
                      <input
                        type="checkbox"
                        disabled
                        :checked="item.enabled"
                      />
                      <span class="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="openModal('edit', item)"
                        :disabled="btnLoading === item.id"
                      >
                        編輯
                        <span
                          v-if="btnLoading === item.id"
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="openModal('del', item)"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination
            :pages="pagination"
            @emitpage="getCoupons"
          ></Pagination>
        </div>
      </div>

    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5
              class="modal-title"
              id="staticBackdropLabel"
            ><span>{{ isNew ? '新增優惠卷' : '修改優惠卷資訊' }}</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="coupon_title">標題</label>
              <input
                v-model="tempCoupon.title"
                id="coupon_title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
                required
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                v-model="tempCoupon.code"
                id="coupon_code"
                type="text"
                class="form-control"
                placeholder="請輸入優惠碼"
                required
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                v-model="deadline_date"
                id="due_date"
                type="date"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="due_time">到期時間</label>
              <input
                v-model="deadline_time"
                id="due_time"
                type="time"
                class="form-control"
                step="1"
                required
              />
            </div>
            <div class="form-group">
              <label for="discount">折扣百分比</label>
              <input
                v-model="tempCoupon.percent"
                id="discount"
                type="number"
                class="form-control"
                placeholder="請輸入折扣百分比"
                required
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  v-model="tempCoupon.enabled"
                  id="enabled"
                  class="form-check-input"
                  type="checkbox"
                />
                <label
                  class="form-check-label"
                  for="enabled"
                >是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >取消</button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="updateCoupons"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal del -->
    <div
      id="delCouponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品
            (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCoupon(tempCoupon.id)"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->
  </div>
</template>
<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      isNew: false,
      isLoading: false,
      btnLoading: '',
      pagination: {},
      coupons: [
        // {
        //   title: '',
        //   code: '',
        //   percent: 0,
        //   enabled: true,
        //   deadline: {
        //     datetime: '2020',
        //   },
        // },
      ],
      tempCoupon: {
        deadline_at: '',
      },
      deadline_date: '',
      deadline_time: '',
    };
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.pagination = res.data.meta.pagination;
          this.coupons = res.data.data;
          if (this.tempCoupon.id || this.isNew) {
            this.tempCoupon = { deadline_at: '' };
            this.deadline_date = '';
            this.deadline_time = '';
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    openModal(status, item) {
      switch (status) {
        case 'new': {
          this.tempCoupon = { deadline_at: '' };
          this.deadline_date = '';
          this.deadline_time = '';
          this.isNew = true;
          $('#couponModal').modal('show');
          break;
        }
        case 'edit': {
          this.isNew = false;
          this.btnLoading = item.id;
          const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${item.id}`;
          this.$http
            .get(api)
            .then((res) => {
              this.btnLoading = '';
              this.tempCoupon = res.data.data;

              // 陣列解構賦值
              [
                this.deadline_date,
                this.deadline_time,
              ] = this.tempCoupon.deadline.datetime.split(' ');
              $('#couponModal').modal('show');
            })
            .catch(() => {
              this.btnLoading = '';
            });
          break;
        }
        case 'del': {
          this.tempCoupon = JSON.parse(JSON.stringify(item));
          $('#delCouponModal').modal('show');
          break;
        }
        default:
          break;
      }
    },
    updateCoupons() {
      let httpWay = 'post';
      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let status = '新增成功囉，ya ~';
      if (!this.isNew) {
        httpWay = 'patch';
        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
        status = '更新成功囉，ya ~';
      }
      this.tempCoupon.deadline_at = `${this.deadline_date} ${this.deadline_time}`;
      this.$http[httpWay](api, this.tempCoupon)
        .then(() => {
          $('#couponModal').modal('hide');
          this.$bus.$emit('msg:push', status, 'success');
          this.getCoupons();
        })
        .catch(() => {
          $('#couponModal').modal('hide');
          this.$bus.$emit('msg:push', '登愣~~出現錯誤了！', 'danger');
        });
    },
    deleteCoupon() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
      this.$http
        .delete(api)
        .then(() => {
          $('#delCouponModal').modal('hide');
          this.$bus.$emit('msg:push', '刪除成功囉，ya ~', 'success');
          this.getCoupons();
        })
        .catch(() => {
          $('#delCouponModal').modal('hide');
          this.$bus.$emit('msg:push', '登愣~~出現錯誤了！', 'danger');
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
