<template>
  <section class="kv">
    <div class="title">
      <div class="container">
        <div class="row justify-content-end">
          <div class="col-md-6">
            <h2>{{title}}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ['title'],
  data() {
    return {};
  },
};
</script>
