(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24335121"],{"057f":function(t,s,e){var a=e("fc6a"),i=e("241c").f,n={}.toString,r="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],o=function(t){try{return i(t)}catch(s){return r.slice()}};t.exports.f=function(t){return r&&"[object Window]"==n.call(t)?o(t):i(a(t))}},5530:function(t,s,e){"use strict";e.d(s,"a",(function(){return n}));e("a4d3"),e("4de4"),e("4160"),e("e439"),e("dbb4"),e("b64b"),e("159b");function a(t,s,e){return s in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}function i(t,s){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);s&&(a=a.filter((function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable}))),e.push.apply(e,a)}return e}function n(t){for(var s=1;s<arguments.length;s++){var e=null!=arguments[s]?arguments[s]:{};s%2?i(Object(e),!0).forEach((function(s){a(t,s,e[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(e,s))}))}return t}},"62b3":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"front front-cart"},[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}}),e("HeroBanner",{attrs:{title:t.title}}),e("section",{staticClass:"zones zone_process"},[e("div",{staticClass:"container "},[e("div",{staticClass:"row justify-content-center"},[e("div",{staticClass:"col-md-10"},[e("div",{staticClass:"step-wrap"},[t._m(0),e("div",{staticClass:"step step2",class:{done:2===t.step||3===t.step||4===t.step}},[t._m(1),e("span",{staticClass:"txt"},[t._v("填寫資料")])]),e("div",{staticClass:"step step3",class:{done:3===t.step||4===t.step}},[t._m(2),e("span",{staticClass:"txt"},[t._v("確認付款")])]),e("div",{staticClass:"step step4",class:{done:4===t.step}},[t._m(3),e("span",{staticClass:"txt"},[t._v("完成訂單")])])]),e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar bg-secondary",class:{step2:2===t.step,step3:3===t.step,step4:4===t.step},attrs:{role:"progressbar","aria-valuenow":"50","aria-valuemin":"0","aria-valuemax":"100"}})])])])])]),e("section",{directives:[{name:"show",rawName:"v-show",value:1===t.step,expression:"step === 1"}],staticClass:"zones zone_cartList"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row justify-content-center"},[t.carts.length?e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"d-flex justify-content-between align-items-center mb-3"},[e("router-link",{staticClass:"text-secondary",attrs:{to:"/products"}},[e("span",[e("i",{staticClass:"fas fa-chevron-left"})]),t._v(" 繼續購物 ")]),e("button",{staticClass:"btn btn-del btn-outline-light border-0",attrs:{type:"button"},on:{click:t.removeAllCart}},[t._m(4),t._v(" 清空購物車 ")])],1),t._l(t.carts,(function(s){return e("div",{key:s.product.id,staticClass:"d-flex bg-light align-items-center mb-4"},[e("div",{staticClass:"img-wrap pl-3"},[e("img",{attrs:{src:s.product.imageUrl[0]}})]),e("div",{staticClass:"w-100 p-3 position-relative"},[e("a",{staticClass:"position-absolute close",staticStyle:{top:"16px",right:"16px"},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.removeCart(s.product.id)}}},[e("i",{staticClass:"fas fa-times"})]),e("p",{staticClass:"mb-0 font-weight-bold pr-4 text-africa"},[t._v(" "+t._s(s.product.title)+" ")]),e("p",{staticClass:"mb-1 text-muted",staticStyle:{"font-size":"14px"}},[t._v(" "+t._s(t._f("money")(s.product.price))+" / "+t._s(s.product.unit)+" ")]),e("div",{staticClass:"input-group-wrap mt-2"},[e("div",{staticClass:"input-group align-items-center"},[e("div",{staticClass:"input-group-prepend"},[e("button",{staticClass:"btn btn-outline-secondary border-right-0",attrs:{disabled:1===s.quantity,type:"button"},on:{click:function(e){return e.preventDefault(),t.updateQuantity(s.product.id,s.quantity-1)}}},[t._m(5,!0)])]),e("input",{directives:[{name:"model",rawName:"v-model",value:s.quantity,expression:"item.quantity"}],staticClass:"form-control text-center pl-3 text-secondary border-left-0 border-right-0",attrs:{type:"number",min:"1","aria-describedby":"basic-addon1"},domProps:{value:s.quantity},on:{change:function(e){return t.updateQuantity(s.product.id,s.quantity)},input:function(e){e.target.composing||t.$set(s,"quantity",e.target.value)}}}),e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-outline-secondary border-left-0",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.updateQuantity(s.product.id,s.quantity+1)}}},[t._m(6,!0)])])]),e("p",{staticClass:"mb-0 ml-auto"},[t._v(" 小計："+t._s(t._f("money")(s.product.price*s.quantity))+" ")])])])])}))],2):e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"border-bottom my-2 py-2"},[e("router-link",{staticClass:"text-secondary",attrs:{to:"/products"}},[e("span",[e("i",{staticClass:"fas fa-chevron-left"})]),t._v(" 繼續購物 ")])],1),t._m(7)]),e("div",{staticClass:"col-md-4"},[e("div",{staticClass:"p-3 mb-3 border"},[e("div",{staticClass:"d-flex justify-content-between"},[e("span",{staticClass:"font-weight-bold"},[t._v("商品總額")]),e("span",[t._v(t._s(t._f("money")(t.totalPrice)))])]),e("form",{on:{submit:function(s){return s.preventDefault(),t.findCoupon(s)}}},[e("div",{staticClass:"d-flex justify-content-between mt-3"},[e("div",{staticClass:"input-group input-group-sm coupon-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.couponCode,expression:"couponCode"}],staticClass:"form-control",attrs:{type:"text","aria-label":"請輸入折扣碼",placeholder:"請輸入折扣碼","aria-describedby":"inputGroup-sizing-sm"},domProps:{value:t.couponCode},on:{input:function(s){s.target.composing||(t.couponCode=s.target.value)}}}),t._m(8)])])]),t.coupon.enabled?e("div",{staticClass:"d-flex justify-content-between mt-3"},[e("span",{staticClass:"font-weight-bold"},[t._v("折扣")]),e("span",{staticClass:"text-danger"},[t._v("- "+t._s(t._f("money")(t.totalPrice-t.totalPriceWithDiscount)))])]):e("div",{staticClass:"d-flex justify-content-between mt-3"},[e("span",{staticClass:"font-weight-bold"},[t._v("折扣")]),e("span",{staticClass:"text-danger"},[t._v("- "+t._s(t._f("money")(0)))])]),e("div",{staticClass:"d-flex justify-content-between mt-3 border-dashed-top"},[e("p",{staticClass:"mb-0 font-weight-bold "},[t._v(" 應付金額 ")]),e("p",{staticClass:"mb-0 h4 font-weight-bold text-secondary"},[t._v(" "+t._s(t._f("money")(t.totalPriceWithDiscount))+" ")])]),e("button",{staticClass:"btn btn-secondary mt-3 btn-block",attrs:{disabled:!t.carts.length},on:{click:function(s){s.preventDefault(),t.step=2,t.winScroll()}}},[t._v(" 前往結帳 "),t._m(9)])])])])])]),e("section",{directives:[{name:"show",rawName:"v-show",value:2===t.step,expression:"step === 2"}],staticClass:"zones zone_form"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row flex-row-reverse"},[e("div",{staticClass:"col-md-6 col-lg-4"},[e("div",{staticClass:"p-3 mb-5 border"},[t._l(t.carts,(function(s){return e("div",{key:s.product.id,staticClass:"d-flex mb-3"},[e("img",{staticClass:"mr-2",staticStyle:{width:"48px",height:"48px","object-fit":"cover"},attrs:{src:s.product.imageUrl[0]}}),e("div",{staticClass:"w-100"},[e("div",{staticClass:"d-flex justify-content-between"},[e("p",{staticClass:"mb-0 mr-2 font-weight-bold"},[t._v(" "+t._s(s.product.title)+" ")]),e("p",{staticClass:"mb-0"},[t._v(" "+t._s(t._f("money")(s.product.price))+" ")])]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" x "+t._s(s.quantity)+" ")])])])})),e("div",{staticClass:"d-flex justify-content-between align-items-center mt-4 border-dashed-top"},[e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" 總計 ")]),e("p",{staticClass:"mb-0 h4 font-weight-bold text-secondary"},[t._v(" "+t._s(t._f("money")(t.totalPriceWithDiscount))+" ")])])],2)]),e("div",{staticClass:"col-lg-8 col-md-6"},[e("div",{staticClass:"form-wrap"},[e("h3",{staticClass:"mb-4 text-center pb-3 border-bottom"},[t._v(" 客戶訂單資訊 ")]),e("validation-observer",{scopedSlots:t._u([{key:"default",fn:function(s){var a=s.invalid;return[e("form",{on:{submit:function(s){return s.preventDefault(),t.createOrder(s)}}},[e("div",{staticClass:"form-row"},[e("div",{staticClass:"col-md-6 form-group"},[e("validation-provider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.errors,i=s.classes;return[e("label",{attrs:{for:"username"}},[t._v("聯絡人姓名 "),e("span",{staticClass:"text-danger"},[t._v("*")])]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.name,expression:"form.name"}],staticClass:"form-control",class:i,attrs:{id:"username",type:"text",name:"聯絡人姓名",placeholder:"請輸入聯絡人姓名"},domProps:{value:t.form.name},on:{input:function(s){s.target.composing||t.$set(t.form,"name",s.target.value)}}}),e("span",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1),e("div",{staticClass:"col-md-6 form-group"},[e("validation-provider",{attrs:{rules:"required|numeric|min:8"},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.errors,i=s.classes;return[e("label",{attrs:{for:"tel"}},[t._v("電話 "),e("span",{staticClass:"text-danger"},[t._v("*")])]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.tel,expression:"form.tel"}],staticClass:"form-control",class:i,attrs:{id:"tel",type:"tel",name:"電話",placeholder:"請輸入電話"},domProps:{value:t.form.tel},on:{input:function(s){s.target.composing||t.$set(t.form,"tel",s.target.value)}}}),e("span",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1)]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"col form-group"},[e("validation-provider",{attrs:{rules:"required|email"},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.errors,i=s.classes;return[e("label",{attrs:{for:"email"}},[t._v("E-mail "),e("span",{staticClass:"text-danger"},[t._v("*")])]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.email,expression:"form.email"}],staticClass:"form-control",class:i,attrs:{id:"email",type:"email",name:"E-mail",placeholder:"請輸入 E-mail"},domProps:{value:t.form.email},on:{input:function(s){s.target.composing||t.$set(t.form,"email",s.target.value)}}}),e("span",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1)]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"col form-group"},[e("validation-provider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(s){var a=s.errors,i=s.classes;return[e("label",{attrs:{for:"address"}},[t._v("聯絡人地址 "),e("span",{staticClass:"text-danger"},[t._v("*")])]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.address,expression:"form.address"}],staticClass:"form-control",class:i,attrs:{id:"address",type:"text",name:"聯絡人地址",placeholder:"請輸入聯絡人地址"},domProps:{value:t.form.address},on:{input:function(s){s.target.composing||t.$set(t.form,"address",s.target.value)}}}),e("span",{staticClass:"invalid-feedback"},[t._v(t._s(a[0]))])]}}],null,!0)})],1)]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"col form-group"},[e("label",{attrs:{for:"waytopay"}},[t._v("購買方式 "),e("span",{staticClass:"text-danger"},[t._v("*")])]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.form.payment,expression:"form.payment"}],staticClass:"form-control",attrs:{id:"waytopay",name:"購買方式",required:""},on:{change:function(s){var e=Array.prototype.filter.call(s.target.options,(function(t){return t.selected})).map((function(t){var s="_value"in t?t._value:t.value;return s}));t.$set(t.form,"payment",s.target.multiple?e:e[0])}}},[e("option",{attrs:{value:"",disabled:""}},[t._v(" 請選擇付款方式 ")]),e("option",{attrs:{value:"WebATM"}},[t._v(" WebATM ")]),e("option",{attrs:{value:"ATM"}},[t._v(" ATM ")]),e("option",{attrs:{value:"CVS"}},[t._v(" CVS ")]),e("option",{attrs:{value:"Barcode"}},[t._v(" Barcode ")]),e("option",{attrs:{value:"Credit"}},[t._v(" Credit ")]),e("option",{attrs:{value:"ApplePay"}},[t._v(" ApplePay ")]),e("option",{attrs:{value:"GooglePay"}},[t._v(" GooglePay ")])])])]),e("div",{staticClass:"form-row"},[e("div",{staticClass:"col form-group"},[e("label",{attrs:{for:"message"}},[t._v("備註留言")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.message,expression:"form.message"}],staticClass:"form-control",attrs:{id:"message",cols:"30",rows:"3"},domProps:{value:t.form.message},on:{input:function(s){s.target.composing||t.$set(t.form,"message",s.target.value)}}})])]),e("div",{staticClass:"form-row align-items-center"},[e("div",{staticClass:"col form-group"},[e("a",{staticClass:"text-secondary",attrs:{href:"#",disabled:!t.carts.length},on:{click:function(s){s.preventDefault(),t.step=1,t.winScroll()}}},[e("span",[e("i",{staticClass:"fas fa-chevron-left"})]),t._v(" 回上一步 ")])]),e("div",{staticClass:"col form-group text-right"},[e("button",{staticClass:"btn btn-secondary",class:{"btn-disabled":a},attrs:{type:"submit",disabled:a}},[t._v(" 確認送出 ")])])])])]}}])})],1)])])])]),e("section",{directives:[{name:"show",rawName:"v-show",value:3===t.step,expression:"step === 3"}],staticClass:"zones zone_order"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row justify-content-center"},[e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"p-3 mb-5 border"},[e("h4",{staticClass:"mb-4 border-bottom pb-2 text-center"},[t._v(" 訂單明細 ")]),e("div",{staticClass:"row"},t._l(t.order.products,(function(s,a){return e("div",{key:a+1,staticClass:"col-12"},[e("div",{staticClass:"d-flex mb-3"},[e("img",{staticClass:"mr-2",staticStyle:{width:"48px",height:"48px","object-fit":"cover"},attrs:{src:s.product.imageUrl[0]}}),e("div",{staticClass:"w-100"},[e("div",{staticClass:"d-flex justify-content-between"},[e("p",{staticClass:"mb-0 mr-2 font-weight-bold"},[t._v(" "+t._s(s.product.title)+" ")]),e("p",{staticClass:"mb-0 text-right"},[t._v(" "+t._s(t._f("money")(s.product.price*s.quantity))+" ")])]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(s.quantity)+" "+t._s(s.product.unit)+" ")])])]),e("div",{staticClass:"d-flex justify-content-between mt-4"},[e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" 折扣金額 ")]),e("p",{staticClass:"mb-0"},[t._v(" - "+t._s(t._f("money")(s.product.price*s.quantity-t.order.amount))+" ")])])])})),0),e("div",{staticClass:"d-flex justify-content-between align-items-center mt-3 border-dashed-top"},[e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" 訂單金額 ")]),e("p",{staticClass:"mb-0 h4 font-weight-bold text-secondary"},[t._v(" "+t._s(t._f("money")(t.order.amount))+" ")])])]),e("form",{on:{submit:function(s){return s.preventDefault(),t.payOrder(s)}}},[e("div",{staticClass:"p-3 mb-5 order-infos"},[e("h4",{staticClass:"mb-4 border-bottom pb-2 text-center"},[t._v(" 聯絡人資料 ")]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 聯絡人姓名 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.user.name)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 聯絡人電話 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.user.tel)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 聯絡人信箱 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.user.email)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 聯絡人地址 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.user.address)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 付款方式 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.payment)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 付款狀態 ")]),t.order.paid?e("p",{staticClass:"mb-0 font-weight-bold text-secondary"},[t._v(" 已付款 ")]):e("p",{staticClass:"mb-0 font-weight-bold text-danger"},[t._v(" 尚未付款 ")])]),e("button",{staticClass:"btn btn-secondary btn-block mt-3",attrs:{type:"submit"}},[t._v(" 確認付款 ")])])])])])])]),e("section",{directives:[{name:"show",rawName:"v-show",value:4===t.step,expression:"step === 4"}],staticClass:"zones zone_checkout"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row align-items-center justify-content-center"},[e("div",{staticClass:"col-md-8 mt-5"},[e("div",{staticClass:"wrap text-center"},[e("h3",[t._v(" 恭喜您，已完成付款！ ")]),e("p",[t._v("感謝您對 TropicGo 的信任，我們會盡快與您聯絡，請耐心等候。")]),e("div",{staticClass:"d-flex justify-content-around mb-5 mt-4"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-toggle":"collapse",href:"#multiCollapseExample1",role:"button","aria-expanded":"false","aria-controls":"multiCollapseExample1"}},[t._v(" 查看訂單 ")]),e("router-link",{staticClass:"btn btn-secondary",attrs:{to:"/products"}},[t._v(" 再去逛逛 "),e("span",[e("i",{staticClass:"fas fa-chevron-right"})])])],1)]),e("div",{staticClass:"wrap collapse multi-collapse",attrs:{id:"multiCollapseExample1"}},[e("div",{staticClass:"p-3 mb-5 order-infos"},[e("h4",{staticClass:"mb-4 border-bottom pb-2 text-center"},[t._v(" 聯絡人資料 ")]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 聯絡人姓名 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.user.name)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 聯絡人電話 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.user.tel)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 聯絡人信箱 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.user.email)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 聯絡人地址 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.user.address)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 付款方式 ")]),e("p",{staticClass:"mb-0 font-weight-bold"},[t._v(" "+t._s(t.order.payment)+" ")])]),e("div",{staticClass:"d-flex justify-content-between align-items-center list"},[e("p",{staticClass:"mb-0 mr-3"},[t._v(" 付款狀態 ")]),t.order.paid?e("p",{staticClass:"mb-0 font-weight-bold text-secondary"},[t._v(" 已付款 ")]):e("p",{staticClass:"mb-0 font-weight-bold text-danger"},[t._v(" 尚未付款 ")])])])])])])])])],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"step step1 done"},[e("span",{staticClass:"icon"},[e("i",{staticClass:"fas fa-luggage-cart"})]),e("span",{staticClass:"txt"},[t._v("確認清單")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fas fa-list-alt"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fas fa-money-check-alt"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fas fa-address-card"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",[e("i",{staticClass:"fas fa-trash-alt"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",[e("i",{staticClass:"fas fa-minus"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",[e("i",{staticClass:"fas fa-plus"})])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"d-flex justify-content-center align-items-center mb-3"},[e("p",[t._v("您尚未選擇任何行程喔，快去選購吧！")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{id:"inputGroup-sizing-sm",type:"submit"}},[t._v(" 套用 ")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("span",[e("i",{staticClass:"fas fa-chevron-right"})])}],n=(e("99af"),e("5530")),r=e("ddcb"),o={components:{HeroBanner:r["a"]},data:function(){return{title:"建立訂單",isLoading:!1,step:1,couponCode:"",totalPrice:0,totalQuantity:0,carts:[],product:{imageUrl:[],quantity:1},form:{name:"",email:"",tel:"",address:"",payment:"",message:""},orderID:"",order:{user:{}},coupon:{}}},computed:{totalPriceWithDiscount:function(){return this.coupon.enabled?this.totalPrice*(this.coupon.percent/100):this.totalPrice}},created:function(){var t=this;this.$bus.$emit("get-cart"),this.$bus.$on("cart-info",(function(s,e,a){t.totalPrice=s,t.totalQuantity=e,t.carts=a}))},beforeDestroy:function(){this.$bus.$off("cart-info")},methods:{updateQuantity:function(t,s){var e=this;if(this.isLoading=!0,!(s<1)){var a="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/shopping"),i={product:t,quantity:s};this.$http.patch(a,i).then((function(){e.isLoading=!1,e.$bus.$emit("get-cart"),e.$bus.$emit("msg:push","成功更改商品數量囉","success")})).catch((function(){e.isLoading=!1,e.$bus.$emit("msg:push","出現錯誤","danger")}))}},removeCart:function(t){var s=this;this.isLoading=!0;var e="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/shopping/").concat(t);this.$http.delete(e).then((function(){s.isLoading=!1,s.$bus.$emit("get-cart"),s.$bus.$emit("msg:push","成功刪除購物車品項","success")})).catch((function(){s.isLoading=!1,s.$bus.$emit("msg:push","出現錯誤","danger")}))},removeAllCart:function(){var t=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/shopping/all/product");this.$http.delete(s).then((function(){t.isLoading=!1,t.carts=[],t.$bus.$emit("get-cart"),t.$bus.$emit("msg:push","成功清除購物車","success")})).catch((function(){t.isLoading=!1,t.$bus.$emit("msg:push","出現錯誤","danger")}))},findCoupon:function(){var t=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/coupon/search");this.$http.post(s,{code:this.couponCode}).then((function(s){t.coupon=s.data.data,t.$bus.$emit("msg:push","優惠碼正確，已幫您折扣囉","success"),t.isLoading=!1})).catch((function(){t.$bus.$emit("msg:push","折扣碼無效喔","danger"),t.isLoading=!1})),this.couponCode=""},createOrder:function(){var t=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/orders"),e=Object(n["a"])({},this.form);this.coupon.enabled&&(e.coupon=this.coupon.code),this.$http.post(s,e).then((function(s){t.isLoading=!1,t.orderID=s.data.data.id,t.form={name:"",email:"",tel:"",address:"",payment:"",message:""},t.$bus.$emit("get-cart"),t.step=3,t.getOrder(t.orderID)})).catch((function(){t.$bus.$emit("msg:push","建立訂單失敗","danger"),t.isLoading=!1}))},getOrder:function(){var t=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/orders/").concat(this.orderID);this.$http.get(s).then((function(s){t.order=s.data.data,t.isLoading=!1})).catch((function(){t.$bus.$emit("msg:push","該訂單不存在","danger")}))},payOrder:function(){var t=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/ec/orders/").concat(this.orderID,"/paying");this.$http.post(s).then((function(s){s.data.data.paid&&(t.step=4,t.getOrder(t.orderID),t.isLoading=!1)})).catch((function(){t.$bus.$emit("msg:push","該訂單不存在","danger"),t.isLoading=!1}))},winScroll:function(){var t=$(window).scrollTop();t>=10&&$("html,body").animate({scrollTop:250},700)}}},c=o,l=e("2877"),d=Object(l["a"])(c,a,i,!1,null,null,null);s["default"]=d.exports},"746f":function(t,s,e){var a=e("428f"),i=e("5135"),n=e("e538"),r=e("9bf2").f;t.exports=function(t){var s=a.Symbol||(a.Symbol={});i(s,t)||r(s,t,{value:n.f(t)})}},a4d3:function(t,s,e){"use strict";var a=e("23e7"),i=e("da84"),n=e("d066"),r=e("c430"),o=e("83ab"),c=e("4930"),l=e("fdbf"),d=e("d039"),u=e("5135"),p=e("e8b5"),f=e("861d"),m=e("825a"),v=e("7b0b"),b=e("fc6a"),g=e("c04e"),h=e("5c6c"),C=e("7c73"),_=e("df75"),y=e("241c"),w=e("057f"),x=e("7418"),$=e("06cf"),j=e("9bf2"),O=e("d1e7"),P=e("9112"),S=e("6eeb"),k=e("5692"),D=e("f772"),E=e("d012"),L=e("90e3"),q=e("b622"),N=e("e538"),z=e("746f"),A=e("d44e"),T=e("69f3"),I=e("b727").forEach,Q=D("hidden"),W="Symbol",G="prototype",B=q("toPrimitive"),J=T.set,M=T.getterFor(W),U=Object[G],F=i.Symbol,H=n("JSON","stringify"),V=$.f,K=j.f,R=w.f,X=O.f,Y=k("symbols"),Z=k("op-symbols"),tt=k("string-to-symbol-registry"),st=k("symbol-to-string-registry"),et=k("wks"),at=i.QObject,it=!at||!at[G]||!at[G].findChild,nt=o&&d((function(){return 7!=C(K({},"a",{get:function(){return K(this,"a",{value:7}).a}})).a}))?function(t,s,e){var a=V(U,s);a&&delete U[s],K(t,s,e),a&&t!==U&&K(U,s,a)}:K,rt=function(t,s){var e=Y[t]=C(F[G]);return J(e,{type:W,tag:t,description:s}),o||(e.description=s),e},ot=l?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof F},ct=function(t,s,e){t===U&&ct(Z,s,e),m(t);var a=g(s,!0);return m(e),u(Y,a)?(e.enumerable?(u(t,Q)&&t[Q][a]&&(t[Q][a]=!1),e=C(e,{enumerable:h(0,!1)})):(u(t,Q)||K(t,Q,h(1,{})),t[Q][a]=!0),nt(t,a,e)):K(t,a,e)},lt=function(t,s){m(t);var e=b(s),a=_(e).concat(mt(e));return I(a,(function(s){o&&!ut.call(e,s)||ct(t,s,e[s])})),t},dt=function(t,s){return void 0===s?C(t):lt(C(t),s)},ut=function(t){var s=g(t,!0),e=X.call(this,s);return!(this===U&&u(Y,s)&&!u(Z,s))&&(!(e||!u(this,s)||!u(Y,s)||u(this,Q)&&this[Q][s])||e)},pt=function(t,s){var e=b(t),a=g(s,!0);if(e!==U||!u(Y,a)||u(Z,a)){var i=V(e,a);return!i||!u(Y,a)||u(e,Q)&&e[Q][a]||(i.enumerable=!0),i}},ft=function(t){var s=R(b(t)),e=[];return I(s,(function(t){u(Y,t)||u(E,t)||e.push(t)})),e},mt=function(t){var s=t===U,e=R(s?Z:b(t)),a=[];return I(e,(function(t){!u(Y,t)||s&&!u(U,t)||a.push(Y[t])})),a};if(c||(F=function(){if(this instanceof F)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,s=L(t),e=function(t){this===U&&e.call(Z,t),u(this,Q)&&u(this[Q],s)&&(this[Q][s]=!1),nt(this,s,h(1,t))};return o&&it&&nt(U,s,{configurable:!0,set:e}),rt(s,t)},S(F[G],"toString",(function(){return M(this).tag})),S(F,"withoutSetter",(function(t){return rt(L(t),t)})),O.f=ut,j.f=ct,$.f=pt,y.f=w.f=ft,x.f=mt,N.f=function(t){return rt(q(t),t)},o&&(K(F[G],"description",{configurable:!0,get:function(){return M(this).description}}),r||S(U,"propertyIsEnumerable",ut,{unsafe:!0}))),a({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:F}),I(_(et),(function(t){z(t)})),a({target:W,stat:!0,forced:!c},{for:function(t){var s=String(t);if(u(tt,s))return tt[s];var e=F(s);return tt[s]=e,st[e]=s,e},keyFor:function(t){if(!ot(t))throw TypeError(t+" is not a symbol");if(u(st,t))return st[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),a({target:"Object",stat:!0,forced:!c,sham:!o},{create:dt,defineProperty:ct,defineProperties:lt,getOwnPropertyDescriptor:pt}),a({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:ft,getOwnPropertySymbols:mt}),a({target:"Object",stat:!0,forced:d((function(){x.f(1)}))},{getOwnPropertySymbols:function(t){return x.f(v(t))}}),H){var vt=!c||d((function(){var t=F();return"[null]"!=H([t])||"{}"!=H({a:t})||"{}"!=H(Object(t))}));a({target:"JSON",stat:!0,forced:vt},{stringify:function(t,s,e){var a,i=[t],n=1;while(arguments.length>n)i.push(arguments[n++]);if(a=s,(f(s)||void 0!==t)&&!ot(t))return p(s)||(s=function(t,s){if("function"==typeof a&&(s=a.call(this,t,s)),!ot(s))return s}),i[1]=s,H.apply(null,i)}})}F[G][B]||P(F[G],B,F[G].valueOf),A(F,W),E[Q]=!0},b64b:function(t,s,e){var a=e("23e7"),i=e("7b0b"),n=e("df75"),r=e("d039"),o=r((function(){n(1)}));a({target:"Object",stat:!0,forced:o},{keys:function(t){return n(i(t))}})},dbb4:function(t,s,e){var a=e("23e7"),i=e("83ab"),n=e("56ef"),r=e("fc6a"),o=e("06cf"),c=e("8418");a({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(t){var s,e,a=r(t),i=o.f,l=n(a),d={},u=0;while(l.length>u)e=i(a,s=l[u++]),void 0!==e&&c(d,s,e);return d}})},ddcb:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",{staticClass:"kv"},[e("div",{staticClass:"title"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row justify-content-end"},[e("div",{staticClass:"col-md-6"},[e("h2",[t._v(t._s(t.title))])])])])])])},i=[],n={props:{title:{type:String,default:""}},data:function(){return{}}},r=n,o=e("2877"),c=Object(o["a"])(r,a,i,!1,null,null,null);s["a"]=c.exports},e439:function(t,s,e){var a=e("23e7"),i=e("d039"),n=e("fc6a"),r=e("06cf").f,o=e("83ab"),c=i((function(){r(1)})),l=!o||c;a({target:"Object",stat:!0,forced:l,sham:!o},{getOwnPropertyDescriptor:function(t,s){return r(n(t),s)}})},e538:function(t,s,e){var a=e("b622");s.f=a}}]);
//# sourceMappingURL=chunk-24335121.4d9749ae.js.map