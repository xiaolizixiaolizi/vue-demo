import SvgIcon from "./SvgIcon";

const svgIcon = {
  install(Vue) {
    Vue.component("SvgIcon", SvgIcon);
  }
};
export default svgIcon;

// 解析svg格式文件代码
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
