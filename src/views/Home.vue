<template>
  <div class="home">
    <navbar />
    <main class="wrapper">
      <router-view />
    </main>
    <div class="footer-img">
      <img
        class="img-fluid"
        src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/v7Ch2AFBfjM9Glkxu6mtIospVvwmpfcqrY2ToFNuNgN27LkGh0ZWV2PaOPvpZgPInzJDu96yj3SnDzhkTdh46wyrziM4Rfh5JdKvCd9cyxF6N55bRigw0TDVg36J8Gez.png"
        alt=""
      >
    </div>
    <footer class="front-footer bg-africa text-white">
      <div class="container">
        <div
          class="d-flex align-items-center
        justify-content-between text-white mb-md-7 mb-4"
        >
          <router-link to="/">
            <img
              class="logo"
              src="@/assets/images/logo.png"
            >
          </router-link>

          <ul class="d-flex list-unstyled mb-0 h4">
            <li>
              <a
                target="_blank"
                href="https://github.com/chloelo/TropicGo"
                class="text-white mx-3"
              ><i class="fab fa-github-square" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://medium.com/chloelo925"
                class="text-white mx-3"
              ><i class="fab fa-medium" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://facebook.com/"
                class="text-white mx-3"
              ><i class="fab fa-facebook" />
              </a>
            </li>
          </ul>
        </div>
        <div
          class="d-flex flex-column flex-md-row justify-content-between
        align-items-md-end align-items-start text-white"
        >
          <div class="mb-md-0 mb-1">
            <p class="mb-0">
              03-456-7890
            </p>
            <p class="mb-0">
              tropicgo@mail.com
            </p>
          </div>
          <p class="mb-0">
            © 2020 Tropic Go All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
    <ToTop />
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/NavbarFront.vue';
import ToTop from '@/components/ToTop.vue';

export default {
  components: {
    navbar,
    ToTop,
  },
  data() {
    return {};
  },
};
</script>
