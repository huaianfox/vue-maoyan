<template>
  <Panel title="电影/电视剧/综艺"
         :tips="tips">
    <div class="list"
         slot="result">
      <div class="movie"
           v-for="item in result.list"
           :key="item.id">
        <img class="poster"
             :src=" item.img | formatImg"
             alt="">
        <div class="info">
          <h4 class="name line ellipsis">
            {{item.nm}}
            <span class='version' v-if="item.version" :class="item.version"></span>
          </h4>
          <h4 class="ename line ellipsis">{{item.enm}}</h4>
          <p class="cate ellipsis">{{item.cat}}</p>
          <p class="release line">{{item.pubDesc}}</p>
        </div>
        <div class="aside-info">
          <div class="wish"
               v-if="!item.globalReleased"><span class="num">{{item.wish}}</span> 人想看</div>
          <div class="score"
               v-if="item.globalReleased"><span class="num">{{item.sc}}</span> 分</div>
          <div class="btns">
            <span v-if="!item.globalReleased"
                  class="btn want">想看</span>
            <span v-if="item.showst===3"
                  class="buy btn">购票</span>
          </div>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script >
import Panel from './panel'
export default {
  computed: {
    tips () {
      const total = this.result.total || 0
      return total > this.max ? `查看全部${total}部影视剧` : ''
    }
  },
  props: {
    result: Object,
    max: Number
  },
  filters: {
    formatImg (img) {
      const ret = img || ''
      return ret.replace('w.h', '128.176')
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped lang="scss">
.list {
  padding: 0 15px;
  border-top: 1px solid #e6e6e6;
  .movie {
    display: flex;
    padding: 12px 0;
    min-height: 90px;
    border-bottom: 1px solid #e6e6e6;
  }
  .poster {
    display: block;
    background-color: #eee;
    width: 64px;
    height: 90px;
    margin-right: 10px;
  }
  .info {
    flex: 1;
    margin: 1px;
    overflow: hidden;
    .name {
      max-height: 24px;
    }
    .ename {
      font-size: 13px;
      color: #666;
      margin-top: 2px;
    }
    .cate {
      font-size: 13px;
      color: #666;
      margin-top: 2px;
    }
    .release {
      font-size: 12px;
    }
    .line {
      line-height: 1.8;
    }
  }
  .score {
    color: #fa0;
    font-size: 10px;
    flex-shrink: 0;
    padding-left: 5px;
    &.no-score {
      font-size: 14px;
      color: #666;
      flex-shrink: 0;
    }
  }
  .wish,
  .score {
    color: #fa0;
    font-size: 10px;
    flex-shrink: 0;
    padding-left: 5px;
  }
  .num {
    font-size: 16px;
  }
  .btns {
    margin-top: 15px;
    text-align: right;
    .btn {
      display: inline-block;
      width: 48px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border: none;
      color: #fff;
      font-size: 12px;
      border-radius: 5px;
    }
    .want {
      background-color: #faaf00;
    }
    .buy {
      background-color: #ef4238;
    }
  }
}
.more-result {
  text-align: center;
  line-height: 44px;
  height: 44px;
  font-size: 15px;
}
</style>
