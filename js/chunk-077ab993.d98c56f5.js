(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-077ab993"],{"057f":function(t,e,a){var n=a("fc6a"),r=a("241c").f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return r(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==i.call(t)?s(t):r(n(t))}},1799:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination mx-auto"},[a("li",{staticClass:"page-item",class:{disabled:1===t.pages.current_page}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return e.preventDefault(),t.pageUpdate(t.pages.current_page-1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pages.total_pages,(function(e){return a("li",{key:e.current_page,staticClass:"page-item",class:{active:e===t.pages.current_page}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.pageUpdate(e)}}},[t._v(" "+t._s(e)+" ")])])})),a("li",{staticClass:"page-item",class:{disabled:t.pages.current_page===t.pages.total_pages}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return e.preventDefault(),t.pageUpdate(t.pages.current_page+1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])},r=[],i={props:{pages:{type:Object,default:function(){return{}}}},methods:{pageUpdate:function(t){this.$emit("emitpage",t)}}},o=i,s=(a("2f07"),a("2877")),c=Object(s["a"])(o,n,r,!1,null,"0f84cb12",null);e["a"]=c.exports},"2f07":function(t,e,a){"use strict";var n=a("4381"),r=a.n(n);r.a},4381:function(t,e,a){},"53b6":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"backpage backpage-storage"},[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 d-flex align-items-center mb-5"},[a("p",[t._v("新增圖片：")]),a("label",{attrs:{for:"customFile"}},[t.imgUploading?a("span",{staticClass:"mr-2"},[a("i",{staticClass:"fas fa-spinner fa-spin"})]):t._e()]),a("input",{staticClass:"form-control",attrs:{id:"customFile",type:"file"},on:{change:t.uploadFile}})]),a("div",{staticClass:"col-12"},[a("h2",[t._v("圖片列表")]),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table"},[t._m(0),a("tbody",t._l(t.storages,(function(e){return a("tr",{key:e.id},[a("td",[a("img",{attrs:{src:e.path}})]),a("td",{staticClass:"path"},[t._v(" "+t._s(e.path)+" ")]),a("td",[a("div",{staticClass:"btn-group"},[a("button",{staticClass:"btn btn-outline-danger",on:{click:function(a){return a.preventDefault(),t.openModal(e)}}},[t._v(" 刪除 ")])])])])})),0)])]),a("Pagination",{attrs:{pages:t.pagination},on:{emitpage:t.getStorages}}),a("div",{staticClass:"modal fade",attrs:{id:"storageModalDel",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[t._m(1),t._m(2),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-danger",attrs:{type:"button","data-dismiss":"modal"}},[t._v(" 取消 ")]),a("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(e){return t.deleteStorage(t.tempStorage.id)}}},[t._v(" 確認刪除 ")])])])])])],1)])])],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col",width:"15%"}},[t._v(" 圖片縮圖 ")]),a("th",{attrs:{scope:"col"}},[t._v(" 圖片路徑 ")]),a("th",{attrs:{scope:"col",width:"10%"}},[t._v(" 操作 ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header bg-danger text-white"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[a("span",[t._v("刪除產品")])]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-body"},[t._v(" 是否刪除 "),a("strong",{staticClass:"text-danger"},[t._v("你所選取")]),t._v(" 的照片 (刪除後將無法恢復)。 ")])}],i=(a("99af"),a("5530")),o=a("1799"),s={components:{Pagination:o["a"]},data:function(){return{imgUploading:!1,isLoading:!1,storages:[],pagination:{},tempStorage:{}}},created:function(){this.getStorages()},methods:{openModal:function(t){this.tempStorage=Object(i["a"])({},t),$("#storageModalDel").modal("show")},getStorages:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0;var a="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/admin/storage?page=").concat(e);this.$http.get(a).then((function(e){t.isLoading=!1,t.pagination=e.data.meta.pagination,t.storages=e.data.data,t.tempStorage={}})).catch((function(){t.isLoading=!1}))},deleteStorage:function(){var t=this,e="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/admin/storage/").concat(this.tempStorage.id);this.$http.delete(e).then((function(){$("#storageModalDel").modal("hide"),t.$bus.$emit("msg:push","刪除成功囉，ya ~","success"),t.getStorages()})).catch((function(){$("#storageModalDel").modal("hide"),t.$bus.$emit("msg:push","登愣~~出現錯誤了！","danger")}))},uploadFile:function(){var t=this;this.imgUploading=!0;var e=document.querySelector("#customFile").files[0],a=new FormData;a.append("file",e);var n="".concat("https://course-ec-api.hexschool.io/api","/").concat("27645507-6c88-4d1b-816f-1587210ac2be","/admin/storage");this.$http.post(n,a,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){200===e.status&&(t.$bus.$emit("msg:push","上傳成功囉，ya ~","success"),t.imgUploading=!1,t.getStorages())})).catch((function(){t.$bus.$emit("msg:push","登愣~~出現錯誤了！","danger"),t.imgUploading=!1}))}}},c=s,u=a("2877"),l=Object(u["a"])(c,n,r,!1,null,null,null);e["default"]=l.exports},5530:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));a("a4d3"),a("4de4"),a("4160"),a("e439"),a("dbb4"),a("b64b"),a("159b");function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}},"746f":function(t,e,a){var n=a("428f"),r=a("5135"),i=a("e538"),o=a("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});r(e,t)||o(e,t,{value:i.f(t)})}},a4d3:function(t,e,a){"use strict";var n=a("23e7"),r=a("da84"),i=a("d066"),o=a("c430"),s=a("83ab"),c=a("4930"),u=a("fdbf"),l=a("d039"),f=a("5135"),d=a("e8b5"),p=a("861d"),g=a("825a"),b=a("7b0b"),h=a("fc6a"),m=a("c04e"),v=a("5c6c"),y=a("7c73"),O=a("df75"),_=a("241c"),w=a("057f"),C=a("7418"),S=a("06cf"),j=a("9bf2"),P=a("d1e7"),$=a("9112"),k=a("6eeb"),x=a("5692"),D=a("f772"),E=a("d012"),U=a("90e3"),F=a("b622"),L=a("e538"),M=a("746f"),N=a("d44e"),J=a("69f3"),T=a("b727").forEach,q=D("hidden"),I="Symbol",Q="prototype",W=F("toPrimitive"),z=J.set,A=J.getterFor(I),B=Object[Q],G=r.Symbol,H=i("JSON","stringify"),K=S.f,R=j.f,V=w.f,X=P.f,Y=x("symbols"),Z=x("op-symbols"),tt=x("string-to-symbol-registry"),et=x("symbol-to-string-registry"),at=x("wks"),nt=r.QObject,rt=!nt||!nt[Q]||!nt[Q].findChild,it=s&&l((function(){return 7!=y(R({},"a",{get:function(){return R(this,"a",{value:7}).a}})).a}))?function(t,e,a){var n=K(B,e);n&&delete B[e],R(t,e,a),n&&t!==B&&R(B,e,n)}:R,ot=function(t,e){var a=Y[t]=y(G[Q]);return z(a,{type:I,tag:t,description:e}),s||(a.description=e),a},st=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof G},ct=function(t,e,a){t===B&&ct(Z,e,a),g(t);var n=m(e,!0);return g(a),f(Y,n)?(a.enumerable?(f(t,q)&&t[q][n]&&(t[q][n]=!1),a=y(a,{enumerable:v(0,!1)})):(f(t,q)||R(t,q,v(1,{})),t[q][n]=!0),it(t,n,a)):R(t,n,a)},ut=function(t,e){g(t);var a=h(e),n=O(a).concat(gt(a));return T(n,(function(e){s&&!ft.call(a,e)||ct(t,e,a[e])})),t},lt=function(t,e){return void 0===e?y(t):ut(y(t),e)},ft=function(t){var e=m(t,!0),a=X.call(this,e);return!(this===B&&f(Y,e)&&!f(Z,e))&&(!(a||!f(this,e)||!f(Y,e)||f(this,q)&&this[q][e])||a)},dt=function(t,e){var a=h(t),n=m(e,!0);if(a!==B||!f(Y,n)||f(Z,n)){var r=K(a,n);return!r||!f(Y,n)||f(a,q)&&a[q][n]||(r.enumerable=!0),r}},pt=function(t){var e=V(h(t)),a=[];return T(e,(function(t){f(Y,t)||f(E,t)||a.push(t)})),a},gt=function(t){var e=t===B,a=V(e?Z:h(t)),n=[];return T(a,(function(t){!f(Y,t)||e&&!f(B,t)||n.push(Y[t])})),n};if(c||(G=function(){if(this instanceof G)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=U(t),a=function(t){this===B&&a.call(Z,t),f(this,q)&&f(this[q],e)&&(this[q][e]=!1),it(this,e,v(1,t))};return s&&rt&&it(B,e,{configurable:!0,set:a}),ot(e,t)},k(G[Q],"toString",(function(){return A(this).tag})),k(G,"withoutSetter",(function(t){return ot(U(t),t)})),P.f=ft,j.f=ct,S.f=dt,_.f=w.f=pt,C.f=gt,L.f=function(t){return ot(F(t),t)},s&&(R(G[Q],"description",{configurable:!0,get:function(){return A(this).description}}),o||k(B,"propertyIsEnumerable",ft,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:G}),T(O(at),(function(t){M(t)})),n({target:I,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var a=G(e);return tt[e]=a,et[a]=e,a},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){rt=!0},useSimple:function(){rt=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!s},{create:lt,defineProperty:ct,defineProperties:ut,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:pt,getOwnPropertySymbols:gt}),n({target:"Object",stat:!0,forced:l((function(){C.f(1)}))},{getOwnPropertySymbols:function(t){return C.f(b(t))}}),H){var bt=!c||l((function(){var t=G();return"[null]"!=H([t])||"{}"!=H({a:t})||"{}"!=H(Object(t))}));n({target:"JSON",stat:!0,forced:bt},{stringify:function(t,e,a){var n,r=[t],i=1;while(arguments.length>i)r.push(arguments[i++]);if(n=e,(p(e)||void 0!==t)&&!st(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!st(e))return e}),r[1]=e,H.apply(null,r)}})}G[Q][W]||$(G[Q],W,G[Q].valueOf),N(G,I),E[q]=!0},b64b:function(t,e,a){var n=a("23e7"),r=a("7b0b"),i=a("df75"),o=a("d039"),s=o((function(){i(1)}));n({target:"Object",stat:!0,forced:s},{keys:function(t){return i(r(t))}})},dbb4:function(t,e,a){var n=a("23e7"),r=a("83ab"),i=a("56ef"),o=a("fc6a"),s=a("06cf"),c=a("8418");n({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(t){var e,a,n=o(t),r=s.f,u=i(n),l={},f=0;while(u.length>f)a=r(n,e=u[f++]),void 0!==a&&c(l,e,a);return l}})},e439:function(t,e,a){var n=a("23e7"),r=a("d039"),i=a("fc6a"),o=a("06cf").f,s=a("83ab"),c=r((function(){o(1)})),u=!s||c;n({target:"Object",stat:!0,forced:u,sham:!s},{getOwnPropertyDescriptor:function(t,e){return o(i(t),e)}})},e538:function(t,e,a){var n=a("b622");e.f=n}}]);
//# sourceMappingURL=chunk-077ab993.d98c56f5.js.map