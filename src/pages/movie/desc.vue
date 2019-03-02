<template>
  <div class="desc">
    <router-link class="buy-link"
                 :to="'/cinema/movie/'+ detail.id">特惠购票</router-link>
    <div class="text"
         :class="{'text-ellipsis': shrink}">{{detail.dra}}</div>
    <div @click="shrink=!shrink"
         class="text-expander-button iconfont icon-back"
         :class="{down: shrink}"></div>
  </div>
</template>

<script >

export default {
  data () {
    return {
      shrink: true
    }
  },
  props: {
    detail: Object
  },
  created () {
    this.id = this.$route.params.id
  }
}
</script>

<style scoped lang="scss">
.desc {
  padding: 0 15px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
  margin: 8px 0;
  .buy-link {
    display: block;
    margin-bottom: 10px;
    height: 36px;
    line-height: 36px;
    background: #e54847;
    text-align: center;
    color: #fff;
    border-radius: 5px;
  }
  .text-ellipsis {
    overflow: hidden;
    display: -webkit-box； -webkit-box-orient;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    max-height: 58px;
  }
  .text {
    font-size: 14px;
    color: #555;
    line-height: 20px;
  }
  .text-expander-button {
    margin: 0 auto;
    padding: 10px 0;
    font-size: 16px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    text-align: center;
    &.iconfont {
      display: block;
      transform: rotate(-90deg);
      &.down {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
