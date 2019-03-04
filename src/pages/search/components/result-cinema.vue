<template>
  <Panel title="影院"
         :tips="tips">
    <div class="list"
         slot="result">
      <div class="cinema"
           v-for="item in result.list"
           :key="item.id">

        <div class="info">
          <p class="name-price ellipsis">
            <span class="ellipsis">{{item.nm}}</span>
            <span class="sell-price">
              <span class="price">{{item.sellPrice}}</span>元起
            </span>
          </p>
          <p class="address ellipsis">{{item.addr}}</p>
          <p class="feature-tags">
            <span>座</span>
            <span v-if="item.allowRefund">退</span>
            <span v-if="item.endorse">改签</span>
            <span class="featrue" v-if="item.snack">小吃</span>
            <span class="featrue"
                  v-if="item.vipDesc">折扣卡</span>
          </p>
        </div>
        <div class="distance">{{item.distance}}</div>
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
      return total > this.max ? `查看全部${total}家电影院` : ''
    }
  },
  props: {
    result: Object,
    max: Number
  },
  components: {
    Panel
  }
}
</script>

<style scoped lang="scss">
.list {
  flex: 1;
  border-top: 1px solid #e6e6e6;
  .cinema {
    display: flex;
    padding: 15px 15px 15px 0;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
  }
  .info {
    margin: 1px 0 0 15px;
    font-size: 16px;
    color: #000;
    margin-bottom: 6px;
    overflow: hidden;

    .name-price {
      display: flex;
      font-size: 16px;
      color: #000;
      margin-bottom: 6px;
    }
    .sell-price {
      font-size: 11px;
      color: #999;
      white-space: nowrap;
      margin-left: 10px;
    }
    .price {
      font-size: 17px;
      color: #ef4238;
    }
  }
  .address {
    font-size: 13px;
    color: #999;
  }
  .distance {
    font-size: 13px;
    color: #999;
  }
}
.feature-tags {
  margin-top: 7px;
  span {
    border: 1px solid #589daf;
    color: #589daf;
    position: relative;
    display: inline-block;
    padding: 0 3px;
    height: 15px;
    line-height: 15px;
    border-radius: 2px;
    font-size: 12px;
    margin: 0 2px;
  }
  .featrue {
    color: #f90;
    border-color: #f90;
  }
}
</style>
