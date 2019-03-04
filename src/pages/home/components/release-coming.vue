<template>
  <div class="comming-group">
    <div class="movie-group"
         v-for="item in comingList"
         :key="item.comingTitle">
      <p class="group-date">{{item.comingTitle}}</p>
      <div class="list-wrap">
        <movie-list :path='path'
                    :list='item.data' />
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more">哦，没有更多电影了</div>
    </infinite-loading>
  </div>
</template>

<script >
import MovieList from './movie-list'
import { getComingListAction } from '@/api'
import { setImgSize } from '@/util'
export default {
  data () {
    return {
      path: 'movie/',
      comingList: {},
      comingConfig: {
        ci: 180,
        token: '',
        limit: 10,
        offset: 0,
        total: 0,
        movieIds: []
      }
    }
  },
  methods: {
    infiniteHandler ($state) {
      const comingConfig = this.comingConfig
      const { offset, total, movieIds, limit, ...params } = comingConfig
      const isFirst = offset === 0
      const getList = getComingListAction(isFirst)
      if (offset && offset >= total) return
      const queryMovieIds = movieIds.slice(offset, limit + offset).join()

      getList({
        params: { movieIds: queryMovieIds, ...params, limit }
      }).then(data => {
        const { coming, movieIds } = data
        if (movieIds) {
          comingConfig.movieIds = movieIds.flat()
          comingConfig.total = movieIds.length
        }
        return coming
      }).then(list => {
        if (list.length) {
          comingConfig.offset += list.length
          const cominglist = setImgSize(list)
          this.divideList(cominglist)
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
    divideList (list) {
      list.forEach(item => {
        const rt = item.rt
        if (!this.comingList[rt]) {
          this.$set(this.comingList, rt, {
            comingTitle: item.comingTitle,
            data: []
          })
        }
        const data = this.comingList[rt].data
        this.$set(this.comingList[rt], 'data', [...data, item])
      })
    }
  },
  components: {
    MovieList
  }
}
</script>

<style scoped lang="scss">
.comming-group {
  padding: 0 15px 0;
  background: #fff;
  .movie-group {
    margin: 20px 0;
  }
}

.comingList {
  padding-left: 15px;
  padding-top: 10px;
  background: #fff;
  .group-date {
    padding-top: 10px;
  }
}
</style>
