<template>
  <BaseTopBar :styles="bg">
    <router-link
      to="search?searchtype=cinema&$from=canary"
      solt="search"
      class="movie-search iconfont icon-search"
    >
      搜索影院
    </router-link>
  </BaseTopBar>
</template>

<script >
import BaseTopBar from "@/components/topbar/base"

export default {
  data () {
    return {
      bg: {
        background: '#f5f5f5'
      }
    }
  },
  components: {
    BaseTopBar
  }
}
</script>

<style scoped lang="scss">
.movie-search {
  flex: 1;
  margin: 0 15px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  font-size: 14px;
  border: 0.5px solid #e6e6e6;
  background: #fff;
}
</style>
