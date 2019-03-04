<template>
  <div class="result-history">
    <div class="history-item"
         v-for="(item, key) in history.data"
         :key="item+key">
      <div class="iconfont icon-time"></div>
      <div class="word ellipsis"
           @click="handleSearch(item)">{{item}}</div>
      <div class="del iconfont icon-delete"
           @click="handleDel(key)"></div>
    </div>
    <div class="hot"
         v-if="hot">
      <p class="word">热门搜索</p>
    </div>
  </div>
</template>

<script >
import { mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  props: {
    history: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    hot () {
      return this.history.type === 'movies'
    }
  },
  methods: {
    ...mapMutations(['updateSearchHistory']),
    handleSearch (val) {
      this.$emit('trigerSearch', val)
    },
    handleDel (index) {
      const data = this.history.data.slice()
      data.splice(index, 1)
      this.updateSearchHistory({
        type: this.history.type,
        data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.result-history {
  padding-left: 15px;
  background: #fff;
  .hot {
    padding: 0 0 8px 15px;
    background-color: #fff;
    top: -1px;
    .word {
      padding: 17px 0 15px;
      font-size: 15px;
      color: #666;
    }
  }
}
.history-item {
  display: -webkit-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
  line-height: 44px;
  align-items: center;
  .word {
    padding: 0 10px;
    color: #333;
    font-size: 15px;
    flex: 1 1 auto;
    display: inline-block;
  }
  .iconfont {
    width: 40px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #888;
  }
}
</style>
