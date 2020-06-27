import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./styles/normalize.css";

// 导入全局自定义组件
// import SvgIcon from './components/globalComponents/svgicon'
// Vue.use(SvgIcon)

import Icon from "vue2-svg-icon/Icon.vue";
Vue.component("icon", Icon);
import Pagination from './components/globalComponents/pagination'
Vue.use(Pagination)


// 定义全局方法
import global from "./utils/global";
Vue.use(global);
Vue.config.productionTip = false;

// 定义全局过滤器
import MyFilter from './utils/filter'

for (let key in MyFilter) {
  Vue.filter(key, MyFilter[key])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
