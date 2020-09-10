<template>
  <div class="front front-products">
    <loading :active.sync="isLoading" />
    <HeroBanner :title="title" />
    <section class="zones zone_category">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="wrap d-flex justify-content-center ">
              <div
                v-for="item in categories"
                :key="item.category"
                class="category"
              >
                <button
                  type="button"
                  class="btn shadow d-flex flex-column justify-content-center align-items-center"
                  :class="'btn-' + item.category"
                  @click="filterProducts(item.category )"
                >
                  <img
                    class="icon"
                    :src="'./images/' + item.iconImg"
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
            v-for="product of filterCategories"
            :key="product.id"
            class="col mb-4"
          >
            <!-- :class="`border-${product.category}`" -->
            <div
              class="card h-100"
              :disabled="product.id === status.loadingItem"
              @click.prevent="getProduct(product.id)"
            >
              <span
                class="badge badge-pill"
                :class="'badge-' + product.category"
              > {{ product.category }}</span>

              <div class="img-wrap">
                <img
                  :src="product.imageUrl[0]"
                  class="card-img-top"
                >
              </div>
              <div class="card-body">
                <h5 class="card-title">
                  {{ product.title }}
                </h5>
                <p class="ellipsis">
                  {{ product.content }}
                </p>
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
                  <i class="fas fa-shopping-cart" />
                </span>
                我要報名
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBanner from '@/components/HeroBanner.vue';

export default {
  components: {
    HeroBanner,
  },
  data() {
    return {
      title: '用心為您規劃的精美行程',
      isLoading: false,
      products: [],
      status: {
        loadingItem: '',
      },
      categories: [
        {
          zh: '全部',
          category: 'world',
          iconImg: 'icon-world.png',
        },
        {
          zh: '亞洲',
          category: 'asia',
          iconImg: 'icon-asia.png',
        },
        {
          zh: '美洲',
          category: 'america',
          iconImg: 'icon-america.png',
        },
        {
          zh: '非洲',
          category: 'africa',
          iconImg: 'icon-africa.png',
        },
        {
          zh: '大洋洲',
          category: 'oceania',
          iconImg: 'icon-oceania.png',
        },
      ],
      filterCategories: '',
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    filterProducts(el) {
      this.filterCategories = this.products.filter((item) => {
        if (el === 'world' || el === '') return this.products;
        return item.category === el;
      });
    },
    getProducts() {
      this.isLoading = true;
      this.$http
        .get(
          `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`,
        )
        .then((res) => {
          const { pathCategory } = this.$route.params;
          this.isLoading = false;
          this.products = res.data.data;
          if (pathCategory) {
            this.filterProducts(pathCategory);
          } else {
            this.filterCategories = this.products;
          }
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
            // response 為 axios 回傳的固有寫法
            `登愣~~出現錯誤！ ${err.response.data.errors[0]}`,
            'danger',
          );
        });
    },
  },
};
</script>
