<template>
  <div class="list" ref="wrapper">
    <div class="content">
      <Panel title="定位城市">
        <div class="item">{{city}}</div>
      </Panel>
      <Panel title="最近访问城市">
        <div class="item">定位失败，请点击重试</div>
      </Panel>
      <Panel title="热门城市">
        <div class="item"
          v-for="city in cities"
          :key="city.id"
          @click="handleCityClick(city.title)"
          >{{city.title}}</div>
      </Panel>
      <Panel
        class="cities-panel"
        v-for="(cities, key) in letterMap"
        :key="key"
        :title="key"
        :ref="key"
      >
        <!-- <p class="top" :ref="key"></p> -->
        <div class="city-name"
         v-for="city in cities"
        :key="city.id"
        @click="handleCityClick(city.nm)"
        >{{city.nm}}</div>
      </Panel>
    </div>
  </div>
</template>

<script >
import BScroll from "better-scroll"
import { mapState, mapMutations } from "vuex"
import Panel from "./base"
export default {
  data() {
    return {
      cities: [
        { id: "10", title: "上海" },
        { id: "1", title: "北京" },
        { id: "20", title: "广州" },
        { id: "30", title: "深圳" },
        { id: "57", title: "武汉" },
        { id: "40", title: "天津" },
        { id: "42", title: "西安" },
        { id: "55", title: "南京" },
        { id: "50", title: "杭州" },
        { id: "45", title: "重庆" }
      ]
    }
  },
  props: {
    geoCity: Object,
    letterMap: Object,
    letter: String
  },
  components: {
    Panel
  },
  computed: {
    ...mapState(['city'])
  },
  watch: {
    letter () {
      if (this.letter) {
        const elem = this.$refs[this.letter][0].$el
        this.scroll.scrollToElement(elem)
      }
    }
  },
  methods: {
    handleCityClick (city) {
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  }
}
</script>

<style lang="scss" scoped>
.list {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  .cities-panel {
    .city-name {
      height: 44px;
      line-height: 44px;
      margin-left: 15px;
      border-bottom: 1px solid #c8c7cc;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>