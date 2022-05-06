<template>
    <div>
        <div class="nav_header" v-show="!isCollapse">
            <ul >
                <li v-for="(item,i) in gameState" :key="i" v-if="i<3" @click="getstate(item.key)" :class="state===item.key?'activestate':''">{{item.value}}</li>
            </ul>
            <div class="Collapse C_show">
                <i class="el-icon-arrow-left" @click="isCollapse = !isCollapse"></i>
            </div>
        </div>
        <div class="nav_header nav_header1" v-show="isCollapse">
            <div class="Collapse C_hide">
                <i class="el-icon-arrow-left" @click="isCollapse = !isCollapse"></i>
            </div>
        </div>
        <el-menu :collapse="isCollapse"  class="el-menu-vertical-demo color_text" default-active="/"   :unique-opened="true">
            <el-submenu  index="状态" class="collapse_GameType"  v-show="isCollapse">
                <template slot="title">
                    <i class="Collapse_i">今日</i>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(item,i) in gameState" :key="i" >{{item.value}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu     v-for="(item,i) in ballType" :key="i" :index="i+''" >
                <template slot="title">
                    <i class="el-icon-basketball"></i>
                    <div class="flex nav_bottom"
                         @click="selectmenu(item.catid,1)"
                    >
                        <span class="nav_text">{{ item.catName }}</span>
                        <span class="nav_number">{{ item.count }}</span>
                    </div>
                </template>
                <el-menu-item-group v-show="item.Items.length>0" >
                    <el-menu-item  v-for="(Items,y) in item.Items" :key="y"   @click="selectmenu(item.catid,Items.WagerTypeKey)"  :index="i + '-' + y">
                        <template slot="title">
                            <div class="nav_bottom_item">
                                    <span>{{ Items.WagerTypeName }}</span>
                                <span class="nav_number">{{ Items.count }}</span>
                            </div>
                        </template>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>

</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import {getMenu, getMenuGameType} from "../request/api/Menu";

export default {
    name: 'NavMenu',
    data() {
        return {
            isCollapse:false,
            selectShow: false,
            gameState:[],//游戏状态
            ballType:[],//游戏种类
            state:1
        }
    },
    components: {},
    computed: {
        ...mapGetters('games',['getgameState'])
    },
    mounted() {
        var _this = this
        _this.getmenudata()
        setInterval(function (){
            _this.getmenudata()
        },30000)
        getMenuGameType({lang:'cn'}).then((res)=>{
            console.log( "左侧菜单遊戲狀態:", res);
            this.gameState = res.data
        })

    },
    watch:{
        getgameState(val){
            this.getmenudata()
        }
    },
    methods: {
        ...mapMutations('games', ['SET_CADID','SET_GAMESTATE','SET_KEY']),
        getstate(key){
            this.state = key
            this.SET_GAMESTATE(key)
        },
        selectmenu(id,key) {
            this.SET_CADID(id);
            this.SET_KEY(key)
            this.getmenudata()
            sessionStorage.setItem('CadID',id)
        },
        getmenudata(pid){
            getMenu({lang:'cn',gtype:this.getgameState,pID:pid}).then((res)=>{
                console.log( "左侧菜单球种:", res);
                this.ballType = res.data.item
            })
        }
    }
}
</script>


<style lang="scss" scoped>
@import '../assets/sass/theme/mixin.scss';
@import '../assets/sass/global.scss';
.activestate{
    border-bottom:3px solid #ffffff;
}
.nav_header {
    height: 35px;
    line-height: 35px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-right: 1px solid #fff;
    @include nav-headrtcolor();
    @include nav-headrtBgcolor();

    .Collapse{
        display: inline-flex;
        align-items: center;

        i{
            font-size: 20px;
            cursor: pointer;
        }
        i:hover{
            color: #dadada;
            font-weight: bold;
        }
    }
    .C_show{
        width: 25%;
        justify-content: flex-end;
    }
    .C_hide{
        width: 100%;
        justify-content: center;
    }
    ul{
        display: inline-flex;
        justify-content: space-around;
        font-size: 13px;
        width: 75%;
        li{
            text-align: center;
            height: 27px;
            line-height: 27px;
            cursor: pointer;
        }
    }

}
.nav_header1{
    width: 63px;
    border-bottom: 1px solid #88b4a5;
}
.Collapse_i{
    font-size: 13px;
    color: #ffffff;
}


.nav_bottom {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    padding: 0 20px;
}
.nav_bottom_item{
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    padding: 0 15px 0 25px;
}
.nav_text {
    @include nav-TopTextcolor();
    font-size: 13px;
}

.nav_number {
    @include nav-TopTextNumbercolor();
    font-size: 13px;
}

.el-submenu {
    border-bottom: 1px solid #bbb;
}
.el-submenu__title {
    font-size: 13px;
    @include nav-TopBgcolor();
    i{
        margin: 0;
    }
}

.el-menu {
    @include nav-TopBgcolor();
}
</style>
