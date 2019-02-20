<template>
  <section class="inner"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="busy"
           infinite-scroll-distance="40">
    <router-link :to="'cinema/movie/'+ item.id"
                 v-for="(item, index) in movieList"
                 :key="index">
      <Thumbnail :movie="item" />
    </router-link>
  </section>
</template>

<script>
import Thumbnail from '@/components/thumbnail'
import { getInfoListAction } from '@/api'
import { setImgSize } from '@/util'

export default {
  name: 'Hot',
  data () {
    return {
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
    Thumbnail
  },
  methods: {
    loadMore () {
      this.busy = true
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
        this.offset += data.length
        this.movieList.push(...setImgSize(data))
        this.busy = false
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
