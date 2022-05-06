
//获取登入token
export function getToken() {
  let token = sessionStorage.getItem('SSStoken')
  return token
}
//获取登入账户名
export function getMbid() {
  let id = sessionStorage.getItem('mbID')
  return id
}
//保存、更新登入token,账号
export function setToken(token,mbID) {
  return sessionStorage.setItem("SSStoken", token),
         sessionStorage.setItem("mbID", mbID);
}
//删除登入token,账号
export function removeToken() {
  return sessionStorage.clear()
}
