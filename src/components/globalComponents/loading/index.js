import LoadingComp from "./Loaiding";
const compName = LoadingComp.name; //获取组件的名字 当做全局组件名字使用

const loading = {
  install(Vue) {
    Vue.component(compName, LoadingComp);
  }
};
export default loading;
