import MySelect from "./MySelect";
const compName = MySelect.name; //获取组件的名字 当做全局组件名字使用

const mySelect = {
  install(Vue) {
    Vue.component(compName, MySelect);
  }
};
export default mySelect;
