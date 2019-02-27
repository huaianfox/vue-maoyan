<template>
  <div class="result-wrapper">
    <h3 class="title">电影/电视剧/综艺</h3>
    <div class="list">
      <div class="movie">
        <img class="poster"
             src="https://p0.meituan.net/128.180/movie/c525acba463b7c404f4ea5810c67b94e126465.jpg"
             alt="">
        <div class="info">
          <h4 class="name ellipsis">心理测量者SS1：罪与罚</h4>
          <h4 class="ename ellipsis">PSYCHO-PASS サイコパス Sinners of the System Case.1「罪と罰」</h4>
          <p class="cate ellipsis">动作,动画,犯罪</p>
          <p class="release">2019-01-25</p>
        </div>
        <div class="aside-info">
          <div class="score">暂无信息</div>
          <div class="btn sale">
            购票
          </div>
        </div>
      </div>
    </div>
    <div class="more-result">查看全部1633部影视剧</div>
  </div>
</template>

<script >
export default {
  computed: {
  },
  props: {
    result: Object,
    type: Number
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
.result-wrapper {
  margin-bottom: 10px;
  background-color: #fff;
  .title {
    font-size: 15px;
    color: #999;
    padding: 9px 15px;
  }
  .list {
    padding-left: 15px;
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
      max-width: 200px;
      flex: 1;
      margin: 1px 0 0 15px;
      .name {
        max-height: 24px;
      }
      .ename {
        font-size: 13px;
        color: #666;
        margin-top: 2px;
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
  }
  .btn {
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    width: 48px;
    margin-top: 12px;
    text-align: center;
    height: 27px;
    line-height: 27px;
  }
  .sale {
    background-color: #ef4238;
  }
  .more-result {
    text-align: center;
    line-height: 44px;
    height: 44px;
    font-size: 15px;
  }
}
</style>
