<template>
  <section class="inner">
    <movie-list :path='path'
          :list='movieList' />
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </section>
</template>

<script>
import MovieList from '../components/movie-list'
import { getInfoListAction } from '@/api'
import { setImgSize } from '@/util'

export default {
  name: 'Hot',
  data () {
    return {
      path: 'cinema/movie/',
      movieList: [],
      movieIds: [],
      params: {
        token: ''
      },
      offset: 0,
      limit: 12,
      total: 0
    }
  },
  props: {
    msg: String
  },
  components: {
    MovieList
  },
  methods: {
    infiniteHandler ($state) {
      const { offset, limit, total } = this
      const isFirst = offset === 0
      if (offset && offset > total) return
      const movieIds = this.movieIds
        .slice(offset, offset + limit)
        .join()
      const params = { params: { ...this.params, movieIds } }
      const getMovieInfoList = getInfoListAction(isFirst)
      getMovieInfoList(params).then(data => {
        const { movieIds, movieList, coming, total } = data
        if (movieIds) {
          this.movieIds = movieIds
          this.total = total
          return movieList
        }
        return coming
      }).then(data => {
        if (data.length) {
          this.offset += data.length
          this.movieList.push(...setImgSize(data))
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../../scss/fn.scss';
.inner {
  padding: 0 15px;
  background: #fff;
}
</style>
