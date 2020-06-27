<template>
  <el-card class="box-card" :body-style="cardStyle">
    <el-row>
      <el-col :span="20">
        <i
          :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="handleIconClick"
        ></i>
      </el-col>
      <el-col :span="3">
        <div>
          <p>{{ username }}</p>
        </div>
      </el-col>
      <el-col :span="1" class="heander-right">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-switch-button el-dropdown-link"></i>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="aboutme">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CompConsoleHead",
  props: {
    isFold: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      cardStyle: {
        padding: "0 0 0 20px ",
        height: "60px",
        "line-height": "60px"
      }
    };
  },
  computed: {
    ...mapState({
      username: "username"
    })
  },
  methods: {
    ...mapMutations({
      deleteIdentity: "deleteIdentity"
    }),

    handleIconClick() {
      this.$emit("update:isFold", !this.isFold);
    },
    handleCommand(command) {
      if (command === "aboutme") {
      } else if (command === "logout") {
        this.logout();
      }
    },
    logout() {
      this._confirm("您确定要退出吗, 是否继续?", this.handleConfirm);
    },
    handleConfirm() {
      let _this = this;
      this.deleteIdentity();
      this.$message({
        type: "success",
        message: "退出成功，3秒后进入登录页面",
        onClose() {
          _this.$router.push({ name: "login" });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  i {
    font-size: 18px;
    color: #41b883;
  }
  .heander-right {
    border-left: 1px solid #ccc;
    .el-dropdown {
      margin-left: 12px;
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
    }
  }
}
</style>
