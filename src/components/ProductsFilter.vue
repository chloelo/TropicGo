<template>
  <div class="row">
    <div
      v-for="item in categories"
      :key="item.zh"
      class="col-lg-3 col-md-6"
    >
      <div
        class="wrap"
        data-aos="zoom-in"
        :class="['bg-'+item.category,item.category]"
      >
        <img :src="'./images/' + item.iconImg">
        <h3 class="my-3">
          {{ item.zh }}
        </h3>
        <p>{{ item.txt }}</p>
        <a
          class="link"
          :class="'text-' + item.category"
          @click.prevent="toCategory(item.category)"
        >立即前往</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          zh: '亞洲',
          category: 'asia',
          iconImg: 'icon-asia.png',
          txt: '最熟悉的陌生人，想靠近卻又不敢太近，是愛情嗎？',
        },
        {
          zh: '美洲',
          category: 'america',
          iconImg: 'icon-america.png',
          txt: '瑪雅文化、哈瓦那夕陽、熱帶雨林，如此豐富多變的景色，try it！',
        },
        {
          zh: '非洲',
          category: 'africa',
          iconImg: 'icon-africa.png',
          txt: '神秘又狂野，充滿刺激的冒險，給你不同體驗。',
        },
        {
          zh: '大洋洲',
          category: 'oceania',
          iconImg: 'icon-oceania.png',
          txt: '南半球，與我們過著相反季節的國度，很是浪漫。',
        },
      ],
    };
  },
  methods: {
    toCategory(el) {
      this.$router.push({
        name: 'Products',
        params: { pathCategory: el },
      });
    },
  },
};
</script>
