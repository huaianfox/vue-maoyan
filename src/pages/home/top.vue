<template>
  <BaseTopBar>
    <div class="movie-switch">
      <div
        class="hot-item"
        v-for="(item,index) in tabs"
        :key="item.title"
        :class="item.path===$route.path? 'active': ''"
        @click="switchMoviePanel(item, index)"
      >{{item.title}}</div>
    </div>
    <router-link to="search?searchtype=movie&$from=canary" solt="search" class="movie-search iconfont icon-search"></router-link>
  </BaseTopBar>
</template>

<script >
import BaseTopBar from "@/components/topbar/base"

export default {
  data() {
    return {
      tabs: [
        {
          path: "/",
          title: "正在上映"
        },
        {
          path: "/release",
          title: "即将上映"
        }
      ]
    }
  },
  methods: {
    switchMoviePanel(item) {
      this.$router.push(item.path)
    }
  },
  components: {
    BaseTopBar
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/fn.scss";
.hot-item {
  display: inline-block;
  position: relative;
  font-size: 15px;
  color: #666;
  width: 80px;
  width: 21.33333vw;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
  &.active {
    color: #ef4238;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -1px;
      width: 80px;
      width: 21.33333vw;
      height: 2px;
      background-color: #ef4238;
      -webkit-transition: left 0.2s;
      transition: left 0.2s;
    }
  }
}
.movie-search {
  display: block;
  width: 45px;
  height: 40px;
  text-align: center;
  font-size: 24px;
  color: $themeColor;
}
</style>
