export function getCurrentAuthority() {
  // 通常是后台返回给我们的
  // 现在为了方便，我们写一个固定的权限
  return ["admin"];
}

export function check(authority) {
  // 进行权限校验；校验通过返回True，否则，返回False
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  // 判断用户是否已经登录
  // 每个公司有自己的登录权限控制
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
