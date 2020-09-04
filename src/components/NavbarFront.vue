<template>
  <div class="front-nav">
    <loading :active.sync="isLoading"></loading>
    <nav
      id="front-nav"
      class="navbar navbar-expand-lg navbar-light fixed-top align-items-center"
    >
      <router-link
        class="navbar-brand"
        to="/"
      >
        <img src="@/assets/images/logo.png" />
        <span class="sr-only">(current)</span>
      </router-link>
      <!-- <a class="navbar-brand">
          <img src="@/assets/images/logo.png" />
        </a> -->
      <div class="d-flex order-lg-2 justify-content-around icon-link-wrap">
        <!-- <router-link
          class="nav-link nav_jq icon-link"
          to="/about"
        >
          <span><i class="fas fa-heart"></i></span>

        </router-link> -->

        <div class="dropdown">
          <button
            class="dropdown-toggle nav-link nav_jq cart-dropdown-btn icon-link"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="position-relative"><i class="fas fa-shopping-cart"></i>
              <span
                class="cart-num"
                v-if="carts.length > 0"
              >{{ totalQuantity }}</span>
            </span>

          </button>

          <div
            class="cart-popup dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <div class="table-responsive dropdown-cart-list">
              <table class="table table-sm table-striped">
                <caption>已選擇行程</caption>
                <thead>
                  <tr>
                    <th scope="col">品名</th>
                    <th scope="col">數量</th>
                    <th scope="col">單價</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in carts"
                    :key="item.product.id"
                  >
                    <td>{{ item.product.title }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.product.price | money }}</td>
                  </tr>
                  <tr v-if="carts.length === 0">
                    <td
                      colspan="3"
                      class="text-center"
                    >您尚未選擇任何行程喔！</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colspan="3"
                      class="text-right"
                    >總計：{{ totalPrice | money }}</td>
                  </tr>
                </tfoot>
              </table>
              <!-- <router-link
                class="nav_jq bg-primary text-white text-center dropdown-item mt-2"
                to="/cart"
              >前往結帳</router-link> -->
              <!-- <router-link
                class="btn btn-block btn-primary"
                to="/cart"
              >查看購物車</router-link> -->
              <button
                type="button"
                class="btn btn-block btn-primary"
                :disabled="carts.length === 0"
                @click.prevent="toPageCart"
              >查看購物車</button>
            </div>
          </div>
        </div>
        <!-- <router-link
          v-else
          class="nav-link nav_jq icon-link icon-link-alone"
          to="/cart"
        >
          <span class="position-relative wrap"><i class="fas fa-shopping-cart"></i>
            <span
              class="cart-num"
              v-if="carts.length > 0"
            >{{ totalQuantity }}</span>
          </span>
        </router-link> -->
      </div>

      <button
        class="navbar-toggler custom-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
      </button>

      <div
        class="collapse navbar-collapse order-lg-1"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link
              class="nav-link nav_jq"
              to="/"
            >
              首頁
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link nav_jq"
              to="/products"
            >產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link nav_jq"
              to="/about"
            >關於我們</router-link>
          </li>
          <!-- <li
            class="nav-item"
            v-if="$route.path ==='/cart'"
          >
            <router-link
              class="nav-link nav_jq"
              to="/cart"
            >
              <span class="position-relative"><i class="fas fa-shopping-cart"></i>
                <span
                  class="cart-num"
                  v-if="carts.length > 0"
                >{{ totalQuantity }}</span>
              </span>
            </router-link>
          </li> -->
        </ul>
      </div>
    </nav>

  </div>
</template>
<script>
/* global $ */
export default {
  data() {
    return {
      isLoading: false,
      carts: [],
      totalPrice: 0,
      totalQuantity: 0,
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.carts = res.data.data;

          this.totalPrice = 0;
          this.totalQuantity = 0;
          // 計算總金額
          this.carts.forEach((item) => {
            this.totalPrice += item.product.price * item.quantity;
            this.totalQuantity += item.quantity;
          });
          this.$bus.$emit(
            'cart-info',
            this.totalPrice,
            this.totalQuantity,
            this.carts,
          );
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    winScroll() {
      const scroll = $(window).scrollTop();
      if (scroll >= 10) {
        $('#front-nav').addClass('shadows');
      } else {
        $('#front-nav').removeClass('shadows');
      }
    },
    toPageCart() {
      if (this.$route.path === '/cart') return;
      this.$router.push('/cart');
    },
    // navClick() {
    //   $('.nav_jq').on('click', () => {
    //     $('#navbarNavDropdown').collapse('hide');
    //   });
    // },
  },
  created() {
    this.getCart();
    this.$bus.$on('get-cart', () => {
      this.getCart();
    });
    window.addEventListener('scroll', this.winScroll);
  },
  mounted() {
    // this.navClick();
  },
  watch: {
    $route() {
      $('#navbarNavDropdown').collapse('hide');
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.winScroll);
  },
};
</script>
