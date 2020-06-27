<template>
  <div>
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRule"
      label-width="0px"
    >
      <el-form-item prop="email">
        <p>邮箱</p>
        <el-input v-model="registerForm.email" type="email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <p>密码</p>
        <el-input v-model="registerForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <p>重复密码</p>
        <el-input v-model="registerForm.password2" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="yanzhengma">
        <p>验证码</p>
        <el-row type="flex" justify="space-between">
          <el-col :span="15">
            <el-input v-model="registerForm.code"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="success" @click="getYzm">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          @click="submitForm('registerForm')"
          id="register-btn"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import validate,{ emailReg } from "@/utils/validate.js";
import { getSms, register } from "@/network/api.js";
export default {
  name: "RegisterForm",
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        email: "",
        password: "",
        password2: "",
        code: ""
      },
      registerRule: {
        email: [{ validator: validate.checkEmail, trigger: "blur" }],
        password: [{ validator: validate.checkPassword, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    getYzm() {
      let email = this.registerForm.email;
      if (!email || !emailReg.test(email)) {
        this.$message.error("邮箱不能为空或者格式错误");
        return false;
      }
      let data = { username: email, module: "register" };
      getSms(data)
        .then(data => this.handleSms(data))
        .catch(err => {
          console.log(err);
        });
    },

    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message.error("error");
          return false;
        }
        this.$set(this.registerForm, "username", this.registerForm.email);
        console.log(this.registerForm);
        register(this.registerForm)
          .then(data => {
            this.$message({
              type: "success",
              message: data.message,
              onClose() {
                _this.$router.push({ name: "login" });
              }
            });
          })
          .catch(e => {
            console.log(e);
          });

        //         username: '1111111@qq.com',
        // password: '5454544',
        // code: '11111'
      });
    },
    handleSms(data) {
      let str = data.message;
      this.registerForm.code = str.substring(str.length - 6);
    }
  }
};
</script>
<style lang="scss" scoped>
#register-btn {
  display: block;
  width: 100%;
  border: none;
  font-size: 18px;
}
</style>
