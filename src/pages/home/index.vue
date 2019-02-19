<template>
  <section class="panel">
    <TopBar class="top"/>
    <router-view></router-view>
    <InfiniteLoading />
  </section>
</template>

<script>
import TopBar from './top'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Home',
  created () {
    this.$store.commit('changePageTitle', "猫眼电影")
  },
  components: {
    TopBar,
    InfiniteLoading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "../../scss/fn.scss";
.panel{
  position: absolute;
  top: $navbarHeight + $topbarHeight;
  left: 0;
  width: 100%;
}
.top{
  top: $navbarHeight;
}
</style>
