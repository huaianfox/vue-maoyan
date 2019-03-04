<template>
  <div class="movie-item">
    <img v-lazy="img"
         class="img poster">
    <div class="info ellipsis">
      <h4 class="name ellipsis">
        {{movie.nm}}
        <span class="version"
              :class="movie.version"></span>
      </h4>
      <slot name="movie-info" />
    </div>
    <div class="movie-aside">
      <slot name="movie-aside-item" />
      <div class="btns"
           v-if="showst">
        <span class="btn"
              :class="showst.cls">{{showst.name}}</span>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  name: 'MovieItem',
  data () {
    return {
      show: {
        1: {
          name: '想看',
          cls: 'want'
        },
        3: {
          name: '购票',
          cls: 'buy'
        },
        4: {
          name: '预售',
          cls: 'pre'
        }
      }
    }
  },
  computed: {
    img () {
      return this.movie.img.replace('w.h', this.size)
    },
    showst () {
      const { show, movie } = this
      return show[movie.showst]
    }
  },
  props: {
    movie: Object,
    size: {
      type: String,
      default: '128.180'
    }
  }
}
</script>

<style scoped lang="scss">
.movie-item {
  display: flex;
  padding: 12px 0;
  min-height: 90px;
  border-bottom: 1px solid #e6e6e6;
  .poster {
    display: block;
    background-color: #eee;
    width: 64px;
    height: 90px;
    margin-right: 10px;
  }
  .name {
    margin-top: 2px;
    display: inline-block;
    max-height: 24px;
    color: #222;
    font-weight: 700;
    font-size: 17px;
  }
}
.info {
  flex: 1;
  overflow: hidden;
}

.movie-aside {
  margin-top: 4px;
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
    .pre {
      background-color: #3c9fe6;
    }
  }
}
</style>
