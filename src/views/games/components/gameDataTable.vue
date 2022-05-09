<template>
  <div>
    <div class="table_head">
      <ul>
        <li class="table_head_type">
          <div>
            <i class="el-icon-arrow-up"></i>
            <span>{{ getCadID | getball }}</span>
          </div>
        </li>
        <li v-for="(item, i) in BestHead" :key="i" class="table_head_playtype">
          <span>{{
            item | bestheadfilte(item.WagerTypeID, item.WagerGrpID)
          }}</span>
        </li>
      </ul>
    </div>
    <div class="table_main">
      <el-collapse v-model="activeName" class="include" @change="handleChange">
        <el-collapse-item
          v-for="(item, i) in List"
          :key="i"
          :name="i"
          class="table_team_list"
        >
          <template slot="title">
            <i class="el-icon-arrow-up"></i>
            {{ item.LeagueNameStr }}
          </template>
          <table width="100%">
            <!-- 队伍层-->
            <tr
              v-for="(item_team, y) in item.Team"
              v-show="item_team.EvtStatus === 1"
              :key="y"
              class="list_table_tr"
            >
              <td class="list_table_td_1">
                <ul>
                  <li>
                    <span>{{ item_team.ScheduleTimeStr | time_md }}</span>
                    <span>{{ item_team.ScheduleTimeStr | time_hm }}</span>
                  </li>
                  <li v-if="item.CatID !== 4">
                    <div>{{ item_team.HomeTeamStr }}</div>
                    <div>{{ item_team.AwayTeamStr }}</div>
                    <div v-if="item_team.isDrewOdds">和局</div>
                  </li>
                  <li v-else>
                    <div>{{ item_team.AwayTeamStr }}</div>
                    <div>{{ item_team.HomeTeamStr }}</div>
                    <div v-if="item_team.isDrewOdds">和局</div>
                  </li>
                  <li><i class="el-icon-s-flag"></i></li>
                </ul>
              </td>
              <td
                v-for="(item_team_Wager, e) in filterdata(item_team.Wager)"
                :key="e"
                class="odds_td"
              >
                <ul
                  v-if="
                    item_team_Wager.notdata ||
                      item_team_Wager.Odds[0].Status !== 1
                  "
                >
                  <li></li>
                  <li></li>
                  <li v-if="item_team.isDrewOdds"></li>
                </ul>
                <ul
                  v-else-if="
                    item_team_Wager.WagerTypeID === 101 ||
                      item_team_Wager.WagerTypeID === 103
                  "
                  class="odds_td_ul"
                >
                  <li
                    class="havedata"
                    @click="
                      gobet({
                        type: item.CatID !== 4 ? 0 : 1,
                        CatID: item.CatID,
                        EvtID: item_team.EvtID,
                        WagerTypeID: item_team_Wager.WagerTypeID,
                        WagerGrpID: item_team_Wager.WagerGrpID,
                        WagerPos: 1,
                        Odds: item_team_Wager.Odds[0],
                        LeagueNameStr: item.LeagueNameStr,
                        HomeTeamStr: item_team.HomeTeamStr,
                        AwayTeamStr: item_team.AwayTeamStr,
                        active: item_team_Wager.active,
                      })
                    "
                  >
                    <div v-if="item.CatID !== 4">
                      <span>{{ item_team_Wager.Odds[0].HomeHdp }}</span>
                      <span>{{ item_team_Wager.Odds[0].HomeHdpOdds }}</span>
                    </div>
                    <div v-else>
                      <span>{{ item_team_Wager.Odds[0].AwayHdp }}</span>
                      <span>{{ item_team_Wager.Odds[0].AwayHdpOdds }}</span>
                    </div>
                  </li>
                  <li
                    class="havedata"
                    @click="
                      gobet({
                        type: item.CatID !== 4 ? 1 : 0,
                        CatID: item.CatID,
                        WagerTypeID: item_team_Wager.WagerTypeID,
                        WagerGrpID: item_team_Wager.WagerGrpID,
                        WagerPos: 2,
                        Odds: item_team_Wager.Odds[0],
                        LeagueNameStr: item.LeagueNameStr,
                        HomeTeamStr: item_team.HomeTeamStr,
                        AwayTeamStr: item_team.AwayTeamStr,
                        EvtID: item_team.EvtID,
                        active: !item_team_Wager.active,
                      })
                    "
                  >
                    <div v-if="item.CatID !== 4">
                      <span>{{ item_team_Wager.Odds[0].AwayHdp }}</span>
                      <span>{{ item_team_Wager.Odds[0].AwayHdpOdds }}</span>
                    </div>
                    <div v-else>
                      <span>{{ item_team_Wager.Odds[0].HomeHdp }}</span>
                      <span>{{ item_team_Wager.Odds[0].HomeHdpOdds }}</span>
                    </div>
                  </li>
                  <li v-if="item_team.isDrewOdds"></li>
                </ul>
                <ul
                  v-else-if="
                    item_team_Wager.WagerTypeID === 102 ||
                      item_team_Wager.WagerTypeID === 104 ||
                      item_team_Wager.WagerTypeID === 109
                  "
                  class="odds_td_ul"
                >
                  <li
                    class="havedata"
                    @click="
                      gobet({
                        type: item.CatID !== 4 ? 0 : 1,
                        WagerPos: 4,
                        CatID: item.CatID,
                        WagerTypeID: item_team_Wager.WagerTypeID,
                        WagerGrpID: item_team_Wager.WagerGrpID,
                        Odds: item_team_Wager.Odds[0],
                        LeagueNameStr: item.LeagueNameStr,
                        HomeTeamStr: item_team.HomeTeamStr,
                        AwayTeamStr: item_team.AwayTeamStr,
                        active: !item_team_Wager.active,
                        EvtID: item_team.EvtID,
                      })
                    "
                  >
                    <div>
                      <span>{{ item_team_Wager.Odds[0].OULine }}</span>
                      <span>{{ item_team_Wager.Odds[0].OverOdds }}</span>
                    </div>
                  </li>
                  <li
                    class="havedata"
                    @click="
                      gobet({
                        type: item.CatID !== 4 ? 1 : 0,
                        WagerPos: 5,
                        CatID: item.CatID,
                        WagerTypeID: item_team_Wager.WagerTypeID,
                        WagerGrpID: item_team_Wager.WagerGrpID,
                        Odds: item_team_Wager.Odds[0],
                        LeagueNameStr: item.LeagueNameStr,
                        HomeTeamStr: item_team.HomeTeamStr,
                        AwayTeamStr: item_team.AwayTeamStr,
                        active: !item_team_Wager.active,
                        EvtID: item_team.EvtID,
                      })
                    "
                  >
                    <div>
                      <span>小</span>
                      <span>{{ item_team_Wager.Odds[0].UnderOdds }}</span>
                    </div>
                  </li>
                  <li v-if="item_team.isDrewOdds"></li>
                </ul>
                <ul
                  v-else-if="
                    item_team_Wager.WagerTypeID === 111 ||
                      item_team_Wager.WagerTypeID === 110
                  "
                  class="odds_td_ul"
                >
                  <li
                    class="havedata"
                    @click="
                      gobet({
                        type: item.CatID !== 4 ? 0 : 1,
                        CatID: item.CatID,
                        WagerTypeID: item_team_Wager.WagerTypeID,
                        WagerGrpID: item_team_Wager.WagerGrpID,
                        WagerPos: 1,
                        Odds: item_team_Wager.Odds[0],
                        LeagueNameStr: item.LeagueNameStr,
                        HomeTeamStr: item_team.HomeTeamStr,
                        AwayTeamStr: item_team.AwayTeamStr,
                        active: !item_team_Wager.active,
                        EvtID: item_team.EvtID,
                      })
                    "
                  >
                    <span v-if="item.CatID !== 4" class="odds_center">{{
                      item_team_Wager.Odds[0].HomeOdds
                    }}</span>
                    <span v-else class="odds_center">{{
                      item_team_Wager.Odds[0].AwayOdds
                    }}</span>
                  </li>
                  <li
                    class="havedata"
                    @click="
                      gobet({
                        type: item.CatID !== 4 ? 1 : 0,
                        CatID: item.CatID,
                        WagerTypeID: item_team_Wager.WagerTypeID,
                        WagerGrpID: item_team_Wager.WagerGrpID,
                        WagerPos: 2,
                        Odds: item_team_Wager.Odds[0],
                        LeagueNameStr: item.LeagueNameStr,
                        HomeTeamStr: item_team.HomeTeamStr,
                        AwayTeamStr: item_team.AwayTeamStr,
                        active: !item_team_Wager.active,
                        EvtID: item_team.EvtID,
                      })
                    "
                  >
                    <span v-if="item.CatID !== 4" class="odds_center">{{
                      item_team_Wager.Odds[0].AwayOdds
                    }}</span>
                    <span v-else class="odds_center">{{
                      item_team_Wager.Odds[0].HomeOdds
                    }}</span>
                  </li>
                  <li
                    v-if="item_team.isDrewOdds"
                    :class="
                      item_team_Wager.Odds[0].DrewOdds === 0 ? '' : 'havedata'
                    "
                    @click="
                      gobet({
                        type: 2,
                        CatID: item.CatID,
                        WagerTypeID: item_team_Wager.WagerTypeID,
                        WagerGrpID: item_team_Wager.WagerGrpID,
                        WagerPos: 3,
                        Odds: item_team_Wager.Odds[0],
                        LeagueNameStr: item.LeagueNameStr,
                        HomeTeamStr: item_team.HomeTeamStr,
                        AwayTeamStr: item_team.AwayTeamStr,
                        active: !item_team_Wager.active,
                        EvtID: item_team.EvtID,
                      })
                    "
                  >
                    {{
                      item_team_Wager.Odds[0].DrewOdds === 0
                        ? ""
                        : item_team_Wager.Odds[0].DrewOdds
                    }}
                  </li>
                </ul>
              </td>
            </tr>
          </table>
        </el-collapse-item>
      </el-collapse>
      <div v-show="List.length <= 0" class="notdata">
        <div>
          <img
            alt=""
            src="https://dcd.nbb21n.net/images/bb/white/icon_noGame.svg"
          />
          <p>暫無賽事</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGameDetail, getGamelistSmall } from "@/request/api/Games";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "gameDataTable",
  data() {
    return {
      activeName: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      BestHead: [],
      List: [],
      updataInterval: "",
    };
  },
  filters: {
    time_md(val) {
      var time = val.split(" ")[0];
      var timeYMD = time
        .replace(" ", ":")
        .replace(/\:/g, "/")
        .split("/");
      return timeYMD[1] + "-" + timeYMD[2];
    },
    time_hm(val) {
      var time = val.split(" ")[1];
      var timeHM = time
        .replace(" ", ":")
        .replace(/\:/g, "/")
        .split("/");
      return timeHM[0] + ":" + timeHM[1];
    },
  },

  methods: {
    ...mapMutations("games", [
      "ADD_BERDATA",
      "SET_TABLEDATA",
      "SET_CADID",
      "SET_TAB",
      "SET_KEY",
    ]),
    gobet(data) {
      this.SET_TAB(0);
      const {
        type,
        CatID,
        WagerTypeID,
        WagerGrpID,
        WagerPos,
        Odds,
        LeagueNameStr,
        HomeTeamStr,
        AwayTeamStr,
        active,
        EvtID,
      } = data;
      var Hdp = "";
      var ds = "";
      if (WagerTypeID === 101 || WagerTypeID === 103) {
        Hdp = Odds.HomeHdp !== "" ? Odds.HomeHdp : Odds.AwayHdp;
        ds =
          type === 0
            ? Odds.HomeHdpOdds
            : type === 1
            ? Odds.AwayHdpOdds
            : Odds.DrewOdds;
      } else if (
        WagerTypeID === 102 ||
        WagerTypeID === 104 ||
        WagerTypeID === 109
      ) {
        Hdp = Odds.OULine;
        ds = type === 0 ? Odds.OverOdds : Odds.UnderOdds;
      } else {
        Hdp = 0;
        if (type === 0) {
          ds = Odds.HomeOdds;
        } else if (type === 1) {
          ds = Odds.AwayOdds;
        } else {
          ds = Odds.DrewOdds;
        }
      }
      var WagerString =
        CatID +
        "," +
        Odds.GameID +
        "," +
        WagerTypeID +
        "," +
        WagerGrpID +
        "," +
        WagerPos +
        "," +
        Odds.HdpPos +
        "," +
        Hdp +
        "," +
        ds +
        "," +
        "DE";

      var betinfo_list = {
        CatID: CatID,
        LeagueNameStr: LeagueNameStr,
        HomeTeamStr: HomeTeamStr,
        AwayTeamStr: AwayTeamStr,
        WagerString: WagerString,
        type: type,
        Odds: Odds,
        WagerTypeID: WagerTypeID,
        WagerGrpID: WagerGrpID,
        EvtID: EvtID,
        Amount: "",
      };
      this.ADD_BERDATA(betinfo_list);
    },
    handleChange() {},
    //数据按照besthead排序
    filterdata(list) {
      var arrlength = this.BestHead.length;
      var data = new Array(arrlength);
      for (var i = 0; i < this.BestHead.length; i++) {
        for (var y = 0; y < list.length; y++) {
          if (
            this.BestHead[i].WagerGrpID === list[y].WagerGrpID &&
            this.BestHead[i].WagerTypeID.indexOf(list[y].WagerTypeID) > -1
          ) {
            data[i] = list[y];
          }
        }
      }
      for (var i = 0; i < data.length; i++) {
        if (data[i] == undefined) {
          data[i] = { notdata: true };
        }
      }
      return data;
    },
    getGameDetail(key) {
      getGameDetail({
        lang: "cn",
        CatID: this.getCadID,
        GameType: this.getgameState,
        WagerTypeKey: key,
      }).then((res) => {
        res.data.List.forEach((item, i) => {
          item.Team.forEach((item_Team, t) => {
            // if(item_Team.Row>1){
            //     for (var y = 0;y < item_Team.Row;y++){
            //         item.Team.splice(t,0,item_Team)
            //     }
            // }
            var DrewOdds = [];
            item_Team.Wager.forEach((item_Team_Wager) => {
              DrewOdds.push(item_Team_Wager.Odds[0].DrewOdds);
            });
            if (DrewOdds.every((key) => key == 0)) {
              item_Team.isDrewOdds = false;
            } else {
              item_Team.isDrewOdds = true;
            }
          });
        });
        this.BestHead = res.data.BestHead;
        this.List = res.data.List;
      });
    },
  },
  watch: {
    getCadID() {
      this.getGameDetail(1);
    },
    getgameState() {
      this.getGameDetail(1);
    },
    getKey(val) {
      this.getGameDetail(val);
    },
  },
  computed: {
    ...mapGetters("games", [
      "getCadID",
      "getBestHead",
      "getBestList",
      "getBetdata",
      "getgameState",
      "getKey",
    ]),
  },
  mounted() {
    var _this = this;
    this.getGameDetail(1);
    this.updataInterval = setInterval(function() {
      _this.getGameDetail(_this.getKey);
    }, 10000);
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/theme/mixin.scss";
@import "../../../assets/sass/global.scss";

.include > div.table_team_list:last-child .list_table_tr {
  border-bottom: 1px solid #adadad;
}

.notdata {
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  background: #ffd5d5;
}

.table_head {
  height: 35px;
  @include nav-headrtBgcolor();

  ul {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #ffffff;

    li {
    }

    .table_head_type {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      border-right: 1px solid #ffffff;
      height: 20px;
      width: 400px;

      i {
        margin: 0 18px;
        font-size: 16px;
      }
    }

    .table_head_playtype {
      //min-width: 180px;
      flex: 1;
      width: auto;
      text-align: center;
      border-right: 1px solid #ffffff;
      height: 20px;
    }
  }
}

.table_team_list {
  .el-collapse-item__header {
    padding: 0;

    i {
      margin: 0 20px;
    }
  }

  .el-collapse-item__content {
    padding: 0;
  }

  table tr:last-child {
    border: none;
  }

  .list_table_tr {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #adadad;

    .list_table_td_1 {
      width: 400px;

      ul {
        display: flex;
        height: 100%;
        align-items: center;

        li:nth-child(1) {
          width: 50px;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        li:nth-child(2) {
          width: 310px;
        }

        li:nth-child(3) {
          width: 40px;
          display: inline-flex;
          align-items: center;
          font-size: 20px;
          color: #5e5e5e;
        }
      }
    }

    .odds_td {
      border-left: 1px solid #e3e3e3;
      flex: 1;

      ul.odds_td_ul {
        li.havedata {
          cursor: pointer;
          text-align: center;
          font-weight: bold;
          color: #3fa381;
          > div {
            width: 100%;

            span {
              width: 50%;
              display: inline-block;
            }

            span:first-child {
              text-align: right;
              padding-right: 5px;
              color: #000000;
              font-weight: 500;
            }

            span:last-child {
              text-align: left;
              padding-left: 5px;
            }

            span.odds_center {
              width: 100%;
              text-align: center;
            }
          }
        }

        li.havedata:not(li.acitve):hover {
          background: #ffe1ae;
        }
      }

      ul {
        li:not(:last-child) {
          border-bottom: 1px solid #e3e3e3;
        }

        li {
          height: 30px;
          line-height: 30px;
          display: flex;
          justify-content: center;
          text-align: center;
          width: 100%;
        }
      }
    }
  }
}

.table_main {
  height: calc(100% - 35px);
  overflow: auto;
  @include main-bg-color();
}

.table_main::-webkit-scrollbar {
  width: 0;
}
</style>
