<template>
  <div id="app" :data-theme="nowThemeInfo">
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['nowThemeInfo'])
  }
}
</script>
