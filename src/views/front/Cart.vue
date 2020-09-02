<template>
  <div class="front front-cart">
    <loading :active.sync="isLoading"></loading>
    <KV :title="title"></KV>
    <!-- 流程三步驟 -->
    <section class="zones zone_process">
      <div class="container ">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="step-wrap">
              <div class="step step1 done">
                <span class="num">1</span>
                <span class="txt">確認清單</span>
              </div>
              <div
                class="step step2"
                :class="{done:step === 2 || step === 3 }"
              >
                <span class="num">2</span>
                <span class="txt">填寫資料</span>
              </div>
              <div
                class="step step3"
                :class="{done:step === 3}"
              >
                <span class="num">3</span>
                <span class="txt">確認付款</span>
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
      v-show="step === 1"
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
            <div class="p-3 mb-3 border">
              <!-- <h4 class="font-weight-bold mb-2 border-bottom pb-2">合計</h4> -->
              <div class="d-flex justify-content-between">
                <span class="font-weight-bold">商品總額</span><span>{{ totalPrice | money }}</span>
              </div>
              <form @submit.prevent="findCoupon">
                <div class="d-flex justify-content-between mt-3">
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
                        type="submit"
                        id="inputGroup-sizing-sm"
                      >套用</button>
                    </div>

                  </div>

                </div>
              </form>
              <div
                class="d-flex justify-content-between mt-3"
                v-if="coupon.enabled"
              >
                <span class="font-weight-bold">折扣</span>
                <span class="text-danger">- {{ totalPrice - totalPriceWithDiscount | money}}</span>
              </div>
              <div
                class="d-flex justify-content-between mt-3"
                v-else
              >
                <span class="font-weight-bold">折扣</span><span class="text-danger">- {{ 0 | money}}</span>
              </div>
              <div class="d-flex justify-content-between mt-3 border-dashed-top">
                <p class="mb-0 font-weight-bold ">應付金額</p>
                <p class="mb-0 h4 font-weight-bold text-secondary">{{ totalPriceWithDiscount | money }}</p>
              </div>
              <button
                class="btn btn-secondary mt-3 btn-block"
                :disabled="!carts.length"
                @click.prevent="step = 2; winScroll();"
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
      v-show="step === 2"
    >
      <div class="container">
        <div class="row flex-row-reverse">
          <div class="col-md-6 col-lg-4">
            <div class="p-3 mb-5 border">
              <!-- <h4 class="mb-4 border-bottom pb-2 text-center">訂單明細</h4> -->
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
                    <p class="mb-0 mr-2 font-weight-bold">{{ item.product.title }}</p>
                    <p class="mb-0">{{ item.product.price | money }}</p>
                  </div>
                  <p class="mb-0 font-weight-bold">x {{ item.quantity }}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-4 border-dashed-top">
                <p class="mb-0 font-weight-bold">總計</p>
                <p class="mb-0 h4 font-weight-bold text-secondary">{{ totalPriceWithDiscount | money }}</p>
              </div>

            </div>
          </div>
          <div class="col-lg-8 col-md-6">
            <div class="form-wrap">
              <h3 class="mb-4 text-center text-primary pb-3 border-bottom">客戶訂單資訊</h3>
              <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="createOrder">
                  <div class="form-row">
                    <div class="col-md-6 form-group">
                      <validation-provider
                        rules="required"
                        v-slot="{ errors, classes }"
                      >
                        <label for="username">收件人姓名</label>
                        <input
                          type="text"
                          name="收件人姓名"
                          class="form-control"
                          id="username"
                          placeholder="請輸入收件人姓名"
                          :class="classes"
                          v-model="form.name"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </validation-provider>
                    </div>
                    <div class="col-md-6 form-group">
                      <validation-provider
                        rules="required|numeric|min:8"
                        v-slot="{ errors, classes }"
                      >
                        <label for="tel">電話</label>
                        <input
                          type="tel"
                          name="電話"
                          class="form-control"
                          id="tel"
                          placeholder="請輸入電話"
                          :class="classes"
                          v-model="form.tel"
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
                        <label for="email">E-mail</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          name="E-mail"
                          placeholder="請輸入 E-mail"
                          :class="classes"
                          v-model="form.email"
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
                        <label for="address">收件人地址</label>
                        <input
                          type="text"
                          class="form-control"
                          name="收件人地址"
                          id="address"
                          placeholder="請輸入收件人地址"
                          :class="classes"
                          v-model="form.address"
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
                        v-model="form.payment"
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
                      <label for="message">備註留言</label>
                      <textarea
                        id="message"
                        class="form-control"
                        cols="30"
                        rows="3"
                        v-model="form.message"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-row align-items-center">
                    <div class="col form-group">
                      <a
                        href="#"
                        class="text-secondary"
                        :disabled="!carts.length"
                        @click.prevent="step = 1; winScroll();"
                      ><span><i class="fas fa-chevron-left"></i></span> 回上一步
                      </a>
                    </div>
                    <div class="col form-group text-right">
                      <button
                        type="submit"
                        class="btn btn-secondary"
                        :disabled="invalid"
                      >確認送出</button>
                    </div>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>

        </div>
      </div>
    </section>
    <section
      class="zones zone_order"
      v-show="step === 3"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="p-3 mb-5 border">
              <h4 class="mb-4 border-bottom pb-2 text-center">訂單明細</h4>
              <div
                class="d-flex mb-3"
                v-for="(item,idx) in order.products"
                :key="idx+1"
              >
                <img
                  :src="item.product.imageUrl[0]"
                  class="mr-2"
                  style="width: 48px; height: 48px; object-fit: cover"
                >
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <p class="mb-0 mr-2 font-weight-bold">{{ item.product.title }}</p>
                    <p class="mb-0 text-right">{{ (item.product.price) * item.quantity | money }}</p>

                  </div>
                  <p class="mb-0 font-weight-bold">{{ item.quantity }} {{item.product.unit }}</p>

                </div>

              </div>
              <div class="d-flex justify-content-between align-items-center mt-4 border-dashed-top">
                <p class="mb-0 mr-3">收件人姓名</p>
                <p class="mb-0 text-primary font-weight-bold">{{ order.user.name }}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <p class="mb-0 mr-3">收件人電話</p>
                <p class="mb-0 text-primary font-weight-bold">{{ order.user.tel }}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <p class="mb-0 mr-3">收件人信箱</p>
                <p class="mb-0 text-primary font-weight-bold">{{ order.user.email }}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <p class="mb-0 mr-3">收件人地址</p>
                <p class="mb-0 text-primary font-weight-bold">{{ order.user.address }}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <p class="mb-0 mr-3">付款方式</p>
                <p class="mb-0 text-primary font-weight-bold">{{ order.payment }}</p>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <p class="mb-0 mr-3">付款狀態</p>
                <p
                  class="mb-0 text-primary font-weight-bold text-secondary"
                  v-if="order.paid"
                >已付款</p>
                <p
                  class="mb-0 text-primary font-weight-bold text-danger"
                  v-else
                >尚未付款</p>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-4 border-dashed-top">
                <p class="mb-0 font-weight-bold">訂單金額</p>
                <p class="mb-0 h4 font-weight-bold text-secondary">{{ order.amount | money }}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
/* global $ */
import KV from '@/components/KV.vue';

export default {
  components: {
    KV,
  },
  data() {
    return {
      title: '建立訂單',
      isLoading: false,
      step: 3,
      couponCode: '',
      totalPrice: 0,
      totalQuantity: 0,
      carts: [],
      product: {
        imageUrl: [],
        quantity: 1,
      },
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      orderID:
        'YCT9y4oNyA23NZgCMIu8XcuWJSENPLpCG9kZqfpbIkyFdCqeuYPTw5z0oGw1gg9l',
      order: {
        user: {},
      },
      coupon: {},
    };
  },
  computed: {
    totalPriceWithDiscount() {
      return this.coupon.enabled
        ? this.totalPrice * (this.coupon.percent / 100)
        : this.totalPrice;
      // return this.totalPrice * (this.coupon.percent / 100);
    },
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
      const formData = { ...this.form };
      if (this.coupon.enabled) {
        formData.coupon = this.coupon.code;
      }
      this.$http
        .post(api, formData)
        .then((res) => {
          this.isLoading = false;
          this.orderID = res.data.data.id;
          this.form = {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: '',
          };
          this.$bus.$emit('get-cart');
          this.step = 3;
          this.getOrder(this.orderID);
          // alert('您已完成訂單，我們會盡快與您聯繫，謝謝。');
          // window.location = 'products.html';
          // this.$router.push('/products');
        })
        .catch(() => {
          this.$bus.$emit('msg:push', '登愣~~建立訂單失敗', 'danger');
          this.isLoading = false;
        });
    },
    getOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/${this.orderID}`;
      this.$http
        .get(api)
        .then((res) => {
          this.order = res.data.data;
          this.isLoading = false;
        })
        .catch();
    },
    winScroll() {
      const scroll = $(window).scrollTop();
      if (scroll >= 10) {
        $('html,body').animate(
          {
            scrollTop: 250,
          },
          700,
        );
      }
    },
  },
  created() {
    this.$bus.$emit('get-cart');
    this.$bus.$on('cart-info', (price, amount, carts) => {
      this.totalPrice = price;
      this.totalQuantity = amount;
      this.carts = carts;
    });
    this.getOrder();
  },
};
</script>
<style lang="scss" scope></style>
