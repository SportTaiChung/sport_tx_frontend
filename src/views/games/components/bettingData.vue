<template>
    <div class="rightBody color_text ">
        <div>
            <ul class="flex rightBody_head">
                <li :class="getthistab === 0?'is_active': ''" @click="SET_TAB(0)" >投注資訊</li>
                <li :class="getthistab === 1?'is_active': ''" @click="SET_TAB(1)">最新注單{{getHistorydata.length<=0?'':getHistorydata.length}}</li>
            </ul>
        </div>
        <div v-show="getthistab === 0" class="rightBody_main">
            <div v-show="getBetdata.length>0">
                <ul class="flex betInfo_SubT">
                    <li :class="activeBetInfo === 0?'Tou_active': ''" @click="selcetBetInfo(0)">單項投注{{getBetdata.length}}</li>
                    <li :class="activeBetInfo === 1?'Tou_active': ''" @click="selcetBetInfo(1)">過關投注{{getBetdata.length}}</li>
                </ul>

                <div v-if='activeBetInfo === 0'>
                    <betInfo-list :type="0" @change="uptype($event)"></betInfo-list>
                </div>
                <!-- 过关投注 -->
                <div v-if='activeBetInfo === 1 && getBetdata.length>1'>
                    <betInfo-list :type="1" @change="uptype($event)"></betInfo-list>
                </div>
                <div v-show="activeBetInfo === 1 && getBetdata.length<=1" style="color: red;text-align: center;line-height: 100px">
                    過關投注請至少選擇2場賽事
                </div>
            </div>
            <div v-show="getBetdata.length<=0" style="color: red;text-align: center;line-height: 100px">
                请先点击赔率以添加选项
            </div>
        </div>
        <div v-show="getthistab === 1"  class="rightBody_main">
            <div>
                <ul class="flex betInfo_SubT">
                    <li :class="activeNewbet === 0?'Tou_active': '' " @click="selcetNewbet(0)">未结算注單 <span class="t_blue">{{getHistorydata.length<=0?'':getHistorydata.length}}</span>
                    </li>
                    <li :class="activeNewbet === 1?'Tou_active': ''" @click="selcetNewbet(1)">已结算注單 <span class="t_change">{{getHistorySettled.length<=0?'':getHistorySettled.length}}</span>
                    </li>
                </ul>
                <div v-if='activeNewbet === 0'>
                    <newbet-scroll :type="0"></newbet-scroll>
                </div>
                <!-- 最新注單 -->
                <div v-show='activeNewbet === 1 '>
                    <newbet-scroll :type="1" ></newbet-scroll>
                </div>
            </div>


        </div>

    </div>
</template>

<script>


import {mapGetters, mapMutations} from 'vuex';
import betInfoList from './betInfoList.vue'
import newbetScroll from './newbetScroll.vue'

export default {
    name: 'rightBody',
    data() {
        return {
            activeValue: 0,
            activeBetInfo: 0,
            activeNewbet: 0,
            datatype:0,

        }
    },
    components: {betInfoList, newbetScroll},
    mounted() {

    },
    computed: {
        ...mapGetters('games', ['getBetdata','getHistorydata','getHistorySettled','getthistab'])
    },
    methods: {
        ...mapMutations('games', ['ADD_BERDATA', 'ADD_WAGERSTRING','SET_TAB']),
        selcetActive(val) {
            this.activeValue = val
        },
        selcetBetInfo(val) {
            this.activeBetInfo = val
        },
        selcetNewbet(val) {
            this.activeNewbet = val
        },
        async uptype(val){
            console.log(val);
            this.activeValue = val
        }
    },
    watch:{
    },
}
</script>


<style lang="scss" scoped>
@import '../../../assets/sass/theme/mixin.scss';
@import '../../../assets/sass/global.scss';

.rightBody {
    width: 300px;
    color: #bbb;
    @include nav-TopBgcolor();
    .rightBody_head {
        @include nav-headrtBgcolor();
        li{
            cursor: pointer;
        }
    }
}
.rightBody .rightBody_main{
    >div{
        height: 100%;
        >div{
            height: calc(100% - 35px);
        }
    }
    height: calc(100% - 35px);
    overflow: auto;
}
.rightBody_main::-webkit-scrollbar{width:0;}
.is_active {
    color: #fff;
    border-bottom: 2px solid #999;
    padding-bottom: 6px;
    height: 30px;
}

ul {
    height: 35px;
    line-height: 35px;
}

.betInfo_SubT {
    font-size: 13px;
    height: 35px;
    color: #000;
    @include betInfo_SubT();
    padding-top: 5px;

    li {
        display: table-cell;
        height: 30px;
        line-height: 30px;
        width: 130px;
        vertical-align: middle;
        text-align: center;
        color: #5e5e5e;
        background-color: #bbb;
        cursor: pointer;
    }

    .Tou_active {
        color: #333;
        background: #fff;
    }
}

.t_blue {
    color: blue;
}

.t_change {
    @include betInfo_t_change()
}
</style>