<template>
  <div class="front front-products">
    <loading :active.sync="isLoading"></loading>
    <section class="kv">
      <div class="title">
        <div class="container">
          <div class="row justify-content-end">
            <div class="col-md-6">
              <h2>用心為您規劃的精美行程</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="zones zone_category">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="wrap d-flex justify-content-center ">
              <div
                class="category"
                v-for="item in categoryBtns"
                :key="item.category"
              >
                <button
                  type="button"
                  class="btn shadow d-flex flex-column justify-content-center align-items-center"
                  :class="`btn-${item.category}`"
                  @click="filterCategory(item.category)"
                >

                  <img
                    class="icon"
                    :src="`./images/icon-${item.category}.png`"
                    :alt="item.zh"
                  >
                  <h4>{{ item.zh }}</h4>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="zones zone_products">
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div
            class="col mb-4"
            v-for="product of products"
            :key="product.id"
          >
            <!-- :class="`border-${product.category}`" -->
            <div
              class="card h-100"
              @click.prevent="getProduct(product.id)"
              :disabled="product.id === status.loadingItem"
            >
              <span
                class="badge badge-pill"
                :class="'badge-' + product.category | lowerCase"
              > {{product.category}}</span>

              <div class="img-wrap">
                <img
                  :src="product.imageUrl[0]"
                  class="card-img-top"
                >

              </div>
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="ellipsis">{{ product.content }}</p>
                <p class="prices d-flex justify-content-between align-items-center">
                  <span class="price_origin">{{ product.origin_price | money }}/人</span>
                  <span class="price_discount">{{ product.price | money }}/人</span>
                </p>

              </div>
              <button
                type="button"
                class="btn btn-secondary btn-addTocart"
                @click.prevent.stop="addToCart(product.id)"
              >
                <span>
                  <i class="fas fa-shopping-cart"></i>
                </span>
                我想報名
              </button>
            </div>
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
      products: [],
      status: {
        loadingItem: '',
      },
      categoryBtns: [
        {
          zh: '全部',
          category: 'world',
          imgUrl: 'icon-world.png',
        },
        {
          zh: '亞洲',
          category: 'asia',
          imgUrl: 'icon-asia.png',
        },
        {
          zh: '美洲',
          category: 'america',
          imgUrl: 'icon-america.png',
        },
        {
          zh: '非洲',
          category: 'africa',
          imgUrl: 'icon-africa.png',
        },
        {
          zh: '大洋洲',
          category: 'oceania',
          imgUrl: 'icon-oceania.png',
        },
      ],
    };
  },
  created() {
    this.getProducts();
  },
  computed: {
    // filterCategory() {
    //   const filterProducts = [];
    //   this.products.filter((item) => {});
    // },
  },
  methods: {
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
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    addToCart(id, quantity = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      const newCart = {
        product: id,
        quantity,
      };
      this.$http
        .post(api, newCart)
        .then(() => {
          this.isLoading = false;
          this.$bus.$emit('get-cart');
          this.$bus.$emit('msg:push', '商品成功加入購物車~', 'success');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit(
            'msg:push',
            `登愣~~出現錯誤！ ${err.response.data.errors[0]}`,
            'danger',
          );
          // response 為 axios 回傳的固有寫法
          // console.log(err.response);
        });
    },
  },
};
</script>
