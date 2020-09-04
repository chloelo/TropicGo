<template>
  <div class="front front-about">
    <loading :active.sync="isLoading"></loading>
    <KV :title="title"></KV>
    <section class="zones zone_intro">
      <div class="container">

        <div class="row">
          <div class="col-md-6">
            <div class="img-wrap">
              <img
                class="img-fluid"
                src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/i4mXi8E6EwKBjH7nfnRF1vrXrLmVsOzdNsig8d72cNVgAc103KqIbTl4uFfoCDXK8tQpap096VZBxar7fforwsyNivsGoajnTrvoTxgDdEhtXIgcgiLFCqyqPVruDbie.png"
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="txt-wrap p-3">
              <h2 class="my-3">關於 TropicGo</h2>
              <p>不管做什麼事情，有熱情才有持之以恆的動力，曾經我們也尋尋覓覓，關於自己、未來、生活...在追求什麼？每個人都有自己認定的答案，也許終其一生都不一定找的到。</p>
              <p>
                一路上會迷惘，會猶豫，甚至撞得頭破血流，結果從來不是結局，過程才是最精采豐富的，不管多麼辛苦、沮喪，都不要忘記自己對生活的渴望與熱情。
              </p>
              <p>TropicGo 正是這樣的存在，因為我們什麼沒有，最多的就是熱情了，
                當你沒有了動力往前，想要休息充電，想要讓自己沉澱，就來這裡逛逛吧，或多或少都會讓你感染一些我們想要帶給您如陽光般和煦的溫暖。</p>
            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="zone_banner pt-3">
      <div class="img-wrap d-none d-md-block">
        <img
          class="img-fluid"
          src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/dUVuQDTPfl9kAj9rzwtxRLQtFSeBGOR84C54pLXJ0pKnBP5WTvKuEFQ9lz8fU2tesySBeG4XHwFIaUddtTxhQPKb8EEosarQ9KeGjkuPKEhzkVfPQq5Ukjm3kzblpFGQ.png"
          alt=""
        >
      </div>
      <div class="img-wrap d-md-none">
        <img
          class="img-fluid"
          src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/fNtdmxWQOWymNHXJyved7e154Pq1pKoKbhs3NHKaa9b23EcK8LmMmrU6BBVUmywgMgsBYbrKN7qeedypJmAnmqRRr3vnkTYUeSspXNckcEFYizKlPNVoIZVs6tz582ym.png"
          alt=""
        >
      </div>
    </section>
    <section class="zones zone_crew">
      <div class="container">
        <h2 class="mb-5 title-dec"><span class="circle"></span><span class="txt text-primary">TropicGo 成員</span></h2>
        <div class="row h-100">
          <div class="col-lg-3 col-md-6">
            <div class="wrap">
              <div class="img-wrap">
                <img
                  class="img-fluid"
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/PufHrk1lontIBKDiMZ9xGIvejChqiCSn9q4WWJY2aVTStaI5xjYj4cqI7DMeaSlG8AXJZawhsCty0bB5J02ZlAV9E0jmkkDSmpfwvYliFGf31mKEpVwaF215Y4ZW92p5.png"
                  alt=""
                ></div>
              <div class="txt-wrap">
                <h3>總經理</h3>
                <p>歡迎來到 TropicGo 這個大家庭，希望能讓各位旅客都感受到賓至如歸，Welcome home.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="wrap">
              <div class="img-wrap">
                <img
                  class="img-fluid"
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/JhYHJdEYOmHnmsJk69hSLQb0ENg3J5pLnSFfou6zr5t7IGcu5V1hQhFelQfJIlvIxJNjCKM5Y00VTrBEGimGDNozjHyvLL7JN35kQVF6kWx9wUJzaMLl08QottjV7k1q.png"
                  alt=""
                ></div>
              <div class="txt-wrap">
                <h3>企劃部</h3>
                <p>Hi, 公司的行程內容都是我們的用心的規劃，您還喜歡嗎？喜歡的話記得直接報名參加喔 : )</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="wrap">
              <div class="img-wrap">
                <img
                  class="img-fluid"
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/9IPdJcEFIgXUIaO8RZuBeWpyPBqnwA29lCF0pWJIea4QdtCQw3oYOchlYsWvrk01PCWe9ylBowJCr27JZdATIaVsWALeInEPvdlkplnHaP4L6x71R2HwEwTTU8qD5NhA.png"
                  alt=""
                ></div>
              <div class="txt-wrap">
                <h3>人資部</h3>
                <p>是不是很嚮往這個充滿熱情的公司？如果你也有一樣的特質，一樣想帶給大家歡樂，歡迎你們的加入喔。</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="wrap">
              <div class="img-wrap">
                <img
                  class="img-fluid"
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/n4cQXEPeZOYKSODU27wxl5IuqC7vOg1vd0uCibD1I2lkSRzFwn8DPKAzxNan78rY6k0hesTbfzLHmlPKfK23FJjVTlVhwpssUORUcaFFxcAEDCCevnFkuaptmSdXnCgp.png"
                  alt=""
                ></div>
              <div class="txt-wrap">
                <h3>業務部</h3>
                <p>有參加過行程的貴賓應該都對我們不陌生，我們都會盡量解答各位對行程上的疑惑，有任何問題歡迎提問喔。</p>
              </div>
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
      title: '對生活抱持熱情',
    };
  },
};
</script>
