<template>
  <div class="page">
    <Navbar :title="detail.nm"/>
    <MovieDetail :detail="detail" :link="link"/>
    <Descp :detail="detail"/>
  </div>
</template>

<script >
import MovieDetail from '@/components/movieDetail'
import Navbar from '@/components/navbar'
import { getMovieDetail } from '@/api'
import Descp from './desc'

export default {
  data () {
    return {
      detail: {},
      link: false
    }
  },
  created () {
    const movieId = +this.$route.params.id
    getMovieDetail({ params: { movieId } }).then(data => {
      this.detail = data.detailMovie
    })
  },
  components: {
    Navbar,
    MovieDetail,
    Descp
  }
}
</script>

<style scoped lang="scss">
.page {
  background: #f4f4f4;
}
</style>
