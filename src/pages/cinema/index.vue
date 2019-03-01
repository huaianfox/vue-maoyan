<template>
  <div class="panel">
    <NavBar title="影院" />
    <TopBar />
    <SelectPanel class="select-wrapper"
                 :filters="filters" />
    <section class="list">
      <NoData v-if="empty"
              title="暂无符合条件的影院"></NoData>
      <CinemaList class="cinemas"
                  :cinemaList="cinemas" />
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </section>
  </div>
</template>

<script>
import TopBar from './top'
import NavBar from '@/components/navbar/fixed'
import SelectPanel from '@/components/selectPanel'
import CinemaList from '@/components/cinemaList'
import NoData from '@/components/no-data'
import { getFilterCinemas } from '@/api'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Cinema',
  data () {
    return {
      filters: {}
    }
  },
  computed: {
    ...mapState(['cinemas']),
    empty () {
      const { cinemas } = this
      return cinemas ? !cinemas.length : false
    }
  },
  methods: {
    ...mapActions(['getCinemaList']),
    ...mapMutations(['changeFilter']),
    infiniteHandler ($state) {
      this.getCinemaList().then(data => {
        const { paging } = data
        if (paging.total === 0) {
          console.log('this')
          this.empty = true
        }
        if (paging.hasMore) {
          this.changeFilter({
            offset: paging.offset + paging.limit
          })
          $state.loaded()
        } else {
          $state.complete()
        }
      })
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
    CinemaList,
    NoData
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.panel {
  min-height: 80%;
}
.list {
  padding-top: 84px;
  min-height: 100%;
}
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
</style>
