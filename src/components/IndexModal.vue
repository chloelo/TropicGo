<template>
  <div
    id="idxModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="idxModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="idxModalLabel"
            class="modal-title text-primary"
          >
            最新優惠
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
          <img
            class="img-fluid"
            :src="img"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img:
        'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/i7lcLyHaMQy0s7AW8yiDYKyfcRMFJ0n43Owjrbsgt9wnlz8uQFSuBgRsDwgCDeXa0IQi8rn01JCJAAS6CWMOdsmW8NviNp04F8FxUbrP6X2iTBibYQJJEJ1eAo8WurQk.jpg',
    };
  },
};
</script>
