<template>
  <section class="panel">
    <NavBar title="猫眼电影" />
    <TopBar class="top" />
    <router-view></router-view>
  </section>
</template>

<script>
import NavBar from '@/components/navbar/fixed'
import TopBar from './components/top'

export default {
  name: 'Home',
  components: {
    NavBar,
    TopBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../scss/fn.scss';
.panel {
  position: absolute;
  top: $navbarHeight + $topbarHeight;
  left: 0;
  width: 100%;
}
.top {
  top: $navbarHeight;
}
</style>
