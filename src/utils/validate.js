 /* eslint-disable */ 
let emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
// 6<=password <=20包含数字字母
let passwordReg = /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,20}$/;

class Validate {
  checkEmail(rule, value, callback) {
    setTimeout(() => {
      if (!value) return callback(new Error("邮箱不能为空"));
      // if (!value) return Message.error('邮箱不能为空')
      if (!emailReg.test(value)) {
        return callback(new Error("邮箱不合法"));
      }
      callback();
    }, 100);
  }
  checkPassword(rule, value, callback) {
    setTimeout(() => {
      if (!value) return callback(new Error("密码不能为空"));
      if (!passwordReg.test(value)) {
        return callback(new Error("密码必须包含数字和字母且长度在6-20之间"));
      }
      callback();
    }, 100);
  }
}


export default new Validate()
export {emailReg}


