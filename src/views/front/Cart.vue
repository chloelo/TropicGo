<template>
  <div class="front front-cart">
    <loading :active.sync="isLoading"></loading>
    <KV :title="title"></KV>
    <section class="zones zone_cartList">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
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
                        class="btn btn-outline-secondary "
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
                      class="form-control text-center pl-3 text-secondary "
                      aria-describedby="basic-addon1"
                      @change="
                            updateQuantity(item.product.id, item.quantity)
                          "
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary "
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
            <p class="text-right pr-3 py-3">總計：<span class="text-danger count-total">{{ totalPrice | money }}</span></p>
            <div class="d-flex justify-content-between align-items-center">
              <router-link
                class="text-secondary"
                to="/products"
              > <span><i class="fas fa-chevron-left"></i></span> 繼續購物</router-link>
              <router-link
                class="bg-secondary text-white px-4 py-2 link-next"
                to="/Checkout"
              >前往結帳 <span><i class="fas fa-chevron-right"></i></span></router-link>
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
      title: '購物清單',
      isLoading: false,
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
