<template>
  <el-container class="consele-container">
    <el-aside :width="isFold ? '40px' : '180px'">
      <comp-console-aside></comp-console-aside>
    </el-aside>
    <el-container>
      <el-header height="70px">
        <comp-console-head :is-fold.sync="isFold"></comp-console-head>
      </el-header>

      <el-main>
        <el-card class="box-card" :body-style="bodyStyle">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CompConsoleAside from "@/components/console/CompConsoleAside";
import CompConsoleHead from "@/components/console/CompConsoleHead";
export default {
  name: "ConseleIndex",
  components: {
    CompConsoleAside,
    CompConsoleHead
  },
  data() {
    return {
      isFold: false, //是否折叠默认是不折叠 打开状态
      bodyStyle: {
        "box-shadow": "0 2px 8px 0 rgba(0, 0, 0, 0.1)"
      }
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.consele-container {
  height: 100vh;
  .el-aside {
    background: $consoleAsideBgColor;
  }
  .el-header {
    padding: 0;
  }
}
</style>
