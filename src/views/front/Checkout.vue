<template>
  <div class="front front-checkout">
    <loading :active.sync="isLoading"></loading>
    <KV :title="title"></KV>
    <section class="zones zone_process">
      <div class="container ">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="step-wrap">
              <div class="step step1">
                <span class="num">1</span>
                <span class="txt">填寫訂單</span>
              </div>
              <div class="step step2">
                <span class="num">2</span>
                <span class="txt">確認訂單</span>
              </div>
              <div class="step step3">
                <span class="num">3</span>
                <span class="txt">完成訂單</span>
              </div>
              <!-- <div class="bar"></div> -->
            </div>
            <div class="progress">
              <div
                class="progress-bar bg-secondary"
                role="progressbar"
                style="width: 50%"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
<script>
import KV from '@/components/KV.vue';

export default {
  components: {
    KV,
  },
  data() {
    return {
      isLoading: false,
      title: '建立訂單',
      step: 1,
    };
  },
};
</script>
