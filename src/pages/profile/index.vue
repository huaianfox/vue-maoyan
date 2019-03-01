<template>
  <div class="section">
    <NavBar title="个人中心" />
    <section class="my-center">
      <header class="header">
        <img src="https://img.meituan.net/maoyanuser/9d89b1e45a5b7fd309b28b5f55269c3912416.png"
             alt="">
      </header>
      <section class="container">
        <div class="group">
          <div class="orders">
            <div class="orders-title">我的订单</div>
            <ul class="orders-list">
              <router-link tag="li"
                           class="orders-list-item"
                           :class="item.icon"
                           v-for="item in orders"
                           :key="item.name"
                           :to="item.path">
                <!-- <img src="../../assets/img/order-movie.png" alt=""> -->
                {{item.name}}
              </router-link>
            </ul>
          </div>
        </div>
        <div class="group">
          <div class="coupon"
               v-for="item in addrs"
               :key="item.path">
            <router-link :to="item.path"
                         class="item">
              <span>{{item.name}}</span>
            </router-link>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/fixed'
export default {
  name: 'Profile',
  data () {
    return {
      orders: [
        {
          name: '电影',
          icon: 'movie',
          path: '/myOrder'
        },
        {
          name: '商城',
          icon: 'store',
          path: '/store/order/list'
        }
      ],
      addrs: [
        {
          name: '在线观影',
          path: '/vod/order'
        },
        {
          name: '优惠券',
          path: '/myCoupon'
        },
        {
          name: '折扣卡',
          path: '/membercard/mylist'
        }
      ]
    }
  },
  props: {
    msg: String
  },
  components: {
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.my-center {
  padding-top: 50px;
  .header {
    background-color: #f03d37;
    background-image: url(../../assets/img/profile-bg.png);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 150px;
    height: 150px;
    overflow: hidden;
    text-align: center;
    img {
      display: inline-block;
      margin-top: 30px;
      width: 60px;
      height: 60px;
      border-radius: 60px;
      border: 3px solid #fff;
    }
  }
}
.group {
  margin-top: 10px;
  background: #fff;

  .coupon {
    position: relative;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    margin-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #f2f2f2;
    .item {
      display: block;
      :after {
        position: absolute;
        right: 15px;
        top: 18px;
        display: inline-block;
        content: '';
        width: 8px;
        height: 8px;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
      }
    }
  }
}
.orders {
  padding: 0 15px;
  position: relative;
  overflow: hidden;
  text-align: center;
  .orders-title {
    position: relative;
    margin: 13px 0 0;
    font-size: 15px;
    line-height: 21px;
    height: 21px;
    color: #333;
    z-index: 9;
    display: inline-block;
    width: 80px;
    background-color: #fff;
  }
  .orders-list {
    display: flex;
    overflow: hidden;

    .orders-list-item {
      flex: 1;
      height: 37px;
      padding-top: 60px;
      background-repeat: no-repeat;
      background-position: top;
      background-size: 42px auto;
      margin-top: 18px;

      &.movie {
        background-image: url(../../assets/img/order-movie.png);
      }
      &.store {
        background-image: url(../../assets/img/store.png);
      }
    }
  }
}
</style>
