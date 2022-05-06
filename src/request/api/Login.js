import {post,get} from "../common";

/**
 * 登入接口
 * @请求参数:{
 *   "mbID":    "用户账号",
 *   "pw":      "用户密码，错误5次以上账户封锁",
 *   "verCode": 登入验证码,
 *   "siteid":  站台编号,
 *   "udomain": 主域名
 * }
 * @返回数据:{
 *   "code": 200,
 *   "data":{
 *       "loginID": 登入token,
 *       "mb":{
 *             Currency:  会员类别,
 *             dtype:     账户类型,
 *             Name:      会员昵称,
 *             RealName:  真实姓名,
 *             email:     会员邮箱,
 *             level:     阶层id,
 *             mbID:      会员账号id,
 *             phone:     手机号,
 *             pwExpire:  密码是否过期 true=过期需变更密码,
 *             siteid:    网站代号:每个客户以大总监为区分,
 *             vipLV:     会员等级 0 - 9,
 *           }
 * }
 */
export const login = formData => post("/mb/sin/login", formData);

