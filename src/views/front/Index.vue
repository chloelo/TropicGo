<template>
  <div class="front front-index">
    <section class="kv">
      <div class="txt-wrap">
        <h2
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="50"
        >
          藏在回歸線裡的<span class="text-sun">熱情</span>面紗，
          等你來一探究竟！
        </h2>
        <div
          class="links d-flex justify-content-around"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <button
            type="button"
            class="btn link link-second"
            data-toggle="modal"
            data-target="#idxModal"
          >
            查優惠
          </button>
          <router-link
            class="link link-main"
            to="/products"
          >
            找行程
          </router-link>
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
            <ProductsFilter />
          </div>
        </div>
      </div>
    </section>
    <section class="zones zone_selected">
      <div class="container">
        <div class="row">
          <h2 class="mx-auto title-dec">
            <span class="circle" /><span class="txt">特別精選</span>
          </h2>
          <div class="col-12">
            <div class="row mt-5 align-items-center">
              <div class="col-md-6">
                <div class="num-wrap num-wrap01">
                  <span class="num">01</span>
                </div>
                <div class="row justify-content-md-between">
                  <div class="col-lg-5">
                    <h3 class="text-primary">
                      墨西哥
                    </h3>
                  </div>
                  <div class="col-lg-7">
                    <div
                      class="txt"
                      data-aos="zoom-in"
                    >
                      <p>
                        一生必去墨西哥的三大理由：
                      </p>
                      <ul>
                        <li>
                          墨式美味：
                          墨西哥料理可以說是拉丁美洲的翹楚，莫蕾醬巧克力嫩雞和仙人掌料理等其他地方吃不到的獨特美味，
                          是世界上少數可以吃的下肚的世界文化遺產！
                        </li>
                        <li>
                          拉美古文明的搖籃：
                          千年來璀燦奪目孕育無數美洲古文明如馬雅、阿茲特克和托爾特克，不僅被譽為世界上最偉大、
                          也是拉美國家中少數能同時保存西班牙殖民和美洲古文明的國度之一。
                        </li>
                        <li>
                          世界文化遺產大國：
                          截至 2017 年 9 月，墨國境內就囊括 27 項世界文化遺產、6 項自然遺產，總數量美洲排名第一！
                        </li>
                      </ul>
                      <div class="d-flex justify-content-end">
                        <router-link
                          class="link bg-secondary"
                          to="/product/bBkMTu7Y8UuP3X8G1iGPvNepz2B7uNyF3jfC5GE5ZQz7baZsUGmnqSrCfmiG6Kn9"
                        >
                          了解更多
                          <span><i class="fas fa-chevron-right" /></span>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <img
                  class="img-fluid"
                  data-aos="zoom-in"
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/A7vYL8Gos0SJCedDIUiBF7CVCeGrgtLsewYcOa2UHgreUMcWC7mC14Uxb6piMs1TWY7dIdeynUQFfnjUBxixWd5wdwYu7UR6zfw8cmCcAdNVo43cXiec8WoovdumMSzQ.png"
                  alt=""
                >
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-md-6 order-md-2">
                <div class="num-wrap num-wrap02">
                  <span class="num">02</span>
                </div>
                <div class="row justify-content-md-between">
                  <div class="col-lg-5">
                    <h3 class="text-primary">
                      埃及
                    </h3>
                  </div>
                  <div class="col-lg-7">
                    <div
                      class="txt"
                      data-aos="zoom-in"
                    >
                      <p>
                        神秘而多樣化的金字塔，乃至奇幻的紅海風光；夢想中的尼羅河乘船泛遊，
                        更有那三千年歷史的阿布辛貝世界級遺跡！Tropic Go 精心安排搭配多段埃及國內線班機，
                        省卻艷陽下長途行車或搭乘夜間火車之苦，讓您的埃及之旅於輕鬆悠閒中 ，絕無遺珠之憾！
                      </p>
                      <div class="d-flex justify-content-end">
                        <router-link
                          class="link bg-secondary"
                          to="/product/1cVlQi9evx4jB3HFRFCx3xotrXnfVeC65LNGPjRzi4GcUXF8ZCAGVZodVP29Bcj9"
                        >
                          了解更多
                          <span><i class="fas fa-chevron-right" /></span>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 order-md-1">
                <img
                  class="img-fluid"
                  data-aos="zoom-in"
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/4jsSHHll13CnKeswuD91bY4ErHR8vmBV5WEt1b2QuFuAn5dLp5z9MzhVtAkQx8ndYGnPbuTZJzOwqZtMSSeAqGZQvNBY9kfFY7wezUbUOEfoOOYNkCdo4hlYCkJjkYoG.png"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="zones zone-dec">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div
              class="item-wrap"
              data-aos="zoom-in"
            >
              <img
                class="img-fluid icon"
                src="@/assets/images/icon-life.png"
                alt=""
              >
              <p>享生活</p>
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="item-wrap"
              data-aos="zoom-in"
            >
              <img
                class="img-fluid icon"
                src="@/assets/images/icon-food.png"
                alt=""
              >
              <p>享美食</p>
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="item-wrap"
              data-aos="zoom-in"
            >
              <img
                class="img-fluid icon"
                src="@/assets/images/icon-joy.png"
                alt=""
              >
              <p>享樂</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="zones zone-feedback">
      <div class="container">
        <h2 class="mx-auto title-dec">
          <span class="circle" /><span class="txt">旅客怎麼說</span>
        </h2>
        <div class="row no-gutters mt-5">
          <div class="col-md-3 order-md-1">
            <div
              class="img-wrap h-100"
              data-aos="flip-up"
              style="background-image:url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Xujsh4eAqVyXiD1xhKZUEvUKjdVXFFzzzH2RRkBZhEqmTMhjuoLP6RfbjDu5plVBal3xMcPcJIR2NcHnE6Xa3ikokpnAGqQil3HqRdRuCGSQJaqdAY5K1Z7auRzjirqo.png')"
            />
          </div>
          <div class="col-md-3 order-md-0">
            <blockquote
              class="blockquote p-3 text-white h-100 bg-asia d-flex flex-column justify-content-around"
              data-aos="zoom-in"
            >
              <p class="mb-0">
                有些事情現在不做，以後也做不了了，只要踏出一步，視野就會不同，為自己勇敢一次！
              </p>
              <footer class="blockquote-footer text-right text-white">
                <cite title="Source Title">台中 王曉明</cite>
              </footer>
            </blockquote>
          </div>
          <div class="col-md-6 order-md-2">
            <div
              class="img-wrap h-100"
              data-aos="flip-up"
              style="background-image:url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/zhkkOJVOJwV3XjK5VrFoqbz6ZwgUMVLOjjzNuRAXV3XS6UKzQxDDCzbe3oejLpoWBYBsImxUAY24J7hk710PEL3E5msZj43KLxeiGwdRyRE6uPUudP0ZaA0IFrPSUnqy.png')"
            />
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-3 col-sm-6">
            <div
              class="img-wrap h-100"
              data-aos="flip-up"
              style="background-image:url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/UoINu8PEdetwgNFhWQMoY2AUPilmNNS47cFTi7uT0az9fIt2LJpj7RBI4TCxwAda9hFEs9D1468n2WcrNNgVMt748NZ2aRs2R9twBQiWSggPnZVCZgN8RcwTxbDAA0p1.png')"
            />
          </div>
          <div class="col-md-3 col-sm-6">
            <div
              class="img-wrap h-100"
              data-aos="flip-up"
              style="background-image:url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/bqVKM43SvFbh0B5Ff48ruAebaYudCzu73tI45KSGzlyYGC5PK8yWoaWwKbta8KTUFigg2bZ6Gak3yW3g8XFxsaMxXssgC6gcwybO9ovePXipnJjPedkIK2XDw3pfKPr1.png')"
            />
          </div>
          <div class="col-md-3 col-sm-6">
            <blockquote
              class="blockquote p-3 h-100 bg-light d-flex flex-column justify-content-around"
              data-aos="zoom-in"
            >
              <p class="mb-0">
                旅行就是一碰上就戒不掉的癮，這癮有毒但我不想戒，TropicGo 的行程真的太好玩 ~不來的不是彼得是後悔！
              </p>
              <footer class="blockquote-footer text-right">
                <cite title="Source Title">花蓮 郝美麗</cite>
              </footer>
            </blockquote>
          </div>
          <div class="col-md-3 col-sm-6">
            <div
              class="img-wrap h-100"
              data-aos="flip-up"
              style="background-image:url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/DHXpi2eFQIm9NFg8crQtu6jSYgcwHs7J1Lx4Eqc6xT5hMl1iJuALouToZsQogsv9tIucArwXtDHaGvGIVNYE2nMA0GU3uQOSIE7sXOkKBpCTeZdoqc1SgFeNGYU3FZa3.png')"
            />
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-3">
            <div
              class="img-wrap h-100"
              data-aos="flip-up"
              style="background-image:url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lti1yF5YP5LRNO9PnnelE6Af0S4EzJrKGNc6OHaO6jYIpElH5SGQSauFhZygtNWEGIsJDeLjtZivEbT9d2f2fu1dgE1TU64YtibRmAUjM4sIJeCQaMEdV7AdrXlCI2Iu.png')"
            />
          </div>
          <div class="col-md-6">
            <blockquote
              class="blockquote p-3 h-100 bg-africa text-white d-flex flex-column justify-content-around"
              data-aos="zoom-in"
            >
              <p class="mb-0">
                在宇宙之間，我們是如此渺小，人生很短，你我都很珍貴，把握當下。有夢就追，熱情要及時，快樂很簡單。
              </p>
              <footer class="blockquote-footer text-white text-right">
                <cite title="Source Title">台北 文清風</cite>
              </footer>
            </blockquote>
          </div>
          <div class="col-md-3">
            <div
              class="img-wrap h-100"
              data-aos="flip-up"
              style="background-image:url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Yu5omYQYXvjuSU4BXBsOjw2zBf8F1dKhJvnRShw621OrnG7xFg2gGrtTcGWbvbqSkdA1gneKhgOu9jgMRuQxtEOSvQnLYHXoyJKDIKFYBWhIkkAustW5DgR9KiZNwvrP.png')"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="zones zone_shared">
      <div class="container">
        <div class="row">
          <div
            v-for="item in viewShared"
            :key="item.title"
            class="col-sm-4"
            data-aos="zoom-in"
          >
            <div class="img-wrap my-3">
              <img
                class="img-fluid"
                :src="item.img"
                :alt="item.title"
              >
              <span class="title">{{ item.title }}</span>
            </div>
          </div>

          <div class="col-12">
            <p>你在等我嗎？我一直都在阿！以上精彩行程我們通通都你安排好了，還不手刀報名參加嗎？</p>
            <div class="d-flex justify-content-end">
              <router-link
                class="link bg-secondary"
                to="/products"
              >
                立即查看
                <span><i class="fas fa-chevron-right" /></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <IndexModal />
  </div>
</template>

<script>
import ProductsFilter from '@/components/ProductsFilter.vue';
import IndexModal from '@/components/IndexModal.vue';

export default {
  components: {
    ProductsFilter,
    IndexModal,
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
  methods: {
    openModel() {},
  },
};
</script>
