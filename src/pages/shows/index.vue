<template>
  <div class="pages">
    <NavBar :title="cinemaData.nm" />
    <Info :info="cinemaData" />
    <Swiper />
    <Deal :list="list" />
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
      detail: {}
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
    }
  },
  created () {
    const { id } = this.$route.params
    console.log(this.$route.params)
    getCinemaDetail({ params: { cinemaId: id } }).then(data => {
      this.detail = data
    })
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
  background: #f0f0f0;
}
</style>
