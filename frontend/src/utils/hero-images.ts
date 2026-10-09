// 舊版各頁用到的背景/裝飾圖——原本連去 hexschool-api 這個教學單位附帶的 S3 bucket。
// 那個 bucket 不是設計給人長期外部引用的服務,隨時可能被收掉,所以全部下載下來改成本地素材,
// 不再依賴我們控制不了的第三方服務(跟 Unsplash 不同,Unsplash 本來就是公開 CDN,可以放心繼續引用)。
import aboutContent1 from '@/assets/images/hero/about-content-1.png'
import aboutContent2Desktop from '@/assets/images/hero/about-content-2-desktop.png'
import aboutContent2Mobile from '@/assets/images/hero/about-content-2-mobile.png'
import aboutContent3 from '@/assets/images/hero/about-content-3.png'
import aboutContent4 from '@/assets/images/hero/about-content-4.png'
import aboutContent5 from '@/assets/images/hero/about-content-5.png'
import aboutContent6 from '@/assets/images/hero/about-content-6.png'
import footerDecorative from '@/assets/images/hero/footer-decorative.png'
import heroAboutDesktop from '@/assets/images/hero/hero-about-desktop.jpg'
import heroAboutMobile from '@/assets/images/hero/hero-about-mobile.jpg'
import heroCartDesktop from '@/assets/images/hero/hero-cart-desktop.png'
import heroCartMobile from '@/assets/images/hero/hero-cart-mobile.png'
import heroFavoriteDesktop from '@/assets/images/hero/hero-favorite-desktop.png'
import heroFavoriteMobile from '@/assets/images/hero/hero-favorite-mobile.png'
import heroIndex from '@/assets/images/hero/hero-index.jpg'
import heroProductsDesktop from '@/assets/images/hero/hero-products-desktop.png'
import heroProductsMobile from '@/assets/images/hero/hero-products-mobile.png'
import indexModal from '@/assets/images/hero/index-modal.jpg'
import indexPickEgypt from '@/assets/images/hero/index-pick-egypt.png'
import indexPickMexico from '@/assets/images/hero/index-pick-mexico.png'
import indexTestimonial1 from '@/assets/images/hero/index-testimonial-1.png'
import indexTestimonial2 from '@/assets/images/hero/index-testimonial-2.png'
import indexTestimonial3 from '@/assets/images/hero/index-testimonial-3.png'
import indexTestimonial4 from '@/assets/images/hero/index-testimonial-4.png'
import indexTestimonial5 from '@/assets/images/hero/index-testimonial-5.png'
import indexTestimonial6 from '@/assets/images/hero/index-testimonial-6.png'
import indexTestimonial7 from '@/assets/images/hero/index-testimonial-7.png'
import indexZoneDecBg from '@/assets/images/hero/index-zone-dec-bg.jpg'
import indexZoneSelectedBg from '@/assets/images/hero/index-zone-selected-bg.png'
import ogImage from '@/assets/images/hero/og-image.jpg'
import productDescriptionWatermark from '@/assets/images/hero/product-description-watermark.png'

export const HERO_IMAGES = {
  products: { desktop: heroProductsDesktop, mobile: heroProductsMobile },
  cart: { desktop: heroCartDesktop, mobile: heroCartMobile },
  favorite: { desktop: heroFavoriteDesktop, mobile: heroFavoriteMobile },
  index: {
    hero: heroIndex,
    zoneSelectedBg: indexZoneSelectedBg,
    zoneDecBg: indexZoneDecBg,
    pickMexico: indexPickMexico,
    pickEgypt: indexPickEgypt,
    testimonials: [
      indexTestimonial1,
      indexTestimonial2,
      indexTestimonial3,
      indexTestimonial4,
      indexTestimonial5,
      indexTestimonial6,
      indexTestimonial7,
    ],
    modal: indexModal,
  },
  about: {
    desktop: heroAboutDesktop,
    mobile: heroAboutMobile,
    content: [
      aboutContent1,
      aboutContent2Desktop,
      aboutContent2Mobile,
      aboutContent3,
      aboutContent4,
      aboutContent5,
      aboutContent6,
    ],
  },
  productDescriptionWatermark,
  footerDecorative,
  ogImage,
}
