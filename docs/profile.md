## 个人中心页面

纯展示页面

```html
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
                <img src="../../assets/img/order-movie.png" alt="">
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
```