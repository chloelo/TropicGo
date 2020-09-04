<template>
  <div class="home">
    <navbar></navbar>
    <main class="wrapper">
      <router-view></router-view>
    </main>
    <div class="footer-img">
      <img
        class="img-fluid"
        src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/MVVJBSB0TzoF41iUkFtzvSgkLuQwAkphMoFA4u1DxnkWbDqsUj8IAnZaNqDFEvX1aDVfdxOzTNKd19fwknBHV46YW4GoO3bEZ6uPwX6KiriiKRtc7w3JoEJKm2OuABt6.png"
        alt=""
      >
    </div>
    <footer class="front-footer bg-africa text-white">
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
              <a
                target="_blank"
                href="https://github.com/chloelo"
                class="text-white mx-3"
              ><i class="fab fa-github-square"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://medium.com/chloelo925"
                class="text-white mx-3"
              ><i class="fab fa-medium"></i>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://facebook.com/chloelo0925"
                class="text-white mx-3"
              ><i class="fab fa-facebook"></i>
              </a>
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
