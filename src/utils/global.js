// 定义vue 全局方法 建议自定义的全局方法加_ 以示区分
export default {
  install(Vue) {
    // 全局方法1
    Vue.prototype._fn1 = function () {
      // console.log('f1')
    };
    // 全局方法2
    Vue.prototype._fn2 = function () {
      // console.log('fn2');
    };
    // 全局方法3 封装element.ui的$confirm方法
    Vue.prototype._confirm = async function (cue, tip, handleConfirm) {
      // 当第二个参数是回调函数
      if (typeof tip !== "string") {
        handleConfirm = tip;
        tip = "提示";
      }
      let res = '' //try-catch有作用域范围如果 res定义在里面，等下if判断就拿不到res
      try {
        res = await this.$confirm(cue, tip, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
      } catch (error) {
        this.$message.info('已取消')
      }
      if (res === 'confirm') handleConfirm()





    };
  }
};
