<template>
  <div class="backpage backpage-storage">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex align-items-center mb-5">
          <p>新增圖片：</p>
          <label for="customFile">
            <span
              v-if="imgUploading"
              class="mr-2"
            >
              <i class="fas fa-spinner fa-spin"></i>
            </span>
          </label>
          <input
            id="customFile"
            type="file"
            class="form-control"
            @change="uploadFile"
          />

        </div>
        <div class="col-12">
          <h2>圖片列表</h2>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    width="15%"
                  >圖片縮圖</th>
                  <th scope="col">圖片路徑</th>
                  <th
                    scope="col"
                    width="10%"
                  >操作</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in storages"
                  :key="item.id"
                >
                  <td><img :src="item.path"></td>
                  <td class="path">{{ item.path }}</td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-outline-danger"
                        @click.prevent="openModal(item)"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination
            :pages="pagination"
            @emitpage="getStorages"
          ></Pagination>

          <!-- Modal del -->
          <div
            id="storageModalDel"
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
                  <strong class="text-danger">你所選取</strong> 的照片
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
                    @click="deleteStorage(tempStorage.id)"
                  >
                    確認刪除
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal end -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      imgUploading: false,
      isLoading: false,
      storages: [],
      pagination: {},
      tempStorage: {},
    };
  },
  created() {
    this.getStorages();
  },
  methods: {
    openModal(item) {
      this.tempStorage = { ...item };
      $('#storageModalDel').modal('show');
    },
    getStorages(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false;
          this.pagination = res.data.meta.pagination;
          this.storages = res.data.data;
          this.tempStorage = {};
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    deleteStorage() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${this.tempStorage.id}`;
      this.$http
        .delete(api)
        .then(() => {
          $('#storageModalDel').modal('hide');
          this.$bus.$emit('msg:push', '刪除成功囉，ya ~', 'success');
          this.getStorages();
        })
        .catch(() => {
          $('#storageModalDel').modal('hide');
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
            // 傳送成功之後 icon就不顯示
            this.$bus.$emit('msg:push', '上傳成功囉，ya ~', 'success');
            this.imgUploading = false;
            this.getStorages();
          }
        })
        .catch(() => {
          this.$bus.$emit('msg:push', '登愣~~出現錯誤了！', 'danger');
          this.imgUploading = false;
        });
    },
  },
};
</script>
