<template>
  <div class="front front-product">
    <loading :active.sync="isLoading"></loading>
    <section
      class="zones zone_detail_bg"
      :style="`background-image:url(${product.imageUrl[0]})`"
    >

    </section>
    <section class="zones zone_detail">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">

            <div class="img-wrap mb-3">
              <img
                :src="product.imageUrl[0]"
                class="img-fluid"
              />
            </div>
          </div>
          <div class="col-lg-5">
            <div class="product-wrap">
              <div
                class="icon-popular"
                v-if="product.options.popular"
              >
                <span class="icon"><i class="fas fa-fire"></i></span>
                <span class="txt">Hot</span>
              </div>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/">首頁</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to="/products">產品列表</router-link>
                  </li>
                  <li
                    class="breadcrumb-item active"
                    aria-current="page"
                  >{{ product.title }}</li>
                </ol>
              </nav>
              <h2 class="mb-lg-3 mb-4">{{ product.title }}</h2>
              <p>{{ product.content }}</p>
              <p>出發城市：{{ product.options.departureCity}}</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <div>
                  <del class="text-black-50">原價 {{ product.origin_price | money }}</del>
                </div>
                <div class="text-secondary">
                  特價
                  <span class="h4">{{ product.price | money }}</span>
                </div>

              </div>
              <form>
                <div class="form-row my-3">
                  <div class="form-group col-md-6">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <button
                          :disabled="product.quantity === 1"
                          class="btn btn-outline-secondary"
                          type="button"
                          @click="product.quantity -= 1"
                        >-</button>
                      </div>
                      <input
                        v-model.number="product.quantity"
                        type="number"
                        min="1"
                        class="form-control text-center"
                        aria-describedby="basic-addon1"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-secondary "
                          type="button"
                          @click="product.quantity += 1"
                        >+</button>
                      </div>

                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <button
                      type="button"
                      class="btn btn-secondary btn-block"
                      @click="addToCart(product.id, product.quantity)"
                    >
                      <span
                        v-if="product.id === status.loadingItem"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span v-else>
                        <i class="fas fa-shopping-cart"></i>
                      </span>

                      加到購物車
                    </button>
                  </div>
                </div>
              </form>
              <div class="d-flex justify-content-between align-items-center">
                <div
                  v-if="product.quantity"
                  class="text-muted text-nowrap mr-3"
                >
                  小計
                  <strong>{{ product.quantity * product.price || 0 | money }}</strong> 元
                </div>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                >
                  <span><i class="far fa-heart "></i></span>

                  加入收藏
                </button>
              </div>

            </div>

          </div>

          <div class="col-12  mt-5">
            <h3 class="mb-3">行程詳述：</h3>
            <div
              class="description"
              v-html="product.description"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      product: {
        imageUrl: [],
        options: {},
        quantity: 1,
      },
      status: {
        loadingItem: '',
      },
      // tempQuantity: 1,
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;

      // 屬性 $route
      // 方法 $router
      // 取得網址上帶進來的 id
      // console.log(this.$route.params.id);

      // ↓ es6 的寫法，Airbnb 的模式下必須寫 es6 才不會報錯
      const { id } = this.$route.params;

      this.$http
        .get(
          `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`,
        )
        .then((res) => {
          this.isLoading = false;

          this.product = res.data.data;
          this.$set(this.product, 'quantity', 1);
        })
        .catch((err) => {
          this.isLoading = false;

          console.log(err);
        });
    },
    addToCart(id, quantity = 1) {
      this.isLoading = true;
      this.status.loadingItem = id;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      const newCart = {
        product: id,
        quantity,
      };
      this.$http
        .post(api, newCart)
        .then(() => {
          this.isLoading = false;
          this.status.loadingItem = '';
          this.$bus.$emit('msg:push', '商品成功加入購物車~', 'success');
          this.$bus.$emit('get-cart');
        })
        .catch((err) => {
          this.isLoading = false;
          this.status.loadingItem = '';
          this.$bus.$emit(
            'msg:push',
            `登愣~~出現錯誤！ ${err.response.data.errors[0]}`,
            'danger',
          );
          // response 為 axios 回傳的固有寫法
          // alert(err.response.data.errors[0]);
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
