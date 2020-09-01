<template>
  <div class="front front-checkout">
    <loading :active.sync="isLoading"></loading>
    <KV :title="title"></KV>
    <section class="zones zone_process">
      <div class="container ">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="step-wrap">
              <div class="step step1 done">
                <span class="num">1</span>
                <span class="txt">確認訂單</span>
              </div>
              <div class="step step2">
                <span class="num">2</span>
                <span class="txt">填寫資料</span>
              </div>
              <div class="step step3">
                <span class="num">3</span>
                <span class="txt">完成訂單</span>
              </div>
              <!-- <div class="bar"></div> -->
            </div>
            <div class="progress">
              <div
                class="progress-bar bg-secondary"
                role="progressbar"
                style="width: 0%"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="zones zone_step1">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <h3 class="text-info">填寫訂單資訊</h3>
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
          <div class="col-md-4">
            <div class="border p-4 mb-4">
              <h4 class="font-weight-bold mb-4">Order Detail</h4>
              <table class="table text-muted border-bottom">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      class="border-0 px-0 pt-4 font-weight-normal"
                    >Subtotal</th>
                    <td class="text-right border-0 px-0 pt-4">NT$24,000</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      class="border-0 px-0 pt-0 pb-4 font-weight-normal"
                    >Payment</th>
                    <td class="text-right border-0 px-0 pt-0 pb-4">ApplePay</td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 font-weight-bold">Total</p>
                <p class="mb-0 h4 font-weight-bold">NT$24,000</p>
              </div>
              <a
                href="./checkout.html"
                class="btn btn-dark btn-block mt-4"
              >Lorem ipsum</a>
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
      isLoading: false,
      title: '建立訂單',
      step: 1,
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
    };
  },
  methods: {
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
};
</script>
