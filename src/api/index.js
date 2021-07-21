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
