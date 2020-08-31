<template>
  <div class="front front-index">
    <section class="kv">
      <div class="txt-wrap">
        <h2>藏在回歸線裡的<span class="text-asia">熱情</span>面紗，
          等你來一探究竟！</h2>
        <div class="links d-flex justify-content-around">
          <router-link
            class="link link-second"
            to="/products"
          >查優惠</router-link>
          <router-link
            class="link link-main"
            to="/products"
          >找行程</router-link>
        </div>
      </div>
    </section>
    <section class="zones zone_category">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-md-5">
            <h2>想好要去哪了嗎？</h2>
            <p>還沒有想法的話，來這裡找找吧，也許會有意外的驚奇。</p>
          </div>
          <div class="col-lg-8">
            <ProductsFilter></ProductsFilter>
          </div>
        </div>
      </div>
    </section>
    <section class="zones zone_selected">
      <div class="container-fluid">
        <div class="row">
          <h2 class="mx-auto"><span class="circle"></span><span class="txt">特別精選</span></h2>
          <div class="col-12">
            <div class="row mt-5">
              <div class="col-md-6">
                <div class="num-wrap num-wrap01"><span class="num">01</span></div>
                <div class="row justify-content-md-between">
                  <div class="col-lg-5">
                    <h3 class="text-primary">墨西哥</h3>
                  </div>
                  <div class="col-lg-7">
                    <div class="txt">
                      <p>一生必去墨西哥的三大理由：
                      </p>
                      <ul>
                        <li>墨式美味：
                          墨西哥料理可以說是拉丁美洲的翹楚，莫蕾醬巧克力嫩雞和仙人掌料理等其他地方吃不到的獨特美味，
                          是世界上少數可以吃的下肚的世界文化遺產！</li>
                        <li>拉美古文明的搖籃：
                          千年來璀燦奪目孕育無數美洲古文明如馬雅、阿茲特克和托爾特克，不僅被譽為世界上最偉大、
                          也是拉美國家中少數能同時保存西班牙殖民和美洲古文明的國度之一。</li>
                        <li>世界文化遺產大國：
                          截至 2017 年 9 月，墨國境內就囊括 27 項世界文化遺產、6 項自然遺產，總數量美洲排名第一！</li>
                      </ul>
                      <div class="d-flex justify-content-end">
                        <router-link
                          class="link bg-secondary"
                          to="/product/bBkMTu7Y8UuP3X8G1iGPvNepz2B7uNyF3jfC5GE5ZQz7baZsUGmnqSrCfmiG6Kn9"
                        >了解更多
                          <span><i class="fas fa-chevron-right"></i></span>
                        </router-link>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
              <div class="col-md-6">
                <img
                  class="img-fluid"
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/A7vYL8Gos0SJCedDIUiBF7CVCeGrgtLsewYcOa2UHgreUMcWC7mC14Uxb6piMs1TWY7dIdeynUQFfnjUBxixWd5wdwYu7UR6zfw8cmCcAdNVo43cXiec8WoovdumMSzQ.png"
                  alt=""
                >
              </div>

            </div>
            <div class="row mt-5">
              <div class="col-md-6 order-md-2">
                <div class="num-wrap num-wrap02"><span class="num">02</span></div>
                <div class="row justify-content-md-between">
                  <div class="col-lg-5">
                    <h3 class="text-primary">埃及</h3>
                  </div>
                  <div class="col-lg-7">
                    <div class="txt">
                      <p>神秘而多樣化的金字塔，乃至奇幻的紅海風光；夢想中的尼羅河乘船泛遊，
                        更有那三千年歷史的阿布辛貝世界級遺跡！Tropic Go 精心安排搭配多段埃及國內線班機，
                        省卻艷陽下長途行車或搭乘夜間火車之苦，讓您的埃及之旅於輕鬆悠閒中 ，絕無遺珠之憾！
                      </p>
                      <div class="d-flex justify-content-end">
                        <router-link
                          class="link bg-secondary"
                          to="/product/1cVlQi9evx4jB3HFRFCx3xotrXnfVeC65LNGPjRzi4GcUXF8ZCAGVZodVP29Bcj9"
                        >了解更多
                          <span><i class="fas fa-chevron-right"></i></span>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="col-md-6 order-md-1">
                <img
                  class="img-fluid"
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/4jsSHHll13CnKeswuD91bY4ErHR8vmBV5WEt1b2QuFuAn5dLp5z9MzhVtAkQx8ndYGnPbuTZJzOwqZtMSSeAqGZQvNBY9kfFY7wezUbUOEfoOOYNkCdo4hlYCkJjkYoG.png"
                  alt=""
                >
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="zones zone_shared">
      <div class="container">
        <div class="row">
          <div
            class="col-sm-4"
            v-for="item in viewShared"
            :key="item.title"
          >
            <div class="img-wrap my-3">
              <img
                class="img-fluid"
                :src="item.img"
                :alt="item.title"
              >
              <span class="title">{{item.title}}</span>
            </div>
          </div>

          <div class="col-12">
            <p>你在等我嗎？我一直都在阿！以上精彩行程我們通通都你安排好了，還不手刀報名參加嗎？</p>
            <div class="d-flex justify-content-end">
              <router-link
                class="link bg-secondary"
                to="/products"
              >立即查看
                <span><i class="fas fa-chevron-right"></i></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ProductsFilter from '@/components/ProductsFilter.vue';

export default {
  components: {
    ProductsFilter,
  },
  data() {
    return {
      isLoading: false,
      viewShared: [
        {
          title: '享生活',
          img:
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/BtzZuzhtPHapZ951ZBFpCRoKolRtQHGvhpClX0anU5uU2VtC3lN38ZqcpYnaXiQZNWKkZ9Lb3qJl5KZm0LaTquvAd1pUa8p3cwk9tECuyZZr6nfJTJjL0hwA6cK51LmF.png',
        },
        {
          title: '享美食',
          img:
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/gnl2stpPR9dClkQulbc7OwS6NxUJs6XBpjUE3sZ0AX5Jfr38oVkuONfiJs0JpAhfJqK2GclhikAuHgIX1yjX95f2ezHRRnpKk5A0rtQwuQwJyc5pnSdydMaXibZQoCZF.png',
        },
        {
          title: '享樂',
          img:
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/olNIR8PBmOv9UD8228oefzzncRMofRnRQfH7vc68BdGhCG4zH9RK0Xwbec5u9iBFzPzWmUTp3QVN2t49sr661CuC0Z6Rrq0DRieKH606qdO0b0Q3Vak0lhssVpqTPiAt.png',
        },
      ],
    };
  },
};
</script>
