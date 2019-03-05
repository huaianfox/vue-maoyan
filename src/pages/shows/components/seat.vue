<template>
  <div class="seat">
    <nav class="dates-wrap">
      <ul class="dates">
        <li class="date-item"
            v-for="(item, index) in list"
            :key="item.showDate"
            @click="switchDate(index)"
            :class="{active: currentIndex === index}">
          <span class="date-title">{{item.dateShow}}</span>
        </li>
      </ul>
    </nav>
    <slot name="vip-tips" />
    <ul v-if="showList.length"
        class="seat-list">
      <li class="seat-item"
          v-for="item in showList"
          :key="item.seqNo">
        <div class="tag-wrapper"
             v-if="item.zeroFlag">
          <div class="zeroFlag">{{item.zeroFlag}}</div>
        </div>
        <div class="item-content">
          <div class="time">
            <div class="begin">{{item.tm}}</div>
            <div class="end">{{item.end}} 散场</div>
          </div>
          <div class="info">
            <div class="lan">{{item.lang + item.tp}}</div>
            <div class="hall">{{item.th}}</div>
          </div>
          <div class="price">
            <div class="sell">￥{{item.vipPrice}}
              <!-- <span class="stonefont"
                    v-html="item.sellPr"></span> -->
            </div>
            <div class="vipPrice"
                 v-if="item.vipPriceName">
              <span class="icon">{{item.vipPriceName}}</span>
              <span class="num">￥{{item.vipPrice}}</span>
            </div>
            <div class="extraDesc"
                 v-if="item.extraDesc">{{item.extraDesc}}</div>
          </div>
          <div class="buy">
            <div class="buy-btn">购票</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="no-seat"
         v-if="!showList.length">
      <div class="icon"></div>
      <div class="text">{{notes}}</div>
      <div v-if="nextDate"
           class="next-date"
           @click="switchDate(currentIndex + 1)">点击查看{{nextDate}}场次</div>
    </div>
  </div>
</template>

<script >
export default {
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showList () {
      const dur = this.info.dur
      const shows = this.list[this.currentIndex]
      const plist = shows ? shows.plist.map(item => {
        const start = item.dt.replace('-', '//') + ' ' + item.tm
        const times = +new Date(start) + dur * 60 * 1000
        const date = new Date(times)
        return { ...item, end: `${date.getHours()}:${date.getMinutes()}` }
      }) : []
      return plist
    },
    list () {
      return this.info.shows || []
    },
    nextDate () {
      const shows = this.list[this.currentIndex + 1]
      return shows ? shows.showDate : ''
    },
    notes () {
      return this.info.globalReleased ? '今日场次已映完' : '影片未上映'
    }
  },
  methods: {
    switchDate (index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped lang="scss">
.seat {
  margin-top: 1px;
  background: #fff;
}
.dates-wrap {
  position: relative;
  height: 45px;
  overflow: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  .dates {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -20px;
    padding-bottom: 20px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .date-item {
      display: inline-block;
      margin-left: 30px;
      line-height: 45px;
      height: 45px;
      text-align: center;
      font-size: 14px;
      color: #666;
      position: relative;
      &.active {
        color: #f03d37;

        &:after {
          content: '';
          position: absolute;
          width: 110%;
          height: 2px;
          bottom: 0;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          background-color: #f03d37;
        }
      }
      &:last-child {
        margin-right: 15px;
      }
    }
    .date-title {
      line-height: 45px;
      height: 45px;
      text-align: center;
      font-size: 14px;
    }
  }
}

.seat-list {
  .seat-item {
    padding: 17px 0;
    margin-left: 12.5px;
    border-top: 1px solid #f2f2f2;
  }
  .tag-wrapper {
    margin: -12px 0 2px;
    .zeroFlag {
      color: #fff;
      display: inline-block;
      padding: 0 3px;
      height: 15px;
      line-height: 15px;
      font-size: 12px;
      border-radius: 2px;
      transform: scale(0.8);
      transform-origin: left;
      background-color: #a3cfd9;
    }
  }
  .item-content {
    display: flex;
    padding-right: 12.5px;
    .time {
      .begin {
        font-size: 20px;
        color: #333;
        line-height: 1;
        white-space: nowrap;
      }
      .end {
        margin-top: 10px;
        color: #999;
        font-size: 11px;
        line-height: 1;
        white-space: nowrap;
      }
    }

    .info {
      margin-left: 17px;
      flex: 1;
      .lan {
        margin-top: 2px;
        line-height: 18px;
        font-size: 13px;
        color: #333;
        white-space: normal;
      }
      .hall {
        margin-top: 10px;
        font-size: 11px;
        color: #999;
        white-space: normal;
      }
    }
  }
  .price {
    flex: 0 1 auto;
    width: 150px;
    margin-left: 5px;
    .sell {
      display: inline-block;
      line-height: 1;
      color: #f03d37;
      margin-top: 1px;
      font-size: 19px;
      .stonefont {
        font-family: 'stonefont';
      }
    }
    .vipPrice {
      display: inline-block;
      margin-left: 4px;
      line-height: 15px;
      height: 15px;
      transform: scale(0.8);
      transform-origin: left;
      margin-right: -16px;
      border: 1px solid #ff9000;
      border-radius: 2px;
      font-size: 12px;
      .icon {
        display: inline-block;
        padding: 0 2px;
        color: #fff;
        background-color: #f90;
      }
      .num {
        color: #f90;
        background-color: #fff;
      }
    }
    .extraDesc {
      margin-top: 10px;
      display: block;
      font-size: 11px;
      color: #999;
    }
  }
  .buy {
    width: 45px;
    margin-left: 2px;
    position: relative;
    .buy-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: 27px;
      line-height: 28px;
      font-size: 12px;
      background-color: #f03d37;
      color: #fff;
      border-radius: 4px;
      text-align: center;
    }
  }
}
.no-seat {
  padding: 40px 0 60px;
  background: #f0f0f0;
  text-align: center;
  .text {
    margin-top: 12px;
    line-height: 1;
    font-size: 16px;
    color: #acacac;
  }
  .next-date {
    margin: 20px auto 0;
    border-radius: 5px;
    width: 170px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #f03d37;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: #fff;
    text-align: center;
  }
  .icon {
    display: block;
    margin: 0 auto;
    width: 77px;
    height: 71px;
    background-size: cover;
    background-image: url(data:image/png;base64,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);
  }
}
</style>
