<template>
    <div class="home">
      <div class="head">
        <header-top></header-top>
      </div>
      <div class="setUp">
        <setUp></setUp>
      </div>
      <div class="main">
        <nav-menu></nav-menu>
        <router-view/>
      </div>
    </div>
</template>

<script>

import headerTop from '@/components/headerTop.vue'
import setUp from '@/components/setUp.vue'
import NavMenu from '@/components/NavMenu.vue'
import {getMenu, getMenuGameType} from "../request/api/Menu";
import {getGameDetail} from "../request/api/Games";
export default {
    name: 'Home',
    data(){
      return{
        isCollapse: false
      }
    },
    components: {headerTop, setUp, NavMenu},
    mounted() {
      // getMenuGameType({lang:'cn'}).then((res)=>{
      //   console.log( "左侧菜单遊戲狀態:", res);
      // })
      // getMenu({lang:'cn',gtype:'1'}).then((res)=>{
      //   console.log( "左侧菜单球种:", res);
      // })
      // getGameDetail({lang:'cn',CatID:'1',GameType:'1'}).then((res)=>{
      //   console.log( "右侧玩法数据:", res);
      // })

    },
    methods:{
    }
}
</script>


<style lang="scss" scoped>
@import '../assets/sass/theme/mixin.scss';
.home{
  height: 100%;
  .head{
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #267258;
    @include base-background();
  }
  .setUp{
    width: 100%;
    height: 38px;
    @include background-color-hederTop();;
  }
  .main{
    width: 100%;
    height: calc(100% - 108px);
    display: flex;
     nav-menu{
      height: 100%;
    }
    .main_body{
      width:100%;
      height: 100%;
      display: flex;
      // @include background-color-hederTop();
      // background: #ffb5b5;
    }
  }


}
</style>