<template>
  <header
    class="navbar"
    :class="{back: back, 'navbar-fiexd': fixed}"
  >
    <a
      v-if="back"
      @click="goback"
      href="javascript:void(0);"
      class="iconfont icon-back"
    ></a>
    <h1 class="navbar-title ellipsis">{{pageTitle}}</h1>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  data () {
    return {
      defaultTitle: '猫眼电影'
    }
  },
  computed: {
    ...mapState(['pageTitle'])
  },
  props: {
    msg: String,
    title: {
      type: String,
      default: '猫眼电影'
    },
    back: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goback () {
      this.$router.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import '../../scss/fn.scss';

.navbar {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: #e54847;
  z-index: $base-zindex;

  &.navbar-fiexd {
    position: fixed;
    left: 0;
    top: 0;
  }

  .navbar-title {
    flex: 1;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
  }
  &.back {
    .navbar-title {
      margin-right: 52px;
    }
  }
  .iconfont {
    display: block;
    width: 52px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
}
</style>
