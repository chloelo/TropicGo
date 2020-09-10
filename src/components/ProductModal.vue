<template>
  <div
    id="productModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-xl"
      role="document"
    >
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5
            id="exampleModalLabel"
            class="modal-title"
          >
            <span>{{ isNew ? '新增產品' : '修改產品資訊' }}</span>
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
          <div class="row">
            <div class="col-sm-4">
              <div
                v-for="idx of 5"
                :key="'img' + idx"
                class="form-group"
              >
                <label :for="'img' + idx">輸入圖片網址</label>
                <input
                  :id="'img' + idx"
                  v-model="tempProduct.imageUrl[idx - 1]"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                >
              </div>
              <div class="form-group">
                <label for="customFile">
                  或 上傳圖片
                  <span v-if="imgUploading">
                    <i class="fas fa-spinner fa-spin" />
                  </span>
                </label>
                <input
                  id="customFile"
                  type="file"
                  class="form-control"
                  @change="uploadFile"
                >
              </div>
              <img
                class="img-fluid"
                :src="tempProduct.imageUrl[0]"
              >
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  id="title"
                  v-model="tempProduct.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  required
                >
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    id="category"
                    v-model="tempProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    required
                  >
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">單位</label>
                  <input
                    id="unit"
                    v-model="tempProduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  >
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    id="origin_price"
                    v-model="tempProduct.origin_price"
                    type="number"
                    class="form-control"
                    placeholder="請輸入原價"
                  >
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    id="price"
                    v-model="tempProduct.price"
                    type="number"
                    class="form-control"
                    placeholder="請輸入售價"
                  >
                </div>
              </div>
              <hr>

              <div class="form-group">
                <label for="content">產品說明</label>

                <textarea
                  id="content"
                  v-model="tempProduct.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品說明"
                  required
                />
              </div>
              <div class="form-group">
                <label for="description">產品詳述</label>
                <VueEditor
                  id="description"
                  v-model="tempProduct.description"
                />
              </div>
              <div class="form-group">
                <label for="departureCity">出發城市</label>
                <select
                  id="departureCity"
                  v-model="tempProduct.options.departureCity"
                  class="form-control"
                >
                  <option
                    disabled
                    selected
                    value=""
                  >
                    請選擇
                  </option>
                  <option value="台北">
                    台北
                  </option>
                  <option value="桃園">
                    桃園
                  </option>
                  <option value="台中">
                    台中
                  </option>
                  <option value="高雄">
                    高雄
                  </option>
                </select>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <div class="form-check">
                    <input
                      id="enabled"
                      v-model="tempProduct.enabled"
                      class="form-check-input"
                      type="checkbox"
                    >
                    <label
                      class="form-check-label"
                      for="enabled"
                    >是否啟用</label>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div class="form-check">
                    <input
                      id="popular"
                      v-model="tempProduct.options.popular"
                      class="form-check-input"
                      type="checkbox"
                    >
                    <label
                      class="form-check-label"
                      for="popular"
                    >是否為熱門商品</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn bg-secondary text-white"
            @click="updateProduct()"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import { VueEditor } from 'vue2-editor';

export default {
  components: { VueEditor },
  props: ['isNew', 'tempProduct'],
  data() {
    return {
      imgUploading: false,
    };
  },
  methods: {
    updateProduct() {
      let httpWay = 'post';
      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let status = '新增成功囉，ya ~';
      if (!this.isNew) {
        httpWay = 'patch';
        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
        status = '更新成功囉，ya ~';
      }

      this.$http[httpWay](api, this.tempProduct)
        .then(() => {
          $('#productModal').modal('hide');
          this.$bus.$emit('msg:push', status, 'success');
          this.$emit('update');
        })
        .catch(() => {
          $('#productModal').modal('hide');
          this.$bus.$emit('msg:push', '登愣~~出現錯誤了！', 'danger');
        });
    },
    uploadFile() {
      this.imgUploading = true;
      const uploadedfile = document.querySelector('#customFile').files[0];
      const formData = new FormData();
      formData.append('file', uploadedfile);
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`;
      this.$http
        .post(api, formData, {
          // 聲明是 formData 的格式，寫法也是固定的
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          // 如果圖片傳送成功，就把照片新增到圖片的陣列中
          if (res.status === 200) {
            // 傳送成功之後 icon 就不顯示
            this.$bus.$emit('msg:push', '上傳成功囉，ya ~', 'success');
            this.imgUploading = false;
            this.tempProduct.imageUrl.push(res.data.data.path);
          }
        })
        .catch(() => {
          this.$bus.$emit('msg:push', '登愣~~出現錯誤了！', 'danger');
          this.imgUploading = true;
        });
    },
  },
};
</script>
