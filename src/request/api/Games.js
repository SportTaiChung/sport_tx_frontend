import {post,get} from "../common";

/**
 * 获取左侧菜单遊戲狀態
 * @请求参数
 * {
 *   "lang":       语言        简中:cn,繁中:tw,英文:en,日文:ja,越南文:vi,
 *   "CatID":      球类ID
 *   "WagerGrpID": 投注类型 ID
     "show":       0=显示热门数据,1=显示所有数据 (預設),2=显示单一场所有数据,
     "EvtID":      赛事编号,    show=2时此参数必须带值
     "sdate":      早盘时可带入此参数指定日期 例:2019/9/16
     "LeagueIDs":  过滤联赛编号(谨显示) 示例：1258,9164默认空时显示全部联赛6
     "OddStyleId": 後端記錄用-此功能不使用:0=香港盤 8=歐洲盤(預設值)
 * }
 * @返回数据:
 * {
  "data":[
        {    <-----------------------------------------------------------------------------------------------------層級1 聯賽
            "LeagueID":      联赛编号,
            "LeagueNameStr": 联赛名称,
            "CatID":         球类编号,
            "EvtStatus":     其它状态,待推盘赛事=0,正常推盘赛事=1,今日已开赛=-5,待回收赛事=-99
            "CatNameStr":    球类名称,
            "Team":[    <---------------------------------------------------------------------------------------層級2 隊伍
                {
                    "ScheduleTimeStr":   开赛时间（yyyy-MM-dd HH:mm:ss）,
                    "EvtID":             赛事编号,
                    "HomeTeamStr":       主队名称,
                    "HomeID":            主队编号,
                    "AwayTeamStr":       客队名称,
                    "AwayID":            客队编号,
                    "TimeAct":           球赛进行时间,
                    "HomeScore":         主场当前比分(滾球用),
                    "AwayScore":         客场当前比分(滾球用),
                    "HomeRCard":         主队红牌数,
                    "AwayRCard":         客队红牌数,
                    "HomeYCard":         主队黄牌数,
                    "AwayYCard":         客队黄牌数,
                    "Wager":[    <--------------------------------------------------------------層級3 玩法/類型
                            {
                                "WagerGrpID":   	投注类型ID,
                                "WagerTypeID":      玩法类型ID, 101=让分,102=大小,110=欧盘1x2,107=单场最高分,
                                "GameType":         开盘状态,
                                "WagerGrpNameStr":  投注類型名稱,
                                "WagerTypeNameStr": 玩法類型名稱,
                                "GameTypeNameStr":  遊戲狀態名稱,
                                "Odds":[    <----------------------------------------------------------------------------層級Final 玩法-賠率
                                        {
                                            "GameID":        游戏编号,
                                            "HomeHdp":       主队让球,
                                            "AwayHdp":       客队让球,
                                            "HomeHdpOdds":   主队让球赔率,
                                            "AwayHdpOdds":   客队让球赔率,
                                            "OULine":        大小分的盘口数据,
                                            "OverOdds":      单、大 賠率,
                                            "UnderOdds":     双、小 赔率,
                                            "HomeOdds":      主队赔率,
                                            "AwayOdds":      客队赔率,
                                            "DrewOdds":      和 賠率,
                                            "Status":        投注状态，開盤(可投注狀態)= 1    其它參數為不顯示/不投注   控制状态
                                        },

                                    ]
                            },
                       ]
                }
            ]
        }
           <span v-if="item.WagerGrpID === 10 && item.WagerTypeID === 101">全場讓球</span>
                    <span v-if="item.WagerGrpID === 10 && item.WagerTypeID === 102">全場大小</span>
                    <span v-if="item.WagerGrpID === 10 && item.WagerTypeID === 111">全場獨贏</span>
                    <span v-if="item.WagerGrpID === 11 && item.WagerTypeID === 101">上半讓球</span>
                    <span v-if="item.WagerGrpID === 11 && item.WagerTypeID === 102">上半大小</span>
                    <span v-if="item.WagerGrpID === 11 && item.WagerTypeID === 111">上半獨贏</span>
     ]
}
 */
export const getGameDetail = formData => post("/GameInfo/GameDetail", formData);



/**
 * 获取左侧菜单遊戲狀態
 * @请求参数
 * {
 *   "CatId":         球类编号,
 *   "WagerString":   投注内容,
 *       投注内容组合说明: 以下字段顺序拼接，用 | 分割
 *       {
 *           CatID:  球类编号,
 *           GameID: 游戏编号,
 *           WagerTypeID : 	玩法类型,
 *           WagerGrpID:  投注类型,
 *           WagerPos:   1主 2客 3和 4大 5小 1單 2雙,
 *           HdpPos: 	让球方 1主 2客
 *           Cutline:   盘口
 *           Odds :  赔率
 *           OddsType : 	赔率类型 目前固定為 歐盤 =  DE,
 *       }
 *   "Amount" :       投注金额，
 *   "AcceptBetter" : true:接受更佳赔率 false:不接受更佳赔率
 *   "BetType" :      1=一般投注,99=过关投注
 * }
 * @返回数据:
    {}
}
 */
export const gamePlay = formData => post("/GameInfo/Play", formData);
/**
 * 获取左侧菜单遊戲狀態
 * @请求参数
 * {
 *   traceCodeKey:追踪投注单状态 key 由下注接口获得
 * }
 * @返回数据:
 {}
 }
 */
export const playState = formData => post("/GameInfo/playState", formData);
/**
 * 获取投注盘口详情
 * @请求参数
 * {
 *   GameIDs:游戏编号 ref tblGameDataDetail   示例 Json String=”[1223424,2341223]”
 * }
 * @返回数据:
 {

 }
 }
 */

export const getBetInfo = formData => post("/GameInfo/BetInfo", formData);
/**
 * 获取即时注单历史注单数据
 * @请求参数
 * {
 *   lang:语言
     catid: 不输入则为所有球類注单资料球类表 ID tblCategory
     starttime:查询起始时间不输入则为当天注单资料
     endtime:查询结束时间不输入则为当天注单资料
 *   isset:  false:显示未派彩单(即时注单用)   true:显示已派彩单(历史账务用)
     pagesize:  设定返回笔数預設值600 笔最小值200笔最大值1200笔
 * }
 * @返回数据:
 {

 }
 }
 */
export const getGamelistSmall = formData => post("/GameInfo/GamelistSmall", formData);


export const getbetHistory = formData => post("/GameInfo/Ticket/betHistory", formData);


