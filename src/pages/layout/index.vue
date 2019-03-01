<template>
  <div class="pages">
    <router-view />
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/tabbar'
export default {
  name: 'Main',
  components: {
    Tabbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.pages {
  height: 100%;
}
.panel {
  padding-bottom: 50px;
}
</style>
