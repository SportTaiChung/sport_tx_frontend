<template>
    <div class="main_body">
        <div class="leftBody color_text">
            <div class="Gamedata">
                <game-table></game-table>
            </div>
            <game-panel class="boder-right" v-show="moredata"></game-panel>
        </div>
        <betting-data></betting-data>
    </div>

</template>

<script>


import {mapMutations} from 'vuex'
import gamePanel from './components/gamePanel.vue'
import gameTable from './components/gameDataTable'
import bettingData from './components/bettingData'
export default {
    name: 'leftBody',
    data() {
        return {
            activeName: '',
            moredata:false,
        }
    },
    components: {gamePanel,gameTable,bettingData},
    mounted() {

    },
    methods: {
        handleClick() {

        }
    }
}
</script>


<style lang="scss" scoped>
@import '../../assets/sass/theme/mixin.scss';
@import '../../assets/sass/global.scss';

.leftBody {
    width: calc(100% - 300px);
    display: flex;
    justify-content: space-between;
}

.boder-right {
    min-width: 370px;
}
.Gamedata{
    width: 100%;
    height: 100%;
    >div{
        height: 100%;
    }
}
</style>