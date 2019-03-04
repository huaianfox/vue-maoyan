<template>
  <Panel title="电影/电视剧/综艺"
         :tips="tips">
    <div class="list"
         slot="content">
      <router-link v-for="item in result.list" :to="'/movie/'+item.id"
                   :key="item.id">
        <movie-item :movie="item">
          <div class="movie-info-item"
               slot="movie-info">
            <h4 class="ename line ellipsis">{{item.enm}}</h4>
            <p class="cate ellipsis">{{item.cat}}</p>
            <p class="release line">{{item.pubDesc}}</p>
          </div>

          <div class="movie-aside-item"
               slot="movie-aside-item">
            <div class="wish"
                 v-if="item.showst === 1"><span class="num">{{item.wish}}</span> 人想看</div>
            <div class="score"
                 v-if="item.globalReleased">
              <span v-if="item.sc"><span class="num">{{item.sc}}</span> 分</span>
              <span v-if="!item.sc"
                    class="no-sc">暂无评分</span>
            </div>
          </div>
        </movie-item>
      </router-link>

    </div>
  </Panel>
</template>

<script >
import Panel from './panel'
import MovieItem from '@/components/movie-item'

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
    Panel,
    MovieItem
  }
}
</script>

<style scoped lang="scss">
.list {
  padding: 0 15px;
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
  .no-sc {
    font-size: 14px;
    color: #666;
    flex-shrink: 0;
  }
}
.more-result {
  text-align: center;
  line-height: 44px;
  height: 44px;
  font-size: 15px;
}
</style>
