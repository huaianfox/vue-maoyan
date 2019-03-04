<template>
  <ul>
    <router-link tag="li"
                 :to="path + item.id"
                 v-for="(item, index) in list"
                 :key="index">
      <movie-item :movie="item">
        <div class="movie-item-info"
             slot="movie-info">
          <div v-if="item.globalReleased"
               class="line movie-vote ellipsis">观众评 <span class="grade">{{item.sc}}</span> </div>
          <div v-else
               class="line movie-wantsee ellipsis">
            <span class='person'>{{item.wish}}</span> 人想看</div>
          <div class="line movie-actor ellipsis">主演：{{item.star}}</div>
          <div class=" line movie-show ellipsis">{{item.showInfo || `${item.rt} 上映`}}</div>
        </div>
      </movie-item>

    </router-link>
  </ul>
</template>

<script >
import MovieItem from '@/components/movie-item'
export default {
  props: {
    path: String,
    list: Array
  },
  components: {
    MovieItem
  }
}
</script>

<style scoped lang='scss'>
.movie-item-info {
  overflow: hidden;
  .line {
    margin-top: 7px;
    font-size: 13px;
    color: #666;
  }
  .movie-vote {
    margin-top: 10px;
  }
  .grade,
  .person {
    font-weight: 700;
    color: #faaf00;
    font-size: 15px;
  }
}
</style>
