<template>
  <footer class='nav-wrapper'>
    <router-link
      class='nav-icon-wrapper'
      v-for="(tab) in tabs"
      :key="tab.icon"
      :to="tab.path"
      :class="$route.path === tab.path || tab.alias ? 'active' : ''"
      exact
    >
      <div :class='"nav-icon iconfont icon-" +tab.icon'>
      </div>
      <div class="nav-text">{{tab.title}}</div>
    </router-link>
  </footer>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {
      activeIndex: 0,
      tabs: [
        {
          path: '/',
          alias: 'release',
          title: '电影',
          icon: 'movie'
        },
        {
          path: '/cinema',
          title: '影院',
          icon: 'cinema'
        },
        {
          path: '/profile',
          title: '我的',
          icon: 'profile'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.nav-wrapper {
  display: flex;
  position: fixed;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 48px;
  text-align: center;
  background: #fff;
  border-top: 0.5px solid #d8d8d8;

  .nav-icon-wrapper {
    flex: 1;
    &.active.router-link-exact-active {
      color: #f03d37;
    }
  }

  .iconfont {
    padding-top: 4px;
    font-size: 22px;
  }

  .nav-text {
    padding-top: 2px;
    line-height: 12px;
    font-size: 10px;
    color: inherit;
  }
}
</style>
