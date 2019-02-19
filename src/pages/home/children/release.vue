<template>
  <section class="inner">
    <div class="most-expected">
      <p class="title">近期最受期待</p>
      <div class="most-expected-wrapper">
        <ul
          class="most-expected-list"
          v-infinite-scroll="loadMoreMostExpected"
          infinite-scroll-disabled="expectLoding"
          infinite-scroll-distance="30"
        >
          <li class="movie-item" v-for="(item, key) in expectList" :key="key">
            <div class="poster">
              <img :src="item.img" onerror="this.style.visibility='hidden'">
            </div>
            <h5 class="title">{{item.nm}}</h5>
            <p class="date">{{item.comingTitle}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="comming-group"
      v-infinite-scroll="loadMoreComingList"
      infinite-scroll-disabled="comingLoding"
      infinite-scroll-distance="0"
    >
      <div class="movie-group" v-for="(item) in comingList" :key="item.comingTitle">
        <p class="group-date">{{item.comingTitle}}</p>
        <router-link  v-for="movie in item.data" :key="movie.id" 
        :to="'movie' + movie,id">
          <Thumbnail
          :movie="movie"
          />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Thumbnail from "@/components/thumbnail";
import { getMostExpected, getComingListAction} from "@/api";
import { setImgSize, getDataByAction } from "@/util";

export default {
  name: "Coming",
  data() {
    return {
      comingList: {},
      expectList: [],
      expectedConfig: {
        ci: 80,
        limit: 10,
        offset: 0,
        token: "",
        total: 0,
        hasMore: true
      },
      comingConfig: {
        ci: 180,
        token: "",
        limit: 10,
        offset: 0,
        total: 0,
        movieIds: []
      }
    };
  },
  components: {
    Thumbnail
  },
  created() {
  },
  methods: {
    loadMoreMostExpected() {
      this.expectLoding = true;
      const expectedConfig = this.expectedConfig;
      const { hasMore, total, ...params } = expectedConfig;
      if (!hasMore) return;
      getMostExpected({ params }).then(data => {
        const { coming, paging } = data;
        expectedConfig.total = paging.total;
        expectedConfig.hasMore = paging.hasMore;
        expectedConfig.offset += coming.length;
        const expectList = setImgSize(coming, "170.230");
        this.expectList.push(...expectList);
        this.expectLoding = false;
      });
    },
    loadMoreComingList() {
      this.comingLoding = true
      const comingConfig = this.comingConfig;
      const { offset, total, movieIds, limit, ...params } = comingConfig
      const isFirst = offset === 0
      const getList = getComingListAction(isFirst)
      if (offset && offset >= total) return
      const query_movieIds = movieIds.slice(offset, limit + offset).join()
      getList({
        params: {movieIds: query_movieIds ,...params, limit}
      }).then(data => {
        const {coming, movieIds} = data
        if (movieIds) {
          comingConfig.movieIds = movieIds.flat()
          comingConfig.total = movieIds.length
        }
        return coming
      }).then(list => {
        comingConfig.offset += list.length
        const cominglist = setImgSize(list)
        console.log(list)
        this.divideList(cominglist)
        this.comingLoding = false
      })
    },
    divideList (list) {
      list.forEach(item => {
        const rt = item.rt
        if (!this.comingList[rt]) {
          this.$set(this.comingList, rt, {
            comingTitle:  item.comingTitle,
            data: []
          })
        }
        const data = this.comingList[rt].data
        this.$set(this.comingList[rt], 'data', [...data, item])
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "./release.scss";
</style>
