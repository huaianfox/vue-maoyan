<template>
  <div class="thumb">
    <div class="avatar">
      <img :src="movie.img" alt="">
    </div>
    <div class="info">
      <div class="movie-title">
        <span class='name'>{{movie.nm}}</span>
        <span class='version' :class="version[movie.version]"></span>
      </div>
      <div v-if="movie.globalReleased" class="movie-vote ellipsis">观众评{{movie.sc}}</div>
      <div v-else class="movie-wantsee ellipsis">
        <span class='person'>{{movie.wish}}</span> 人想看</div>
      <div class="movie-actor ellipsis">主演：{{movie.star}}</div>
      <div class="movie-show ellipsis">{{movie.showInfo}}</div>
    </div>
    <div class="buy-action">
      <div class='sell' :class='action.tag'
      >
      {{action.act}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Thumbnail',
  data () {
    return {
      version: ['v3d-imax', '3d', 'v2d-imax'],
      status: {
        1: {tag: 'wantsee', act: '想看'},
        3: {tag: '', act: '购票'},
        4: {tag: 'presell', act: '预售'},
      }
    }
  },
  props: {
    movie: {
      type: Object
    }
  },
  computed: {
    action () {
      return this.status[this.movie.showst]
    }
  },
  methods: {
    jump (item) {
      this.$router.push({
        name: 'cinema_movie',
        params: {
          id: item.id
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import './index.scss';
</style>
