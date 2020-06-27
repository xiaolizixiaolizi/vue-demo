<template>
  <div class="login-register">
    <div class="login-register-wrap">
      <ul class="login-register-top">
        <li
          v-for="(item, index) in txt"
          :key="index"
          :style="[
            { background: index == isActive ? '#2f4255' : '' },
            { color: index == isActive ? '#25E9B4' : '' }
          ]"
          @click="sendIndex(index)"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginIndex",
  data() {
    return {
      txt: ["登录", "注册"],
      isActive: 0
    };
  },
  methods: {
    sendIndex(index) {
      this.isActive = index;
      let obj = { 0: "login", 1: "register" };
      this.$router.push({ name: obj[index] });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-register {
  height: 100vh;
  background: #344a5f;
  color: #fff;
  .login-register-wrap {
    width: 330px;
    height: 400px;
    margin: 0 auto;
    padding-top: 50px;
    .login-register-top {
      display: flex;
      flex-flow: row, nowrap;
      justify-content: center;
      margin-bottom: 35px;
      li {
        width: 100px;
        line-height: 35px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
