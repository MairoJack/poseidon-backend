import request from "@/utils/request";

/**
 * 登录
 */
export function login(data) {
  return request({
    url: "/api/users/login",
    method: "post",
    data,
  });
}

/**
 * 获取登录人信息
 */
export function getUserInfo() {
  return request({
    url: "/api/users/info",
    method: "get",
  });
}

/**
 * 获取活动讲座分页
 */
export function getLecturePage(param) {
  return request({
    url: "/api/lectures",
    method: "get",
    param
  });
}

/**
 * 获取活动讲座详情
 */
export function getLecture(id) {
  return request({
    url: "/api/lectures/" + id,
    method: "get",
  });
}

/**
 * 添加活动讲座
 */
export function addLecture(data) {
  return request({
    url: "/api/lectures",
    method: "post",
    data
  });
}

/**
 * 修改活动讲座
 */
export function modifyLecture(data) {
  return request({
    url: "/api/lectures/" + data.id,
    method: "post",
    data
  });
}