<template>
  <div class="pages">
    <NavBar :fixed="false"/>
    <Info />
    <Swiper />
  </div>
</template>

<script >
import NavBar from '@/components/navbar'
import Info from './info'
import Swiper from './swiper'
export default {
  data() {
    return {}
  },
  components: {
    NavBar,
    Info,
    Swiper
  }
}
</script>

<style scoped lang="scss">
</style>
