<template>
  <div class="page">
    <Navbar :title="detail.nm" />
    <MovieDetail v-show="detail.nm"
                 :detail="detail" />
    <div class="choose"
         ref="fixedConetnt"
         :class="{fixed: isFixed}">
      <Date :dates="dates" />
      <SelectPanel :filters="filters" />
    </div>
    <CinemaList :cinemaList="cinemas" />
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
import CinemaList from '@/components/cinemaList'
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      movieId: 0,
      filters: {},
      dates: [],
      detail: {},
      offsetHeight: 0,
      isFixed: false,
      handleThottle: null,
      cinemaList: []
    }
  },
  computed: {
    ...mapState(['cinemas', 'city'])
  },
  methods: {
    ...mapActions(['postMovie']),
    infiniteHandler ($state) {
      // $state.complete()
      // $state.loaded()
      // this.getCinemaListHandle({})
    },
    handleScroll () {
      const top = document.documentElement.scrollTop
      this.isFixed = top > this.offsetHeight
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

    this.postMovie({ movieId, updateShowDay: true, cityId: this.city.id }).then(data => {
      this.dates = data.showDays.dates || []
    })
  },
  components: {
    Navbar,
    MovieDetail,
    Date,
    SelectPanel,
    CinemaList
  }
}
</script>

<style scoped lang="scss">
.choose {
  background: #fff;
  z-index: 999;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
