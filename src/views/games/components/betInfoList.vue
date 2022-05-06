<template>
        <div class="betInfo_Center"  v-loading="loading"  element-loading-background="rgba(0, 0, 0, 0.8)" v-if="getBetdata.length>0">
            <div v-for="(item,i) in getBetdata " :key="i" class="betInfo_List" >
                <div  class="BIL_In" :class="getclass(item.Odds.Status,item.isrepeat,item.beterror)" >
                    <div class="flex BIL_T_text">
                        <div>
                            <span class="t_blue"> {{ item.bet_title }} </span>
                            <span class="t_red">{{ item.Cutline }}</span>
                            <span class="t_inlineBox"> @ <span class="t_red">{{ item.OddsValue }}</span></span>
                        </div>
                        <i class="el-icon-close" @click="deleteBet(i)"></i>
                    </div>
                    <div class="BIL_In_padding">
                        <div>
                            <span v-if="item.CatID === 1">足球</span>
                            <span v-if="item.CatID === 82">冰球</span>
                            <span v-if="item.CatID === 83">彩球</span>
                            <span v-if="item.CatID === 4">棒球</span>
                            <span v-if="item.CatID === 16">籃球</span>
                            <span v-if="item.WagerGrpID === 10"> - [全場]</span>
                            <span v-if="item.WagerGrpID === 11"> - [上半]</span>
                        </div>
                        <div>{{ item.LeagueNameStr }}</div>
                        <div>{{ item.HomeTeamStr }} <span class="t_orange">(主)</span> vs {{ item.AwayTeamStr }}</div>
                        <div v-show="type===0" class="BIL_input">
                            <input v-model="item.Amount" :max="item.BetMax" :min="item.BetMin"
                                   :placeholder="item.BetMin +  '-' +item.BetMax"
                                   type="Number">
                            <input placeholder="可赢金額"  :value="Math.floor(item.Amount * item.OddsValue)" @input="wink_amount($event)">
                        </div>
                        <div class="betLimit_t ">本場上限：{{ 100000 }}</div>
<!--                        <div v-if="item.beterror" class="errorText1">{{item.beterror}}</div>-->
                    </div>
                    <div v-show="item.Odds.Status !== 1" class="betError">
                        <span>盘口关闭中，请移除后下注</span>
                    </div>
                </div>
            </div>
            <div v-show="showErrorText()" class="errorText">
                <span>※ 存在同場賽事</span>
                <span>已選項目有 {{errornum}} 注無法串關</span>
            </div>
            <div v-show="type === 0" class="betPlay_list flex">
                <span>單    注:</span>
                <div>
                    <input v-model="allAmount" placeholder=""  type="Number"> <span class="t_blue">x  {{ getBetdata.length }} </span>
                </div>
            </div>
            <div v-show="type === 1" class="betPlay_list flex">
                <span>{{ getBetdata.length }}串1 @{{getBetdata[0].stray}}</span>
                <div>
                    <input v-model="AmountS"  placeholder="" style="width: 100%" type="Number">
                </div>
            </div>
            <div   class="betPlay_list flex betPlay_list" >
                <span>可赢金額</span>
                <div  v-show="type === 0">
                    <input disabled placeholder="" style="width: 100%;"
                           :value="allAmountwink" type="number">
                    <span  class="t_blue">x {{getBetdata.length }}</span>
                </div>
                <div  v-show="type === 1">
                    <input disabled placeholder="" :value="Math.floor(getBetdata[0].stray * AmountS * 100)/100 - AmountS "  style="width: 100%;" type="number">
                </div>
            </div>
            <div class="block">
                <el-carousel :autoplay='false' arrow='always' height="50px" indicator-position='none' trigger="click">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <div class="flex BPC_List">
                            <img alt="" class="icon" src="@/assets/img/sun1.svg">
                            <img alt="" class="icon" src="@/assets/img/sun1.svg">
                            <img alt="" class="icon" src="@/assets/img/sun1.svg">
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="betPlay_btm"  >
                <ul class=" color_text" v-show="type===0">
                    <li class="flex">所有投注：
                        <div class="BPBM_L">{{ getBetdata[0].betamount}}</div>
                    </li>
                    <li class="flex">可赢金額：
                        <div class="BPBM_R" >{{ getBetdata[0].winable }}</div>
                    </li>
                </ul>
                <ul class=" color_text"  v-show="type===1">
                    <li class="flex">所有投注：
                        <div class="BPBM_L" >{{ AmountS }}</div>
                    </li>
                    <li class="flex">可赢金額：
                        <div class="BPBM_R" >{{ Math.floor(AmountS * getBetdata[0].stray * 100) /100 - AmountS}}</div>
                    </li>
                </ul>
            </div>
            <div class="flex btn_betPlay">
                <el-button type="info" @click="deleteBet('all')">取 消</el-button>
                <el-button v-if='confirm === 0' type="warning" :disabled="loading" @click="Play_bet(0)">確認下注</el-button>
                <!--                <div v-if='confirm ===1' class="btn_betPlay_change btn" @click="getConfirm(2)">接受變化並下注</div>-->
                <!--                <div v-if='confirm === 2' class="btn_betPlay_confirmOK btn" @click="getConfirm(0)">關 閉</div>-->
            </div>
        </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex';
import {gamePlay, playState, getBetInfo, getbetHistory} from "../../../request/api/Games";

export default {
    name: 'betInfoList',
    data() {
        return {
            activeValue: 0,
            activeBetInfo: 0,
            confirm: 0,
            Amount: '',
            allAmount: '',
            allAmountwink:'',
            AmountS: '',
            updataInterval: '',
            Betdata: [],
            errornum:0,
            loading:false,
            successArr: [],
            errArr: [],
            thisAmount:0
        }
    },
    props: {
        type: 0,
    },
    computed: {
        ...mapGetters('games', ['getBetdata', 'WagerString']),
        monner(){
            // console.log(this.getBetdata);
            return this.getBetdata
        }

    },

    components: {},
    watch: {
        allAmount(val) {
            for (const item of this.getBetdata) {
                console.log(item);
                item.Amount = val
            }
            if(this.getBetdata>0){
                this.allAmountwink =  this.getBetdata[0].winable
            }

        },

        'getBetdata.length': {
            handler(newValue, oldValue) {
                console.log(newValue,oldValue);
                var _this = this
                if (newValue !== oldValue) {
                    var GameIDs = []
                    _this.Amount = ''
                    _this.allAmount = ''
                    clearInterval(this.updataInterval)
                    _this.getBetdata.forEach((item, i) => {
                        console.log(item);
                        GameIDs.push(item.Odds.GameID)
                    })
                    var ids = '[' + GameIDs + ']'
                    this.updataInterval = setInterval(async function () {

                        await getBetInfo({GameIDs: ids}).then((res) => {
                            console.log(88989999,res);
                            res.data.forEach((item, i) => {

                                if (_this.getBetdata[i].WagerTypeID === 101 || _this.getBetdata[i].WagerTypeID === 103) {
                                    if (_this.getBetdata[i].type === 0) {
                                        _this.getBetdata[i].OddsValue = item.HomeHdpOdds
                                    } else if (_this.getBetdata[i].type === 1) {
                                        _this.getBetdata[i].OddsValue = item.AwayHdpOdds
                                    } else {
                                        _this.getBetdata[i].OddsValue = item.DrewOdds
                                    }
                                } else if (_this.getBetdata[i].WagerTypeID === 102 || _this.getBetdata[i].WagerTypeID === 104 || _this.getBetdata[i].WagerTypeID === 109) {
                                    if (_this.getBetdata[i].type === 0 ) {
                                        _this.getBetdata[i].OddsValue = item.OverOdds
                                    } else if (_this.getBetdata[i].type === 1) {
                                        _this.getBetdata[i].OddsValue = item.UnderOdds
                                    } else {
                                        _this.getBetdata[i].OddsValue = item.DrewOdds
                                    }
                                } else if(_this.getBetdata[i].WagerTypeID === 110 || _this.getBetdata[i].WagerTypeID === 111){
                                    if (_this.getBetdata[i].type === 0) {
                                        _this.getBetdata[i].OddsValue = item.HomeOdds
                                    } else if (_this.getBetdata[i].type === 1) {
                                        _this.getBetdata[i].OddsValue = item.AwayOdds
                                    } else {
                                        _this.getBetdata[i].OddsValue = item.DrewOdds
                                    }
                                }else {
                                    if (_this.getBetdata[i].type === 0) {
                                        _this.getBetdata[i].OddsValue = item.HomeOdds
                                    } else if (_this.getBetdata[i].type === 1) {
                                        _this.getBetdata[i].OddsValue = item.AwayOdds
                                    } else {
                                        _this.getBetdata[i].OddsValue = item.DrewOdds
                                    }
                                }

                            })
                            console.log(_this.getBetdata);
                        })
                        _this.$forceUpdate()
                    }, 10000)

                }
            }

        }
    },
    mounted() {
        this.getbetHistory()
    },
    methods: {
        ...mapMutations('games', ['ADD_BERDATA', 'ADD_WAGERSTRING', 'DELETED_BERDATA','SET_HISTORY','SET_HISTORYSETTLED','SET_TAB']),
        getclass(Status,isrepeat,err){

            if(this.type === 0){
                if(err){
                    return Status === 0?'BIL_Inerror BIL_Inerror1':'BIL_Inerror1'
                }else {
                    return Status === 0?'BIL_Inerror':''
                }

            }
            if(this.type === 1){
                return isrepeat?'BIL_Inerror1':''
            }

        },
        wink_amount(val){
            console.log(val);
        },
        showErrorText(){
            var errornum = 0
            this.getBetdata.map( (value)=>{
                if(value.isrepeat){
                    errornum++
                }
            })
            this.errornum = errornum
            if(errornum>0 && this.type ===1){
                return true
            }else {
                return false
            }
        },
        Play_bet(val) {
            this.confirm = val
            var list = []
            if(this.type === 0){
                for (var i = 0; i < this.getBetdata.length; i++) {
                    if (this.getBetdata[i].Amount !== ''){
                        var obj = {
                            CatID: this.getBetdata[i].CatID,
                            WagerString: this.getBetdata[i].WagerString,
                            Amount: this.getBetdata[i].Amount,
                            AcceptBetter: false,
                            BetType: 1
                        }
                        list.push(obj)
                    } else {
                        this.$notify({
                            title: '请先输入下注金额',
                            type: 'error'
                        });
                        return false
                    }

                }
            }else {
                if(this.AmountS !== ''){
                    var WagerString = ''
                    this.getBetdata.forEach((item,i)=>{
                        if(WagerString === ''){
                            WagerString += item.WagerString
                        }else {
                            WagerString += ('|'+item.WagerString)
                        }
                    })
                    var obj = {
                        CatID: this.getBetdata[0].CatID,
                        WagerString: WagerString,
                        Amount: this.AmountS,
                        AcceptBetter: false,
                        BetType: 99
                    }

                    list.push(obj)
                    console.log(list);
                } else {
                    this.$notify({
                        title: '请先输入下注金额',
                        type: 'error'
                    });
                    return false
                }

            }
            this.loading = true
            gamePlay({lang: "tw", list: list}).then((res) => {
                console.log(res);

                if (res.code === 200) {
                    this.AmountS = ''
                    this.playState(res.data.traceCodeKey)
                }
            })
        },

         playState(key) {
            var _this = this
            playState({traceCodeKey: key}).then((res) => {
                console.log(res, 9999);
                if(this.type === 1){
                    if(res.data[0] === 201){
                        setTimeout(function () {
                            _this.playState(key)
                        }, 3000)
                        this.loading=true
                    }else if(res.data[0] === 200){
                        this.$notify.success({
                            message: this.res.data[0].Message
                        });
                        this.loading=false
                        var deletedtype = 'all'
                        _this.DELETED_BERDATA(deletedtype)
                        _this.getbetHistory()
                        _this.$emit('change',1)
                    }else {
                        this.$notify.error({
                            message: this.res.data[0].Message
                        });
                        this.loading=false
                    }
                }else {
                    if (res.data.some(item => item.code === 201)) {
                        setTimeout(function () {
                            _this.playState(key)
                        }, 3000)
                        this.loading=true
                    } else {
                        this.loading=false
                        res.data.forEach((item,i)=> {
                            if(!item !== 200) {
                                _this.getBetdata[i].beterror = true
                            }
                        })
                        if(res.data.every(item => item.code === 200)){
                            _this.$notify.success({
                                message: '投注成功'
                            });
                            _this.SET_TAB(1)
                            _this.DELETED_BERDATA('all')
                        }else {

                            for (let i = res.data.length - 1; i >= 0; i--) {
                                if (res.data[i].code === 200) {
                                    _this.DELETED_BERDATA(i)
                                }else {
                                    // this.$message.error(res.data[i].Message);
                                    setTimeout(function (){
                                        _this.$notify.error({
                                            message:res.data[i].Message
                                        });
                                    },500)
                                }
                            }
                        }
                        _this.getbetHistory()
                    }
                }
            })
        },
        deleteBet(i) {
            this.DELETED_BERDATA(i)
        },
        getbetHistory(){
            getbetHistory({lang:'cn',isset:false}).then((res)=>{
                console.log(res);
                if (res.data){
                    this.SET_HISTORY(res.data.list)
                }

            })
            getbetHistory({lang:'cn',isset:true}).then((res)=>{
                console.log(res);
                this.SET_HISTORYSETTLED(res.data.list)
            })
        }
    }
}
</script>


<style lang="scss" scoped>
@import '../../../assets/sass/theme/mixin.scss';
@import '../../../assets/sass/global.scss';

.BIL_In_padding {
    padding: 2px 8px;
}

.betInfo_Center {
    @include betInfo_SubT();
    color: #333;
    height: 100%;
    font-size: 13px;
}

.betInfo_List {
    @include betInfo_SubT();
    width: 300px;
    height: auto;
    padding: 5px;
    color: #333;

    .betError{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        background: rgba(0,0,0,0.6);
        border-radius:3px ;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        z-index: 9;
        span{
            width: 70%;
            text-align: center;
            height: 40px;
            border-radius: 40px;
            line-height: 40px;
            background: rgba(0,0,0,0.5);
        }
    }
    .el-icon-close {
        color: #333;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        z-index: 99;
    }
    .BIL_In {
        width: 290px;
        border-radius:3px ;
        background: #bbbbbb;
        position: relative;
    }
    .BIL_Inerror{
        .el-icon-close {
            color: #ffffff;
            cursor: pointer;
            z-index: 99;
        }
    }
    .BIL_Inerror1{
        background: #deb7b7;
        .BIL_T_text{
            background: #d18d8c;
        }
    }
    .BIL_input {
        display: flex;

        input:nth-child(2) {
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
        font-size: 13px;
        line-height: 16px;
        margin-bottom: 3px;
        padding: 10px;
        width: 100%;
        justify-content: space-between;

        .t_red {
            color: red;
        }

        .t_inlineBox {
            display: inline-block;
            white-space: nowrap;
            color: #333;
        }
    }
    .t_orange {
        color: #d36200;
    }

    .betLimit_t {
        color: #006a8a;
        line-height: 30px;
    }
}
.errorText{
    width: 290px;
    margin: 0 auto;
    display: flex;
    height: 60px;
    background-color: #d66764;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    color: #ffffff;
    border-radius: 5px;
}
.errorText1{
    width: 290px;
    padding: 10px 0;
    margin: 0 auto;
    letter-spacing: 5px;
    text-align: center;
    color: #ff0000;
    font-size: 14px;
    font-weight: 600;

}
.t_blue {
    color: #005aff;
}

.betPlay_list {
    padding: 5px 10px;
    font-size: 13px;
    display: flex;
    line-height: 33px;
    justify-content: space-between;


    span:nth-child(1) {
        width: 80px;
        text-align: justify;
        text-align-last: justify;
    }
    >div{
        position: relative;
    }
    .t_blue {
        position: absolute;
        right: 2px;
        width: 50px;
        top: 2px;
        background: #fff;
        height: 30px;
        text-align: right;
        line-height: 30px;
        padding-right: 10px;
        border-left: 1px solid #dadada;
    }
    input {
        border: none;
        height: 30px;
        border-radius: 3px;
        padding-left: 5px;
    }
}

.betPlay_list1 {
    input {
        background: #c0c0c0;
    }

    .t_blue {
        background: #c0c0c0;
    }
}

.betPlay_btm {
    width: 100%;
    border-top: 1px solid #333;
    padding: 10px 5px;
    margin-top: 5px;
    font-size: 13px;
    @include betInfo_MainLfet();

    ul {
        width: 100%;
        display: inline-flex;
        align-items: center;

        li {
            width: 50%;

            div {
                width: 70px;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }

    .BPBM_L {
        @include betInfo_MainRight();
    }

    .BPBM_R {
        @include betInfo_MainStruc();
    }
}

.block {
    padding: 5px 10px;

    .BPC_List {
        padding: 10px 50px;

        img {
            width: 50px;
            height: 30px;
        }

        img:hover {
            -webkit-transform: translateY(-5px);
            -moz-transform: translateY(-5px);
            -ms-transform: translateY(-5px);
            -o-transform: translateY(-5px);
            transform: translateY(-5px)
        }
    }
}

.btn_betPlay {
    padding: 10px 5px;
    button{
        width: 49%;
    }
}
</style>