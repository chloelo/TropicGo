<template>
  <div
    id="delProductModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5
            id="exampleModalLabel"
            class="modal-title"
          >
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong> 商品
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-danger"
            data-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteProduct(tempProduct.id)"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  props: {
    tempProduct: {
      type: Object,
      default() {
        return {
          imageUrl: [],
          options: {},
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteProduct() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
      this.$http
        .delete(api)
        .then(() => {
          $('#delProductModal').modal('hide');
          this.$bus.$emit('msg:push', '刪除成功囉，ya ~', 'success');
          this.$emit('update');
        })
        .catch(() => {
          $('#delProductModal').modal('hide');
          this.$bus.$emit('msg:push', '登愣~~出現錯誤了！', 'danger');
        });
    },
  },
};
</script>
