import fa from "element-ui/src/locale/lang/fa";

export default {
  namespaced: true,
  state: {
    tabchange: 0,
    gameState: 1,
    betdata: [], //当前下注订单列表
    CadID: sessionStorage.getItem("CadID") || 1, //当前球类id
    Historydata: [],
    HistorySettled: [],
    WagerTypeKey: 1,
  },
  getters: {
    getCadID: (state) => {
      return state.CadID;
    },
    getKey: (state) => {
      return state.WagerTypeKey;
    },
    getthistab: (state) => {
      return state.tabchange;
    },
    getgameState: (state) => {
      return state.gameState;
    },
    getHistorydata: (state) => {
      state.Historydata.forEach((item) => {
        item.active = false;
        if (item.BetType === 1) {
          if (item.dataBet[0].WagerPosName === "主隊") {
            item.dataBet[0].betname = item.dataBet[0].HomeTeam;
          } else if (item.dataBet[0].WagerPosName === "客隊") {
            item.dataBet[0].betname = item.dataBet[0].AwayTeam;
          } else {
            item.dataBet[0].betname = item.dataBet[0].WagerPosName;
          }
        } else {
          item.dataBet.forEach((Betlist, y) => {
            if (Betlist.WagerPosName === "主隊") {
              Betlist.betname = Betlist.HomeTeam;
            } else if (Betlist.WagerPosName === "客隊") {
              Betlist.betname = Betlist.AwayTeam;
            } else {
              Betlist.betname = item.dataBet[y].WagerPosName;
            }
          });
        }
      });
      return state.Historydata;
    },
    getHistorySettled: (state) => {
      return state.HistorySettled;
    },
    getBetdata: (state) => {
      let e = state.betdata;
      var betamount = 0,
        winable = 0,
        stray = 1;
      for (var i = 0; i < e.length; i++) {
        betamount += Number(e[i].Amount);

        e[i].BetMax = 100000;
        e[i].BetMin = 10;
        if (e[i].WagerTypeID === 101 || e[i].WagerTypeID === 103) {
          if (e[i].type === 0) {
            if (e[i].Odds.HomeHdp === "0" || e[i].Odds.AwayHdp === "0") {
              e[i].Cutline = 0;
            } else {
              if (e[i].CatID === 4) {
                e[i].Cutline =
                  e[i].Odds.HomeHdp === ""
                    ? e[i].Odds.AwayHdp
                    : e[i].Odds.HomeHdp;
              } else {
                e[i].Cutline =
                  e[i].Odds.HomeHdp === ""
                    ? "+" + e[i].Odds.AwayHdp
                    : "-" + e[i].Odds.HomeHdp;
              }
            }
            e[i].bet_title = e[i].HomeTeamStr;
            e[i].OddsValue = e[i].Odds.HomeHdpOdds;
            winable += Math.floor(e[i].Amount * e[i].Odds.HomeHdpOdds);
            stray *= Number(e[i].Odds.HomeHdpOdds) + 1;
          } else if (state.betdata[i].type === 1) {
            if (e[i].Odds.HomeHdp === "0" || e[i].Odds.AwayHdp === "0") {
              e[i].Cutline = 0;
            } else {
              if (e[i].CatID === 4) {
                e[i].Cutline =
                  e[i].Odds.AwayHdp === ""
                    ? e[i].Odds.HomeHdp
                    : e[i].Odds.AwayHdp;
              } else {
                e[i].Cutline =
                  e[i].Odds.AwayHdp === ""
                    ? "+" + e[i].Odds.HomeHdp
                    : "-" + e[i].Odds.AwayHdp;
              }
            }
            e[i].bet_title = e[i].AwayTeamStr;
            e[i].OddsValue = e[i].Odds.AwayHdpOdds;
            winable += Math.floor(e[i].Amount * e[i].Odds.AwayHdpOdds);
            stray *= Number(e[i].Odds.AwayHdpOdds) + 1;
          } else {
          }
        }
        if (
          e[i].WagerTypeID === 102 ||
          e[i].WagerTypeID === 104 ||
          e[i].WagerTypeID === 109
        ) {
          if (e[i].type === 0) {
            e[i].bet_title = "大";
            e[i].Cutline = e[i].Odds.OULine;
            e[i].OddsValue = e[i].Odds.OverOdds;
            winable += Math.floor(e[i].Amount * e[i].Odds.OverOdds);
            stray *= Number(e[i].Odds.OverOdds) + 1;
          } else if (state.betdata[i].type === 1) {
            e[i].bet_title = "小";
            e[i].Cutline = e[i].Odds.OULine;
            e[i].OddsValue = e[i].Odds.UnderOdds;
            winable += Math.floor(e[i].Amount * e[i].Odds.UnderOdds);
            stray *= Number(e[i].Odds.UnderOdds) + 1;
          }
        }
        if (e[i].WagerTypeID === 111 || e[i].WagerTypeID === 110) {
          if (e[i].type === 0) {
            e[i].bet_title = e[i].HomeTeamStr;
            e[i].Cutline = "PK";
            e[i].OddsValue = e[i].Odds.HomeOdds;
            winable += Math.floor(e[i].Amount * e[i].Odds.HomeOdds);
            stray *= Number(e[i].Odds.HomeOdds) + 1;
          } else if (state.betdata[i].type === 1) {
            e[i].bet_title = e[i].AwayTeamStr + "PK";
            e[i].Cutline = "PK";
            e[i].OddsValue = e[i].Odds.AwayOdds;
            winable += Math.floor(e[i].Amount * e[i].Odds.AwayOdds);
            stray *= Number(e[i].Odds.AwayOdds) + 1;
          } else {
            e[i].bet_title = "和局";
            e[i].Cutline = "";
            e[i].OddsValue = e[i].Odds.DrewOdds;
            winable += Math.floor(e[i].Amount * e[i].Odds.DrewOdds);
            stray *= Number(e[i].Odds.DrewOdds) + 1;
          }
        }

        var ids = e.map((value) => value.EvtID);
        ids.splice(i, 1);
        if (ids.indexOf(e[i].EvtID) > -1) {
          e[i].isrepeat = true;
        } else {
          e[i].isrepeat = false;
        }
      }
      if (e.length > 0) {
        e[0].betamount = betamount;
        e[0].winable = winable === 0 ? "" : winable;
        e[0].stray = Math.floor(stray * 100) / 100;
      }
      return e;
    },
    getBestHead: (state) => {
      return state.BestHead;
    },
    getBestList: (state) => {
      return state.BestList;
    },
    WagerString: (state) => {
      return state.WagerString;
    },
  },
  mutations: {
    ADD_BERDATA(state, data) {
      if (state.betdata.length <= 0) {
        state.betdata.push(data);
        return;
      }
      for (var i = 0; i < state.betdata.length; i++) {
        if (state.betdata[i].Odds.GameID === data.Odds.GameID) {
          state.betdata.splice(i, 1, data);
          return;
        }
      }
      state.betdata.push(data);
    },
    DELETED_BERDATA(state, i) {
      if (i === "all") {
        state.betdata = [];
      } else {
        state.betdata.splice(i, 1);
      }
    },

    SET_CADID(state, val) {
      state.CadID = val ? val : 1;
    },
    SET_TABLEDATA(state, data) {
      state.BestHead = data.BestHead;
      state.BestList = data.List;
    },
    SET_HISTORY(state, data) {
      state.Historydata = data;
    },
    SET_HISTORYSETTLED(state, data) {
      state.HistorySettled = data;
    },
    SET_GAMESTATE(state, data) {
      state.gameState = data;
    },
    SET_TAB(state, data) {
      state.tabchange = data;
    },
    SET_KEY(state, data) {
      state.WagerTypeKey = data;
    },
  },
  actions: {},
};
