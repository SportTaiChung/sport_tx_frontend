<template>
    <div class="gamePanel font_size " v-show='gamePanelShow'>
      <div class="gamePanel_head flex">
        <div>巴西
          <span class="yellow_color">V</span>
          阿根廷
        </div>
        <i class="el-icon-close" @click="gamePanelShow = false"></i> 
      </div>
      <div class="GDView_T">
        <ul class="flex">
          <div class="flex btn_GDV">
            <div class="btn_fixed btn_GDV_scoreBoard" @click="scoreBoardfalse = true">
              <div>1:0</div>
              <div class="GDV_prompt">比分板</div>
            </div>
            <div class="btn_fixed">
              <i class=" el-icon-s-grid"></i>
              <div class="GDV_prompt">11</div>
            </div>
            <div class="btn_fixed" @click="scoreBoardfalse = false">
              <i class="el-icon-s-data"></i>
              <div class="GDV_prompt">賽事數據</div>
            </div>
          </div>
          <div class="btn_fixed">
            <i class="el-icon-paperclip"></i>
            <div class="GDV_prompt">取消釘選</div>
          </div>
        </ul>
      </div>
      <!-- 比分板 -->
      <div class="scoreBoard bg_site_soccer" v-show='scoreBoardfalse'>
        <ul>
          <li>上半場 00：00</li>
          <li>總分</li>
        </ul>
        <ul class="flex">
          <li>巴西</li>
          <li> 
            <span>2</span> &nbsp;&nbsp; 
            <span>0</span>&nbsp;&nbsp; 
            <span class="yellow_color">2</span>
           </li>
        </ul>
        <ul class="flex">
          <li>阿根廷</li>
          <li><span>2</span> &nbsp;&nbsp; 
          <span>0</span>&nbsp;&nbsp; 
          <span class="yellow_color">2</span>
          </li>
        </ul>
      </div>
      <!-- 折叠面板 -->
      <div class="btn_GDListT">
        <ul>
          <li>全部</li>
          <li>全場 / 上半</li>
          <li>特定15分</li>
          <li>角球 / 罰牌</li>
          <li @click="allExpand()" v-show='arrowShow'><i class="el-icon-arrow-down"></i></li>
          <li @click="allShrink()" v-show='!arrowShow'><i class="el-icon-arrow-up"></i></li>
        </ul>
        <el-collapse v-model="activeName" @change="handleChange" class="include">
          <el-collapse-item title="全場" name=1>
            <div class="font_color">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
          </el-collapse-item>
          <el-collapse-item title="上半" name=2>
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="上半" name=3>
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="上半" name=4>
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
</template>

<script>


import {mapMutations} from 'vuex'
import {getbetHistory} from "../../../request/api/Games";


export default {
    name: 'gamePanel',
    data() {
        return {
           gamePanelShow: true,
           scoreBoardfalse: true,
           activeName: [],
           collapseTitleData: ['1','2','3','4'],
           arrowShow: true,
        }
    },
    components: {},
    mounted() {

    },
    methods: {
        ...mapMutations(['SET_THEMEINFO']),
        selcetActive(val) {
            this.activeValue = val
        },
        handleChange() {

        },
        allExpand() {
          this.activeName = [] // 注意：由于每点开一个的单独面板 activeName都会发生变化，所以点击全部展开的时候要将activeName置空
          for (const collapseTitleData of this.collapseTitleData) {
            this.activeName.push(collapseTitleData)
          }
          this.arrowShow = !this.arrowShow
        },
        allShrink() {
          this.arrowShow = !this.arrowShow
          this.activeName = [] // 将面板集合绑定的activeName置空，这时面板会全部收缩，按钮会变为全部展示
        },
    }
}
</script>


<style lang="scss" scoped>
@import '../../../assets/sass/theme/mixin.scss';
@import '../../../assets/sass/global.scss';

.gamePanel {
    width: 370px;
    height: 100%;
    color: #fff;
    @include nav-TopBgcolor();
    border-right: 1px solid #333333;
    border-left: 1px solid #333333;
    .gamePanel_head {
        height: 35px;
        @include nav-headrtBgcolor();
        div:nth-child(1) {
          width: 90%;
          text-align: center;
        }
    }
    .GDView_T{
       @include GDView_T();
       .btn_fixed {
            position: relative;
            width: 35px;
            cursor: pointer;
        }
        .btn_GDV{
          width: 80%;
          justify-content:space-around;
        }
        .btn_GDV_scoreBoard{
          width: 33px;
          height: 20px;
          line-height: 20px;
          padding: 0 5px;
          border: 1px solid #fff;
        }
        .btn_fixed:hover .GDV_prompt{
           display: block;
        }
       .GDV_prompt{
          position: absolute;
          background-color: #f0f0f0;
          color: #000;
          border-radius: 3px;
          line-height: 16px;
          bottom: -22px;
          right: 50%;
          padding: 3px 5px;
          z-index: 6;
          box-shadow: rgba(0,0,0,0.3) 0px 0px 10px;
          white-space: nowrap;
          display: none
       }
    }
}
.bg_site_soccer{
  padding: 20px 10px;
  ul{
    background: rgba(0,0,0,0.8);
    border-bottom: 1px solid rgb(129, 126, 126);
    display: flex;
    justify-content:space-between;
    padding: 0 5px;
  }
}
.is_active {
    color: #fff;
    border-bottom: 2px solid #999;
    padding-bottom: 6px;
    height: 30px;
}
.btn_GDListT{
  ul{
    display: flex;
    justify-content:space-between;
    background: #666;
    padding: 0 10px;
  }
}
.font_color{
  @include font-color-theme();
}
ul {
    height: 35px;
    line-height: 35px;
}
</style>