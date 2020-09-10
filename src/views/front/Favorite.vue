<template>
  <div class="front front-favorite">
    <loading :active.sync="isLoading" />
    <HeroBanner :title="title" />
    <section class="zones zone_favorites">
      <div class="container">
        <div class="row justify-content-center">
          <div
            v-if="favoriteList.length"
            class="col-md-8"
          >
            <h3 class="border-bottom pb-3 mb-3">
              收藏清單列表
            </h3>
            <div
              v-for="item in favoriteList"
              :key="item.id"
              class="d-flex bg-light align-items-center mb-4"
            >
              <div class="img-wrap pl-3">
                <img :src="item.imageUrl[0]">
              </div>

              <div class="w-100 p-3 position-relative">
                <a
                  href="#"
                  class="position-absolute close"
                  style="top: 16px; right: 16px;"
                  @click.prevent="delFavorite(item.id)"
                ><i class="fas fa-times" /></a>
                <p class="mb-0 font-weight-bold pr-4 text-africa">
                  {{ item.title }}
                </p>
                <p class="prices">
                  <span class="price_origin"> 原價：{{ item.origin_price | money }}/人</span>
                </p>
                <p
                  class="mb-1 text-muted"
                  style="font-size: 14px;"
                >
                  特價：{{ item.price | money }} / {{ item.unit }}
                </p>
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class=" mt-2 btn btn-secondary"
                    @click.prevent="toProduct(item.id)"
                  >
                    了解更多 <span><i class="fas fa-chevron-right" /></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="col-md-8"
          >
            <h3 class="border-bottom pb-3 mb-3">
              您尚未有任何收藏行程喔！
            </h3>
            <div class="d-flex justify-content-end">
              <router-link
                class="btn btn-secondary"
                to="/products"
              >
                前去逛逛 <span><i class="fas fa-chevron-right" /></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="zones zone_popular">
      <div class="container">
        <h3 class="mb-5 title-dec">
          <span class="circle" /><span class="txt text-primary">熱門推薦</span>
        </h3>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div
            v-for="filterProduct in populars"
            :key="filterProduct.id"
            class="col mb-4"
          >
            <div class="card h-100 border-0 shadow-sm">
              <div class="img-wrap">
                <img
                  :src="filterProduct.imageUrl[0]"
                  class="card-img-top"
                >
              </div>

              <div class="card-body">
                <h5 class="card-title">
                  {{ filterProduct.title }}
                </h5>
                <p class="card-text ellipsis">
                  {{ filterProduct.content }}
                </p>
                <p class="prices d-flex justify-content-between align-items-center">
                  <span class="price_origin">{{ filterProduct.origin_price | money }}/人</span>
                  <span class="price_discount">{{ filterProduct.price | money }}/人</span>
                </p>
                <button
                  type="button"
                  class=" mt-3 btn btn-outline-secondary btn-addTocart btn-block"
                  @click.prevent="toProduct(filterProduct.id)"
                >
                  前往查看 <span><i class="fas fa-chevron-right" /></span>
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
import HeroBanner from '@/components/HeroBanner.vue';

export default {
  components: {
    HeroBanner,
  },
  data() {
    return {
      isLoading: false,
      title: '我的收藏行程',
      products: [],
      status: {
        loadingItem: '',
      },
      favoriteList: [],
      favorites: JSON.parse(localStorage.getItem('favoritesID')) || [],
    };
  },
  computed: {
    populars() {
      return this.products.filter((item) => item.options.popular);
    },
  },
  created() {
    this.getProducts();
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
          this.getFavorites();
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    toProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    getFavorites() {
      this.favoriteList = this.products.filter(
        (item) => this.favorites.indexOf(item.id) > -1,
      );
    },
    delFavorite(id) {
      const favoriteId = this.favorites.indexOf(id);
      if (favoriteId !== -1) {
        this.favorites.splice(favoriteId, 1);
        this.$bus.$emit('msg:push', '已取消此筆收藏', 'danger');
      }
      localStorage.setItem('favoritesID', JSON.stringify(this.favorites));
      this.getProducts();
    },
  },
};
</script>
