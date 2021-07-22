import request from "@/utils/request";

/**
 * 登录
 */
export function login(data) {
  return request({
    url: "/admin/sys_users/login",
    method: "post",
    data,
  });
}

/**
 * 获取登录人信息
 */
export function getUserInfo() {
  return request({
    url: "/admin/sys_users/info",
    method: "get",
  });
}

/**
 * 获取活动讲座分页
 */
export function getLecturePage(params) {
  return request({
    url: "/admin/lectures",
    method: "get",
    params,
  });
}

/**
 * 获取活动讲座详情
 */
export function getLecture(id) {
  return request({
    url: "/admin/lectures/" + id,
    method: "get",
  });
}

/**
 * 添加活动讲座
 */
export function addLecture(data) {
  return request({
    url: "/admin/lectures",
    method: "post",
    data,
  });
}

/**
 * 修改活动讲座
 */
export function modifyLecture(id, data) {
  return request({
    url: "/admin/lectures/" + id,
    method: "put",
    data,
  });
}

/**
 * 删除活动讲座
 */
export function removeLecture(id) {
  return request({
    url: "/admin/lectures/" + id,
    method: "delete",
  });
}
