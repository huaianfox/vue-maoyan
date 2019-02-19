<template>
  <div class="pages">
    <NavBar :back="back" :fixed="fixed"/>
    <router-view/>
    <Tabbar/>
  </div>
</template>

<script>
import NavBar from "@/components/navbar"
import Tabbar from "@/components/tabbar"
export default {
  name: "Main",
  data () {
    return {
      back: false,
      fixed: true
    }
  },
  components: {
    Tabbar,
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.panel {
  padding-bottom: 50px;
}
</style>