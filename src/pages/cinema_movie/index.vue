<template>
  <div class="page"
       :class="{fixed50: changeSelect}">
    <Navbar :title="detail.nm" />
    <MovieDetail v-show="detail.nm"
                 :detail="detail">
      <span v-if="detail.globalReleased"
            slot="movie-score"
            class="num">{{detail.sc}}</span>
    </MovieDetail>
    <div class="choose"
         ref="fixedConetnt"
         :class="{fixed: isFixed}">
      <Date :dates="dates" />
      <SelectPanel :filters="filters"
                   v-if="filters.brand"
                   @change="changeSelection" />
    </div>
    <NoData v-if="loading && empty"></NoData>
    <div class="list">
      <cinema-item :cinema="item"
                   v-for="item in cinemas"
                   :key="item.id">
      </cinema-item>
    </div>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script >
import { getMovieDetail, getFilterCinemas } from '@/api'
import { getDay } from '@/util/date'
import Navbar from '@/components/navbar'
import MovieDetail from '@/components/movieDetail'
import Date from './components/date'
import SelectPanel from '@/components/selectPanel'
import NoData from '@/components/no-data'
import CinemaItem from '@/components/cinema-item'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      movieId: 0,
      filters: {},
      dates: [],
      detail: {},
      offsetHeight: 0,
      isFixed: false,
      handleThottle: null,
      cinemaList: [],
      changeSelect: ''
    }
  },
  computed: {
    ...mapState(['cinemas', 'city']),
    empty () {
      const list = this.cinemas || []
      return !list.length
    }
  },
  methods: {
    ...mapActions(['postMovie']),
    ...mapMutations(['changeFilter', 'emptyCinemaList', 'resetFilter']),
    infiniteHandler ($state) {
      this.loading && this.postMovie({ movieId: this.movieId, updateShowDay: true, cityId: this.city.id }).then(data => {
        const { paging } = data
        this.loading = true
        if (!this.dates.length) {
          this.dates = data.showDays.dates
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
      this.loading = false
    },
    handleScroll () {
      const top = document.documentElement.scrollTop
      this.isFixed = top > this.offsetHeight
    },
    changeSelection (name) {
      this.changeSelect = name
    }
  },
  mounted () {
    this.offsetHeight = this.$refs['fixedConetnt'].offsetTop
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    const movieId = +this.$route.params.id
    this.movieId = movieId
    getMovieDetail({ params: { movieId } }).then(data => {
      this.detail = data.detailMovie
    })

    window.addEventListener('scroll', this.handleScroll)
    const day = getDay()
    getFilterCinemas({
      params: {
        movieId,
        day
      }
    }).then(data => {
      this.filters = data
    })
  },
  destroyed () {
    this.resetFilter()
    this.emptyCinemaList()
  },
  components: {
    Navbar,
    MovieDetail,
    Date,
    SelectPanel,
    NoData,
    CinemaItem
  }
}
</script>

<style scoped lang="scss">
.choose {
  background: #fff;
  z-index: 999;
}
.fixed50 {
  height: 100%;
  overflow: hidden;

  .choose {
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
  }
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
