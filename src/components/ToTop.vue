<template>
  <div>
    <a
      href="#"
      class="btn btn-dark toTop justify-content-center align-items-center"
      :class="{show:isShow}"
      @click.prevent="toTop"
    >
      <span class="icon">
        <i class="fas fa-chevron-up" />
      </span>
    </a>
  </div>
</template>

<script>
/* global $ */
export default {
  data() {
    return {
      isShow: false,
    };
  },
  created() {
    window.addEventListener('scroll', this.winScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.winScroll);
  },
  methods: {
    toTop() {
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        700,
      );
    },
    winScroll() {
      const scroll = $(window).scrollTop();
      if (scroll >= 300) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>
