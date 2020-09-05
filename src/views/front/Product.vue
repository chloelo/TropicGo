<template>
  <div class="front front-product">
    <loading :active.sync="isLoading"></loading>
    <section
      class="zones zone_detail_bg"
      v-if="product.imageUrl[0]"
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
              <h2 class="mb-lg-3 mb-4">
                {{ product.title }}</h2>
              <p>{{ product.content }}</p>
              <ul class="list-unstyled">
                <li v-if="product.options.popular">
                  <span class="icon icon-popular">
                    <i class="fas fa-fire"></i>
                  </span>
                  熱門商品
                </li>
                <li>
                  <span class="icon">
                    <i class="fas fa-plane-departure"></i>
                  </span>
                  出發城市：{{ product.options.departureCity}}
                </li>
                 <li>
                  <span class="icon">
                    <i class="fas fa-users"></i>
                  </span>
                  成團人數：15 人
                </li>
                <li>
                  <span class="icon">
                    <i class="fas fa-dollar-sign"></i>
                  </span>
                  費用已含：機場稅、燃油費
                </li>
              </ul>

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
                <div class="form-row mt-3">
                  <div class="form-group col-md-6">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <button
                          :disabled="product.quantity === 1"
                          class="btn btn-outline-secondary"
                          type="button"
                          @click="product.quantity -= 1"
                        >
                        <span><i class="fas fa-minus"></i></span>
                        </button>
                      </div>
                      <input
                        v-model.number="product.quantity"
                        type="number"
                        min="1"
                        class="form-control text-center pl-4"
                        aria-describedby="basic-addon1"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-secondary "
                          type="button"
                          @click="product.quantity += 1"
                        >
                        <span><i class="fas fa-plus"></i></span>
                        </button>
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

                      立即報名
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
                  @click="updateFavorites(product.id)"
                >
                <span v-if="favorites.indexOf(product.id) === -1">
                  <span ><i class="far fa-heart "></i></span>
                  加入收藏
                </span>
                <span v-else>
                  <span ><i class="fas fa-heart"></i></span>
                  已加入收藏
                </span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
    <section class="description-wrap zones">
      <div class="container ">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="description">
              <h3 class="mb-5 title-dec"><span class="circle"></span><span class="txt text-primary">產品特色</span></h3>
              <div v-html="product.description"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="zones zone_maylike">
      <div class="container">
        <h3 class="mb-4">猜您可能會喜歡...</h3>
        <div class="row">
          <div
            class="col-md-4 mb-4"
            v-for="filterProduct in filterCategory"
            :key="filterProduct.id"
          >
            <div class="card border-0 shadow-sm">
              <img
                :src="filterProduct.imageUrl[0]"
                class="card-img-top"
              >
              <div class="card-body">
                <h5 class="card-title">{{ filterProduct.title }}</h5>
                <p class="card-text">{{ filterProduct.content }}</p>
                <p class="prices d-flex justify-content-between align-items-center">
                  <span class="price_origin">{{ filterProduct.origin_price | money }}/人</span>
                  <span class="price_discount">{{ filterProduct.price | money }}/人</span>
                </p>
                <button
                  type="button"
                  class=" mt-3 btn btn-outline-secondary btn-addTocart btn-block"
                  @click.prevent="toProduct(filterProduct.id)"
                >

                  前往查看 <span><i class="fas fa-chevron-right"></i></span>
                </button>
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
export default {
  data() {
    return {
      isLoading: false,
      product: {
        imageUrl: [],
        options: {},
        quantity: 1,
      },
      products: [],
      status: {
        loadingItem: '',
      },
      favorites: JSON.parse(localStorage.getItem('favoritesID')) || [],
      // tempQuantity: 1,
    };
  },
  computed: {
    filterCategory() {
      return this.products.filter((item) => item.id !== this.product.id
        && item.category === this.product.category);
      // forEach 寫法
      // const ary = [];
      // this.products.forEach((item) => {
      //   if (this.$route.params.id !== item.id) {
      //     if (item.category === this.product.category) {
      //       ary.push(item);
      //     }
      //   }
      // });
      // return ary;
    },
  },
  methods: {
    toProduct(id) {
      this.$router.push(`/product/${id}`);
      this.getProduct();
      this.winScroll();
    },
    getProducts() {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`,
        )
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
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
        .catch(() => {
          this.isLoading = false;
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
    updateFavorites(id) {
      const favoriteId = this.favorites.indexOf(id);
      if (favoriteId === -1) {
        this.favorites.push(id);
        this.$bus.$emit('msg:push', '已新增此筆收藏', 'success');
      } else {
        this.favorites.splice(favoriteId, 1);
        this.$bus.$emit('msg:push', '已取消此筆收藏', 'danger');
      }
      localStorage.setItem('favoritesID', JSON.stringify(this.favorites));
    },
    winScroll() {
      const scroll = $(window).scrollTop();
      if (scroll >= 10) {
        $('html,body').animate(
          {
            scrollTop: 0,
          },
          700,
        );
      }
    },
  },
  created() {
    this.getProduct();
    this.getProducts();
    this.winScroll();
  },

};
</script>
