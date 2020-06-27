<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRule" label-width="0px">
      <el-form-item prop="email">
        <p>邮箱</p>
        <el-input v-model="loginForm.email" type="email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <p>密码</p>
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <p>验证码</p>
        <el-row type="flex" justify="space-between">
          <el-col :span="15">
            <el-input v-model="loginForm.code"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="success" @click="getYzm('loginForm')">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="isActive"
          type="danger"
          @click="submitForm('loginForm')"
          id="login-btn"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import validate, { emailReg } from "@/utils/validate.js";

import { getSms, login } from "@/network/api.js";
import { mapMutations } from "vuex";
export default {
  name: "component_name",
  data() {
    return {
      isActive: true,
      loginForm: {
        email: "",
        password: "",
        code: ""
      },
      loginRule: {
        email: [{ validator: validate.checkEmail, trigger: "blur" }],
        password: [{ validator: validate.checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations({
      saveIdentity: "saveIdentity"
    }),
    async getYzm(formName) {
      let email = this[formName].email;
      if (!email || !emailReg.test(email)) {
        this.$message.error("邮箱不能为空或者格式错误");
        return false;
      }
      let data = { username: email, module: "login" };
      const response = await getSms(data);
      this.handleSms(response);

      // getSms(data)
      //   .then(data => this.handleSms(data))
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    handleSms(data) {
      let str = data.message;
      this.loginForm.code = str.substring(str.length - 6);
    },

    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          this.$message.error("error");
          return false;
        }
        this.$set(this.loginForm, "username", this.loginForm.email);
        try {
          const data=await login(this.loginForm)
          this.handleLogin(data)
        } catch (error) {
          console.log('error: ', error.message);
          
        }

      });
    },
    handleLogin(data) {
      const _this = this;
      this.saveIdentity({
        username: data.data.username,
        token: data.data.token
      });
      this.$message({
        type: "success",
        message: data.message,
        onClose() {
          _this.$router.push({ name: "console" });
        }
      });
    }
  },
  watch: {
    "loginForm.code": {
      handler(newval) {
        if (newval.length == 6) {
          this.isActive = false;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#login-btn {
  display: block;
  width: 100%;
  // background: #fab6b6;
  border: none;
  font-size: 18px;
}
</style>
