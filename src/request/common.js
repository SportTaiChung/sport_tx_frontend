//  处理请求参数和请求方式
import service from "./service";




//post请求
export function post(url,data){
    return service.post(url,data)
}
//get请求
export function get(url,data){
    return service.get(url,data)
}
