import Pagination from './Pagination'
const compName = Pagination.name

export default {
  install(Vue) {
    Vue.component(compName, Pagination)
  }
}
