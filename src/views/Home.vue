<template>
  <div class="home">
    <navbar></navbar>
    <div class="wrapper">
      <router-view></router-view>
    </div>

    <footer class="front-footer py-5 bg-africa text-white">
      <div class="container">
        <div class="d-flex align-items-center
        justify-content-between text-white mb-md-7 mb-4">
          <router-link to="/">
            <img
              class="logo"
              src="@/assets/images/logo.png"
            />
          </router-link>

          <ul class="d-flex list-unstyled mb-0 h4">
            <li>
              <router-link
                to="/"
                class="text-white mx-3"
              ><i class="fab fa-facebook"></i>
              </router-link>
            </li>
            <li>
              <router-link
                to="/"
                class="text-white mx-3"
              ><i class="fab fa-instagram"></i>
              </router-link>
            </li>
            <li>
              <router-link
                to="/"
                class="text-white mx-3"
              ><i class="fab fa-line"></i>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="d-flex flex-column flex-md-row justify-content-between
        align-items-md-end align-items-start text-white">
          <div class="mb-md-0 mb-1">
            <p class="mb-0">03-456-7890</p>
            <p class="mb-0">tropicgo@mail.com</p>
          </div>
          <p class="mb-0">© 2020 Tropic Go All Rights Reserved.</p>
        </div>
      </div>

    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/NavbarFront.vue';

export default {
  name: 'Home',
  components: {
    navbar,
  },
  data() {
    return {};
  },
  // methods: {
  //   getCart() {
  //     this.isLoading = true;
  //     const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
  //     this.$http
  //       .get(api)
  //       .then((res) => {
  //         this.isLoading = false;
  //         this.carts = res.data.data;

  //         this.totalPrice = 0;
  //         this.totalQuantity = 0;
  //         // 計算總金額
  //         this.carts.forEach((item) => {
  //           this.totalPrice += item.product.price * item.quantity;
  //           this.totalQuantity += item.quantity;
  //         });
  //       })
  //       .catch((err) => {
  //         this.isLoading = false;
  //         console.log(err);
  //       });
  //   },
  //   removeAllCart() {
  //     const api = `${process.env.VUE_APP_APIPATH}/
  //  ${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
  //     this.$http
  //       .delete(api)
  //       .then(() => {
  //         this.carts = [];
  //         this.getCart();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   },
  //   mounted() {
  //     this.getCart();
  //   },
  // },
};
</script>
