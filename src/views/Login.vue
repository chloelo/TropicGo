<template>
  <div class="login">
    <div class="formLogin-wrap">
      <h2>請先登入</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="inputEmail">Email address</label>
          <input
            id="inputEmail"
            v-model="user.email"
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            required
          >
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            id="inputPassword"
            v-model="user.password"
            type="password"
            class="form-control"
            required
          >
        </div>
        <button
          type="submit"
          class="btn btn-login"
        >
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`;

      this.$http
        .post(api, this.user)
        .then((res) => {
          // 透過 api 取得 token 和 expired
          const { token } = res.data;
          const { expired } = res.data;
          // 將 token 和 expired 存到 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(
            expired * 1000,
          )}; path=/`;
          this.$bus.$emit('msg:push', '登入成功', 'success');
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          this.$bus.$emit(
            'msg:push',
            `出現錯誤！${err.response.data.message}`,
            'danger',
          );
        });
    },
  },
};
</script>
