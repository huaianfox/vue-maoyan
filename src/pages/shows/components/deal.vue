<template>
  <section class="deal">
    <header class="title">影院超值套餐</header>
    <div class="deal-item"
         v-for="item in list"
         :key="item.title">
      <img :src="item.imageUrl | format"
           alt="">
      <span class="tag"
            :class="item.cardTagType"
            v-if="item.cardTag">{{item.cardTag}}</span>
      <div class="item-info">
        <p class="detal-item-title">{{item.title}}</p>
        <p class="sell-num">{{item.curNumberDesc}}</p>
        <p class="buy">
          <router-link class="buy-link"
                       to="/buy"> 去购买</router-link>
        </p>
        <p class="price">￥<span class="num">{{item.price}}</span></p>
      </div>
    </div>
  </section>
</template>

<script >
import { getImg } from '@/util'

export default {
  data () {
    return {
      tags: {
        1: 'new'
      }
    }
  },
  props: {
    list: Array
  },
  filters: {
    format (value) {
      if (!value) return ''
      return getImg('92.92')(value)
    },
    formatTag (value) {
      if (!value) return ''
      return this.tags[value]
    }
  },
  methods: {
    getImg (img) {
      return getImg('92*92')(img)
    }
  }
}
</script>

<style scoped lang="scss">
.deal {
  margin-top: 20px;
  padding-left: 15px;
  background: #fff;
  .title {
    line-height: 45px;
    height: 45px;
    font-size: 15px;
    color: #666;
  }
  .deal-item {
    cursor: pointer;
    position: relative;
    width: 100%;
    padding: 13px 0;
    overflow: hidden;
    border-top: 1px solid #f2f2f2;
    img {
      display: inline-block;
      width: 92px;
      height: 92px;
      float: left;
    }
  }
  .item-info {
    position: relative;
    margin: 0 15px 0 102px;
    height: 92px;
    overflow: hidden;
  }
  .detal-item-title {
    margin-bottom: 10px;
    height: 36px;
    font-size: 14px;
    line-height: 18px;
    color: #333;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .sell-num {
    text-align: right;
    line-height: 16px;
    height: 16px;
    font-size: 12px;
    color: #999;
  }
  .buy {
    text-align: right;
    .buy-link {
      margin-top: 5px;
      display: inline-block;
      padding: 0 8px;
      height: 27px;
      line-height: 27px;
      font-size: 12px;
      border-radius: 3px;
      color: #fff;
      background-color: #f03d37;
    }
  }
  .price {
    position: absolute;
    bottom: 0;
    left: 0;
    color: #f03d37;
    display: inline-block;
    font-size: 14px;
    .num {
      font-size: 17px;
    }
  }
  .tag {
    position: absolute;
    left: 0;
    top: 13px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    background-color: #fa5939;
    font-size: 12px;
    padding: 0 5px;
    color: #fff;
    border-bottom-right-radius: 2px;
    &.new {
      background-color: #0ac1ae;
    }
  }
}
</style>
