// 定义全局过滤器
import moment from "moment";

const vFilter = {
  //    2019-09-18T13:48:56.133Z String类型和date时间Object类型都可以 转为2018-11-16 10:55:58
  //使用:   <span>{{ parseInt(scope.row.createDate)*1000|dataFormat}}</span>
  dataFormat(timestamp, pattern = "YYYY-MM-DD") {

    return moment(timestamp).format(pattern);
  },

};
export default vFilter;



