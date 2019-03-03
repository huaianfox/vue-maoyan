<template>
  <div class="most-expected">
    <p class="title">近期最受期待</p>
    <div class="most-expected-wrapper"
         v-show="expectList.length">
      <ul class="most-expected-list"
          v-infinite-scroll="loadMoreMostExpected"
          infinite-scroll-disabled="expectLoding"
          infinite-scroll-distance="20">
        <router-link class="movie-item"
                     tag="li"
                     v-for="(item, key) in expectList"
                     :to="'movie/' + item.id"
                     :key="key">
          <div class="poster">
            <img class="img"
                 :src="item.img"
                 onerror="this.style.visibility='hidden'" />
            <span class="wish">{{item.wish}} 人想看</span>
          </div>
          <h5 class="title">{{item.nm}}</h5>
          <p class="date">{{item.comingTitle}}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script >
import { getMostExpected } from '@/api'
import { setImgSize } from '@/util'
export default {
  name: 'relaese-expect',
  data () {
    return {
      expectLoding: false,
      expectList: [],
      expectedConfig: {
        ci: 80,
        limit: 10,
        offset: 0,
        token: '',
        total: 0,
        hasMore: true
      }
    }
  },
  methods: {
    loadMoreMostExpected () {
      const expectedConfig = this.expectedConfig
      const { hasMore, total, ...params } = expectedConfig
      if (!hasMore) {
        this.expectLoding = false
        return
      }
      getMostExpected({ params }).then(data => {
        const { coming, paging } = data
        expectedConfig.total = paging.total
        expectedConfig.hasMore = paging.hasMore
        expectedConfig.offset += coming.length
        const expectList = setImgSize(coming, '170.230')
        this.expectList.push(...expectList)
        this.expectLoding = false
      })
    },
  }
}
</script>

<style scoped lang="scss">
.most-expected-wrapper {
  height: 150px;
  overflow: hidden;
}
.most-expected {
  padding: 12px 0 12px 15px;
  margin-bottom: 10px;
  background: #fff;
  .title {
    margin: 0 0 12px;
    font-size: 14px;
    color: #333;
  }
  .poster {
    width: 85px;
    height: 115px;
    position: relative;
    margin-bottom: 6px;
    img {
      height: 100%;
      vertical-align: middle;
    }
    .wish {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 3px 0;
      width: 100%;
      color: #faaf00;
      font-size: 11px;
      text-align: center;
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .most-expected-list {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
}

.most-expected-list {
  .movie-item {
    display: inline-block;
    width: 85px;
    overflow: hidden;
    margin-right: 10px;
  }
  .title {
    margin: 0 0 3px;
    font-size: 13px;
    color: #222;
  }
  .date {
    margin: 0;
    font-size: 12px;
    color: #999;
  }
  img {
    width: 100%;
  }
}
</style>
