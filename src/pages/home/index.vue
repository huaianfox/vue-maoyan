<template>
  <section class="panel">
    <NavBar title="猫眼电影" />
    <TopBar class="top" />
    <router-view></router-view>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/navbar/fixed'
import TopBar from './top'

export default {
  name: 'Home',
  created () {
    this.$store.commit('changePageTitle', '猫眼电影')
  },
  components: {
    NavBar,
    TopBar
  },
  computed: {
    ...mapState(['city'])
  },
  activated () {
    document.cookie = `ci=${this.city.id}%2C${encodeURI(this.city.nm)}`
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
