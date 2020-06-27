import { post } from "./request";

export function getSms(params) {
  return post("/getSms/", params);
}
export function register(params) {

  return post("/register/", params);
}

export function login(params) {
  return post("/login/", params);
}

export function getNewsList(params) {
  return post("/news/getList/", params);
}
// /news/getCategoryAll/ （有子级分类）获取所有分类
export function getCategoryAll(params = {}) {
  return post("/news/getCategoryAll/", params);
}
// /news/getCategory/ （无子级分类）
export function getCategory(params = {}) {
  return post("/news/getCategory/", params);
}

// /news/addFirstCategory/ 添加一级分类
export function addFirstCategory(params) {
  return post("/news/addFirstCategory/", params);
}
//信息分类添加子级 添加二级分类 /news/addChildrenCategory/
export function addChildrenCategory(params) {
  return post("/news/addChildrenCategory/", params);
}
//	/news/deleteCategory/ 删除信息接口
export function deleteCategory(params) {
  return post('	/news/deleteCategory/', params)
}

// /news/add/ 添加信息
export function newAdd(params) {
  return post('/news/add/', params)
}
// 	/news/deleteInfo/ 删除信息
export function deleteNews(params) {
  return post('/news/deleteInfo/', params)

}
