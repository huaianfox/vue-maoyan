<template>
  <div class="pages">
    <NavBar :title="cinemaData.nm" />
    <Info :info="cinemaData" v-if="cinemaData"/>
    <Swiper :list="movieList"
            v-if="movieList.length"
            :vip="vipInfo" />
    <Deal :list="list"
          v-if="list.length" />
    <infinite-loading v-if="!isLoad"
                      @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script >
import NavBar from '@/components/navbar'
import { getCinemaDetail } from '@/api'
import Info from './info'
import Deal from './deal'
import Swiper from './swiper'
export default {
  data () {
    return {
      detail: {},
      isLoad: false
    }
  },
  computed: {
    cinemaData () {
      return this.detail.cinemaData || {}
    },
    list () {
      const dealList = this.detail.dealList
      const ret = (dealList && dealList.dealList) || []
      return ret
    },
    movieList () {
      const showData = this.detail.showData
      return showData ? showData.movies : []
    },
    vipInfo () {
      const showData = this.detail.showData
      const vips = showData ? showData.vipInfo : []
      return vips ? vips[0] : {}
    }
  },
  methods: {
    infiniteHandler ($state) {
      const { id } = this.$route.params
      getCinemaDetail({ params: { cinemaId: id } }).then(data => {
        this.detail = data
        this.isLoad = true
        $state.complete()
      })
    }
  },
  components: {
    NavBar,
    Info,
    Swiper,
    Deal
  }
}
</script>

<style scoped lang="scss">
.pages {
  min-height: 100%;
  background: #f0f0f0;
}
</style>
