<template>
  <div class="panel">
    <TopBar />
    <SelectPanel class="select-wrapper" />
    <CinemaList class="cinemas" />
  </div>
</template>

<script>
import TopBar from './top'
import SelectPanel from '@/components/selectPanel'
import CinemaList from '@/components/cinemaList'

export default {
  name: 'Cinema',
  created () {
    this.$store.commit('changePageTitle', '影院')
  },
  components: {
    TopBar,
    SelectPanel,
    CinemaList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.select-wrapper {
  position: fixed;
  top: 94px;
  left: 0;
}
.panel {
  padding-top: 50px;
  padding-bottom: 50px;
  background: #fff;
}
.cinemas {
  padding-top: 84px;
}
</style>