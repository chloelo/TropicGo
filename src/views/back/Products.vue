<template>
  <div class="backpage backpage-products">
    <loading :active.sync="isLoading" />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-end my-3">
            <button
              type="button"
              class="btn btn-warning"
              @click="openModal('new')"
            >
              建立新的產品
            </button>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">
                    分類
                  </th>
                  <th scope="col">
                    產品圖
                  </th>
                  <th scope="col">
                    產品名稱
                  </th>
                  <th scope="col">
                    原價
                  </th>
                  <th scope="col">
                    售價
                  </th>
                  <th scope="col">
                    是否啟用
                  </th>
                  <th scope="col">
                    編輯
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in products"
                  :key="item.id"
                >
                  <th scope="row">
                    {{ item.category }}
                  </th>
                  <td>
                    <img
                      class="sm-img"
                      :src="item.imageUrl[0]"
                    >
                  </td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.origin_price }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <label class="switch">
                      <input
                        type="checkbox"
                        disabled
                        :checked="item.enabled"
                      >
                      <span class="slider round" />
                    </label>
                  </td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        :disabled="btnLoading === item.id"
                        @click="openModal('edit', item)"
                      >
                        編輯
                        <span
                          v-if="btnLoading === item.id"
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="openModal('del', item)"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ProductModal
            :is-new="isNew"
            :temp-product="tempProduct"
            @update="getProducts"
          />
          <ProductModalDel
            :temp-product="tempProduct"
            @update="getProducts"
          />
          <Pagination
            :pages="pagination"
            @emitpage="getProducts"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import ProductModal from '@/components/ProductModal.vue';
import ProductModalDel from '@/components/ProductModalDel.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    ProductModal,
    ProductModalDel,
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      products: [],
      pagination: {},
      tempProduct: {
        // 第二層結構要先定義，才能雙向綁定
        imageUrl: [],
        options: {},
      },
      isNew: false,
      btnLoading: '',
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          if (this.tempProduct.id || this.isNew) {
            this.tempProduct = {
              imageUrl: [],
              options: {},
            };
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    openModal(status, item) {
      switch (status) {
        case 'new': {
          this.tempProduct = {
            imageUrl: [],
            options: {},
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        }
        case 'edit': {
          this.isNew = false;
          this.btnLoading = item.id;
          const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
          this.$http
            .get(api)
            .then((res) => {
              this.btnLoading = '';
              this.tempProduct = res.data.data;
              $('#productModal').modal('show');
            })
            .catch(() => {
              this.btnLoading = '';
            });
          break;
        }
        case 'del': {
          this.tempProduct = JSON.parse(JSON.stringify(item));
          $('#delProductModal').modal('show');
          break;
        }
        default:
          break;
      }
    },
  },
};
</script>
