<template>
    <div class="color_text">
        <!-- 單項投注 -->
        <div class="betInfo_Center">
            <div class="betInfo_List" v-for="(item,i) in type===0?getHistorydata:getHistorySettled" :key="i">
                <div class="BIL_In" v-if="item.BetType === 1">
                    <div class="BIL_T_text title">      
                        <span class="t_blue">{{item.dataBet[0].betname}}<span class="t_red">{{ item.dataBet[0].CutLine }}</span>
                          <span class="t_inlineBox"> @ <span class="t_red">{{ item.dataBet[0].PayoutOddsStr }}</span></span>
                        </span>
                    </div>
                    <div class="BIL_In_padding">
                        <div>{{ item.CatID|getball }} - [{{ item.dataBet[0].HalfType===0? '全場':'半場' }}]</div>
                        <div>{{ item.dataBet[0].LeagueName }}</div>
                        <div>{{item.dataBet[0].HomeTeam}} <span class="t_orange">(主)</span> VS {{ item.dataBet[0].AwayTeam }}</div>
                        <div class="betPlay_btm">
                            <span>投注 : {{ item.Amount }}</span>
                            <span>可赢 : {{ Math.floor(item.Amount * Number(item.dataBet[0].PayoutOddsStr))}}</span>
                        </div>
<!--                        <div :class="item.StatusType === 'Y' || item.StatusType === 'W' || item.StatusType === 'X'?'t_blue':'t_red'" >{{item.StatusType | StatusText}}</div>-->
                    </div>
                </div>
                <div class="BIL_In" v-if="item.BetType === 99">
                    <div class="BIL_T_text borderNone">
                        <div>
                            <div>
                                <span class="t_red">過關 </span>
                                <span class="t_blue"> {{ item.dataBet.length }}串1 x 1 </span>
<!--                                <span class="t_inlineBox"><span class="t_red">降星</span></span>-->
                            </div>
                            <div>(每組{{ item.Amount }}元 x 1組) = {{ item.Amount }}</div>
                        </div>
                        <i :class="item.active?'el-icon-arrow-down':'el-icon-arrow-up'" @click="upactive(item.TicketID)"></i>
                    </div>
                    <div v-show='item.active'>
                        <div class="BIL_In BIL_In1" v-for="(betlist,y) in item.dataBet">
                            <div class="BIL_T_text title">
                             <span class="t_blue"> {{ betlist.betname }}<span class="t_red">{{ betlist.CutLine }} </span>
                              <span class="t_inlineBox"> @ <span class="t_red">{{ betlist.PayoutOddsStr }}</span></span>
                            </span>
                            </div>
                            <div class="BIL_In_padding NB_Complex_In borderNone">
                                <div>{{item.CatID|getball }} - [{{ betlist.HalfType===0?'全場':'半場'}}]</div>
                                <div>{{ betlist.LeagueName }}</div>
                                <div>{{betlist.HomeTeam}} <span class="t_orange">(主)</span> v {{ betlist.AwayTeam  }}</div>
                                <div class="flex btn_betPlay" v-if='confirm === 1'>
                                    <div class="btn_betPlay_clear btn">取 消</div>
                                    <div class="btn btn_betPlay_confirm" @click="getConfirm(2)">確認下注 <span class="t_red">84.60</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
       <div class="btn_NB_load">
        加載更多注單 +
      </div>
    </div>
</template>

<script>


import {mapGetters, mapMutations} from 'vuex'
import {getbetHistory} from "../../../request/api/Games";

export default {
    name: 'newbetScroll',
    data() {
        return {
            activeValue: 0,
            activeBetInfo: 0,
            confirm: 0,
            downShow:false,
            listdata:[]
        }
    },
    filters: {

    },
    props:['type'],
    computed: {
        ...mapGetters('games', ['getHistorydata','getHistorySettled'])
    },
    components: {},
    mounted() {
        getbetHistory({lang:'cn',isset:false}).then((res)=>{
            if(res.data){
                this.listdata = res.data.list
            }
        })
    },
    methods: {
        ...mapMutations(['SET_THEMEINFO']),

        setDownShow(){
          this.downShow = !this.downShow
        },
        upactive(id){
            this.getHistorydata.forEach((item,i)=>{
                if(item.TicketID === id){
                    item.active = !item.active
                }
            })
            this.$forceUpdate()
        }
    }
}
</script>


<style lang="scss" scoped>
@import '../../../assets/sass/theme/mixin.scss';
@import '../../../assets/sass/global.scss';

.BIL_In_padding {
    padding: 2px 8px;
    color: #000;
}
.borderNone{
  border: none !important;
}
.title{
  display: flex;
  justify-content: left !important;
}
.BIL_In1{
   border: 1px solid #999 !important;
   margin: 5px;
   width: 280px !important;
   background-color: #d2d2d2 !important;
}
.btn_NB_load{
  border-color: #999;
  border: 1px solid #333;
  border-radius: 3px;
  width: 290px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin: 20px 5px;
   @include  font_color()
}
.betInfo_List {
    @include betInfo_SubT();
    width: 300px;
    height: auto;
    padding: 5px;
    color: #333;

    .BIL_In {
        width: 290px;
        height: auto;
        padding: 10px 0px;
        background: #bbbbbb;
        font-size: 14px;
        .NB_Complex_In {
          .t_green{
            color: #148800;
          }
        }
    }
    .BIL_input {
        display: flex;

        input:nth-child(2) {
            //  margin-top: 4px;
            background-color: #e0e0e0;
            margin-left: 2%;
        }

        input {
            border: none;
            margin-top: 5px;
            height: 30px;
            width: 46%;
            padding-left: 5px;
        }
    }

    .BIL_T_text {
        display: flex;
        justify-content:space-around;
        line-height: 16px;
        margin-bottom: 3px;
        // vertical-align: top;
        padding: 4px 6px;
        width: 100%;
        // box-sizing: border-box;
        border-bottom: 1px solid #999;
        i{
          line-height: 30px;
        }
        div:nth-child(1){
          width: 240px;
        }
        .t_inlineBox {
            display: inline-block;
            white-space: nowrap;
            color: #333;
        }
    }
    .t_red {
        color: red;
        margin: 5px 0;
    }
    .el-icon-close {
        color: #333;
        margin-left: 100px;
    }

    .t_orange {
        color: #d36200;
    }

    .betLimit_t {
        color: #006a8a;
        line-height: 30px;
    }
}

.t_blue {
    color: #005aff;
    margin: 5px 0;
}

.btn_BIL_cash{
    width: 100%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    background-color: #336699;
    color: #fff;
    margin-top: 10px;
    span{
      color: #ffdf1b;
      font-size: 17px;
      font-weight: bold;
      margin-left: 13px;
    }
}
.betPlay_list {
    padding: 5px 10px;
    font-size: 13px;
    display: flex;
    line-height: 33px;
    justify-content: space-between;
    span:nth-child(1) {
        width: 60px;
        text-align: justify;
        text-align-last: justify;
    }

    div:nth-child(2) {
        vertical-align: middle;
        // padding: 5px 0;
        background: #fff;
        position: relative;
        width: 200px;
        input {
            width: 150px;
            border: none;
            height: 34px;
        }
    }

    .t_blue {
        position: absolute;
        right: 0;
        width: 50px;
        top: 0;
        background: #fff;
        height: 34px;
        text-align: right;
        line-height: 34px;
        padding-right: 10px;
        border-left: 1px solid #5e5e5e;
    }
}


.betPlay_btm {
    width: 100%;
    @include betInfo_MainLfet();
    span{
        margin-top: 10px;
        width: 50%;
        display: inline-block;
    }
}


.btn_betPlay {
    padding: 5px;
     font-weight: bold;
    .btn {
        width: 120px;
        height: 35px;
        line-height: 35px;
        text-align: center;
    }
    
    .btn_betPlay_confirm {
        width: 70%;
        background: #ffea01;
        color: #000;
    }

    .btn_betPlay_clear {
        background: #838383;
        width: 20%;
        color: #fff;
    }

    .btn_betPlay_change {
        background: #41b590;
        color: #fff;
    }

    .btn_betPlay_confirmOK {
        background: #ccc;
        color: #148800;
        width: 100%;
    }
}
</style>