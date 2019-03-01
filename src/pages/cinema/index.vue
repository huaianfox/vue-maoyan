<template>
  <div class="panel">
    <NavBar title="影院" />
    <TopBar />
    <SelectPanel class="select-wrapper" :filters="filters"/>
    <CinemaList class="cinemas" />
  </div>
</template>

<script>
import TopBar from './top'
import NavBar from '@/components/navbar/fixed'
import SelectPanel from '@/components/selectPanel'
import CinemaList from '@/components/cinemaList'
import { getFilterCinemas } from '@/api'

export default {
  name: 'Cinema',
  data () {
    return {
      filters: {}
    }
  },
  created () {
    getFilterCinemas({ params: { ci: 10 } }).then(data => {
      this.filters = data
    })
  },
  components: {
    NavBar,
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
