<template>
  <div class="front front-cart">
    <loading :active.sync="isLoading"></loading>
    <KV :title="title"></KV>
    <section class="zones zone_process">
      <div class="container ">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="step-wrap">
              <div class="step step1 done">
                <span class="num">1</span>
                <span class="txt">確認訂單</span>
              </div>
              <div
                class="step step2"
                :class="{done:step === 2}"
              >
                <span class="num">2</span>
                <span class="txt">填寫資料</span>
              </div>
              <div
                class="step step3"
                :class="{done:step === 3}"
              >
                <span class="num">3</span>
                <span class="txt">完成訂單</span>
              </div>
              <!-- <div class="bar"></div> -->
            </div>
            <div class="progress">
              <div
                class="progress-bar bg-secondary"
                :class="{step2:step === 2,step3:step === 3}"
                role="progressbar"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <!-- 流程 1 確認購物車 -->
    <section
      class="zones zone_cartList"
      v-if="step === 1"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-md-8"
            v-if="carts.length"
          >
            <div class="d-flex justify-content-between align-items-center mb-3">
              <router-link
                class="text-secondary"
                to="/products"
              > <span><i class="fas fa-chevron-left"></i></span> 繼續購物</router-link>
              <button
                type="button"
                class="btn btn-del btn-outline-light border-0"
                @click="removeAllCart"
              >
                <span>
                  <i class="fas fa-trash-alt"></i>
                </span>
                清空購物車
              </button>
            </div>
            <div
              class="d-flex bg-light align-items-center mb-4"
              v-for="item in carts"
              :key="item.product.id"
            >
              <div class="img-wrap pl-3">
                <img :src="item.product.imageUrl[0]">
              </div>

              <div class="w-100 p-3 position-relative">
                <a
                  href="#"
                  class="position-absolute close"
                  style="top: 16px; right: 16px;"
                  @click.prevent="removeCart(item.product.id)"
                ><i class="fas fa-times"></i></a>
                <p class="mb-0 font-weight-bold pr-4 text-africa">{{ item.product.title }}</p>
                <p
                  class="mb-1 text-muted"
                  style="font-size: 14px;"
                >{{ item.product.price | money }} / {{ item.product.unit }}</p>
                <div class="input-group-wrap mt-2">
                  <div class="input-group align-items-center">
                    <div class="input-group-prepend">
                      <button
                        :disabled="item.quantity === 1"
                        class="btn btn-outline-secondary border-right-0"
                        type="button"
                        @click.prevent="updateQuantity(item.product.id, item.quantity - 1)"
                      >
                        <span><i class="fas fa-minus"></i></span>
                      </button>
                    </div>
                    <input
                      v-model="item.quantity"
                      type="number"
                      min="1"
                      class="form-control text-center pl-3 text-secondary border-left-0 border-right-0"
                      aria-describedby="basic-addon1"
                      @change="
                            updateQuantity(item.product.id, item.quantity)
                          "
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary border-left-0"
                        type="button"
                        @click.prevent="updateQuantity(item.product.id, item.quantity + 1)"
                      >
                        <span><i class="fas fa-plus"></i></span>
                      </button>
                    </div>

                  </div>
                  <p class="mb-0 ml-auto">小計：{{ (item.product.price * item.quantity) | money }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-md-8"
            v-else
          >
            <div class="border-bottom my-2 py-2">
              <router-link
                class="text-secondary"
                to="/products"
              > <span><i class="fas fa-chevron-left"></i></span> 繼續購物</router-link>
            </div>
            <div class="d-flex justify-content-center align-items-center mb-3">
              <p>您尚未選擇任何行程喔 QQ，快去選購吧！</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border p-3 mb-3">
              <h4 class="font-weight-bold mb-2 border-bottom pb-2">訂單明細</h4>
              <div class="d-flex justify-content-between mt-4">
                <span>商品總額</span><span>{{ totalPrice | money }}</span>
              </div>
              <div class="d-flex justify-content-between mt-4">
                <div class="input-group input-group-sm coupon-wrap">

                  <input
                    v-model="couponCode"
                    type="text"
                    class="form-control"
                    aria-label="請輸入折扣碼"
                    placeholder="請輸入折扣碼"
                    aria-describedby="inputGroup-sizing-sm"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="inputGroup-sizing-sm"
                      @click.prevent="findCoupon"
                    >套用</button>

                  </div>
                </div>
              </div>
              <div
                class="d-flex justify-content-between mt-4"
                v-if="coupon.percent"
              >
                <p class="mb-0 font-weight-bold ">折扣後總計</p>
                <p class="mb-0 h4 font-weight-bold text-secondary">{{ totalPrice * (coupon.percent / 100) | money }}</p>
              </div>
              <button
                class="btn btn-secondary mt-3 btn-block"
                :disabled="!carts.length"
                @click.prevent="step = 2"
              >前往結帳 <span><i class="fas fa-chevron-right"></i></span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 流程 2 填寫表單 -->
    <section
      class="zones zone_form"
      v-if="step === 2"
    >
      <div class="container">
        <div class="row flex-row-reverse">
          <div class="col-md-6 col-lg-4">
            <div class="border p-4 mb-4">
              <h4 class="mb-4">訂單明細</h4>
              <div
                class="d-flex mb-3"
                v-for="item in carts"
                :key="item.product.id"
              >
                <img
                  :src="item.product.imageUrl[0]"
                  class="mr-2"
                  style="width: 48px; height: 48px; object-fit: cover"
                >
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <p class="mb-0 font-weight-bold">{{ item.product.title }}</p>
                    <p class="mb-0">{{ item.product.price | money }}</p>
                  </div>
                  <p class="mb-0 font-weight-bold">x {{ item.quantity }}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 font-weight-bold">總計</p>
                <p class="mb-0 h4 font-weight-bold">{{ totalPrice | money }}</p>
              </div>
              <a
                href="./checkout.html"
                class="btn btn-secondary btn-block mt-4"
              >確認訂單</a>
            </div>
          </div>
          <div class="col-lg-8 col-md-6">
            <div class="form-wrap">
              <h3 class="mb-3 font-weight-bold">客戶資訊</h3>
              <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="createOrder">
                  <div class="form-row">
                    <div class="col form-group">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors, classes }"
                      >
                        <label for="username">收件人姓名</label>
                        <input
                          type="text"
                          name="username"
                          class="form-control"
                          id="username"
                          placeholder="收件人姓名"
                          :class="classes"
                          v-model="order.name"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <validation-provider
                        rules="required|email"
                        v-slot="{ errors, classes }"
                      >
                        <label for="email">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Email"
                          :class="classes"
                          v-model="order.email"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <validation-provider
                        rules="required|numeric|min:8"
                        v-slot="{ errors, classes }"
                      >
                        <label for="tel">電話</label>
                        <input
                          type="tel"
                          class="form-control"
                          id="tel"
                          placeholder="電話"
                          :class="classes"
                          v-model="order.tel"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors, classes }"
                      >
                        <label for="address">地址</label>
                        <input
                          type="text"
                          class="form-control"
                          id="address"
                          placeholder="地址"
                          :class="classes"
                          v-model="order.address"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <label for="waytopay">購買方式</label>
                      <select
                        name="購買方式"
                        id="waytopay"
                        class="form-control"
                        v-model="order.payment"
                        required
                      >
                        <option
                          value
                          disabled
                        >請選擇付款方式</option>
                        <option value="WebATM">WebATM</option>
                        <option value="ATM">ATM</option>
                        <option value="CVS">CVS</option>
                        <option value="Barcode">Barcode</option>
                        <option value="Credit">Credit</option>
                        <option value="ApplePay">ApplePay</option>
                        <option value="GooglePay">GooglePay</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group">
                      <label for="message">留言</label>
                      <textarea
                        id="message"
                        class="form-control"
                        cols="30"
                        rows="3"
                        v-model="order.message"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col form-group text-right">
                      <button
                        type="submit"
                        class="btn btn-info"
                        :disabled="invalid"
                      >送出表單</button>
                    </div>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
<script>
import KV from '@/components/KV.vue';

export default {
  components: {
    KV,
  },
  data() {
    return {
      title: '建立訂單',
      isLoading: false,
      step: 1,
      couponCode: '',
      totalPrice: 0,
      totalQuantity: 0,
      carts: [],
      product: {
        imageUrl: [],
        quantity: 1,
      },
      order: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      coupon: {},
    };
  },
  methods: {
    // getCart() {
    //   this.isLoading = true;
    //   const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
    //   this.$http
    //     .get(api)
    //     .then((res) => {
    //       this.isLoading = false;
    //       this.carts = res.data.data;

    //       this.totalPrice = 0;
    //       this.totalQuantity = 0;
    //       // 計算總金額
    //       this.carts.forEach((item) => {
    //         this.totalPrice += item.product.price * item.quantity;
    //         this.totalQuantity += item.quantity;
    //       });
    //     })
    //     .catch((err) => {
    //       this.isLoading = false;
    //       console.log(err);
    //     });
    // },
    updateQuantity(id, quantity) {
      this.isLoading = true;
      if (quantity < 1) return;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      const editCart = {
        product: id,
        quantity,
      };
      this.$http
        .patch(api, editCart)
        .then(() => {
          this.isLoading = false;
          this.$bus.$emit('get-cart');
          this.$bus.$emit('msg:push', '成功更改商品數量囉', 'success');
        })
        .catch(() => {
          this.isLoading = false;
          this.$bus.$emit('msg:push', '登愣~~出現錯誤', 'danger');
        });
    },
    removeCart(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http
        .delete(api)
        .then(() => {
          this.isLoading = false;
          this.$bus.$emit('get-cart');
          this.$bus.$emit('msg:push', 'QQ~成功刪除', 'success');
        })
        .catch(() => {
          this.isLoading = false;
          this.$bus.$emit('msg:push', '登愣~~出現錯誤', 'danger');
        });
    },
    removeAllCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http
        .delete(api)
        .then(() => {
          this.isLoading = false;
          this.carts = [];
          this.$bus.$emit('get-cart');
          this.$bus.$emit('msg:push', 'QQ~成功清除購物車', 'success');
        })
        .catch(() => {
          this.isLoading = false;
          this.$bus.$emit('msg:push', '登愣~~出現錯誤', 'danger');
        });
    },
    findCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      this.$http
        .post(api, { code: this.couponCode })
        .then((res) => {
          this.coupon = res.data.data;
          this.$bus.$emit('msg:push', '優惠碼正確，已幫您折扣囉', 'success');
          this.isLoading = false;
        })
        .catch(() => {
          this.$bus.$emit('msg:push', '登愣~~折扣碼無效喔', 'danger');
          this.isLoading = false;
        });
      this.couponCode = '';
    },
    createOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`;
      this.$http
        .post(api, this.order)
        .then(() => {
          this.isLoading = false;
          this.order = {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: '',
          };
          this.$bus.$emit('get-cart');
          // alert('您已完成訂單，我們會盡快與您聯繫，謝謝。');
          // window.location = 'products.html';
          this.$router.push('/products');
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
  created() {
    this.$bus.$emit('get-cart');
    this.$bus.$on('cart-info', (price, amount, carts) => {
      this.totalPrice = price;
      this.totalQuantity = amount;
      this.carts = carts;
    });
  },
};
</script>
<style lang="scss" scope></style>
