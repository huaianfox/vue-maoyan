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
<style lang='scss'>
.panel {
  padding-bottom: 50px;
}
</style>
