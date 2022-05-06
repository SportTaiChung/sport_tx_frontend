import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from './modules/user'
import games from './modules/games'

export default new Vuex.Store({
  state: {
    nowThemeInfo: 'light', //当前主题
    themes: ['light', 'dark'] //所有主题
  },
  mutations: {
    SET_THEMEINFO(state, theme){
      state.nowThemeInfo = theme;
    }
  },
  actions: {
  },
  modules: {
    user,
    games
  }
})
