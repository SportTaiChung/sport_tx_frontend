import {post,get} from "../common";

/**
 * 获取左侧菜单遊戲狀態
 * @请求参数
 * {
 *   "lang":  语言   简中:cn,繁中:tw,英文:en,日文:ja,越南文:vi,
 * }
 * @返回数据:{

*   "data":[
*          {
*             "key":状态key,
*             "value": 状态名
*          },
*    ]
*/
export const getMenuGameType = formData => post("/GameInfo/MenuGameType", formData);


/**
 * 获取左侧菜单球种(含赛事数量)
 * @请求参数:
 * {
 *   "lang" :    语言           简中:cn,繁中:tw,英文:en,日文:ja,越南文:vi,
 *   "gtype":  	 开盘状态        0=早盘   1=今天   2=滚球,
     "pID"  :    下一层级条件    最大值两层,上一层catid，不输入则为初始第一层
 * }
 * @返回数据
 *
 *  "data":{
 *           "item"":[
 *             {
 *             "count:     球类开盘赛事数,
 *             "catName":  球类名称,
 *             "catid":    球类编号,
 *             "pID":      上一层catid  (0=不存在),
 *             "wID": 	   投注类型 ID  (0=不存在),
 *             "Sort":     排序数
 *             }
 *         ],
 *         "total": 开盘赛事总数
 *     }
 */

export const getMenu = formData => post("/GameInfo/Menu", formData);