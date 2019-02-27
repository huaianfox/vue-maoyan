<template>
  <div class="page">
    <Navbar :title="detailMovie.nm" />
    <MovieDetail />
    <div class="choose"
         ref="fixedConetnt"
         :class="{fixed: isFixed}">
      <Date />
      <SelectPanel />
    </div>
    <CinemaList :movieId="movieId" />
    <infinite-loading>
      <div slot="no-results">No results message</div>
    </infinite-loading>
  </div>
</template>

<script >
import { getMovieDetail, getFilterCinema, postMovie } from '@/api'
import { getDay } from '@/util/date'
import Navbar from '@/components/navbar'
import MovieDetail from '@/components/movieDetail'
import Date from './components/date'
import SelectPanel from '@/components/selectPanel'
import CinemaList from '@/components/cinemaList'

export default {
  data () {
    return {
      movieId: 0,
      detailMovie: {},
      offsetHeight: 0,
      isFixed: false,
      handleThottle: null,
      cinemaList: []
    }
  },
  methods: {
    infiniteHandler ($state) {
      // $state.complete()
      // $state.loaded()
    },
    handleScroll () {
      const top = document.documentElement.scrollTop
      this.isFixed = top > this.offsetHeight
    }
  },
  mounted () {
    this.offsetHeight = this.$refs['fixedConetnt'].offsetTop
  },
  activated () {
    window.addEventListener('scroll', this.handleScroll)
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created () {
    const movieId = this.$route.params.id
    this.movieId = +movieId
    getMovieDetail({ params: { movieId } }).then(data => {
      this.detailMovie = data.detailMovie
    })
    const day = getDay()
    getFilterCinema({
      params: {
        movieId,
        day
      }
    }).then(data => {
      console.log(data)
    })
  },
  // activated () {
  //   const movieId = this.movieId
  //   postMovie({
  //     params: {
  //       forceUpdate: Date.now()
  //     },
  //     data: {
  //       movieId,
  //       day: getDay(),
  //       offset: 0,
  //       limit: 20,
  //       districtId: -1,
  //       lineId: -1,
  //       hallType: -1,
  //       brandId: -1,
  //       serviceId: -1,
  //       areaId: -1,
  //       stationId: -1,
  //       updateShowDay: true,
  //       reqId: 1551257222493,
  //       cityId: 10
  //     }
  //   }).then(data => {
  //     this.cinemaList = data.cinemas
  //   })
  // },
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
