<template>
  <Navbar :back="back"
          :fixed="fixed"
          :title="title"></Navbar>
</template>

<script >
import Navbar from './index'
export default {
  name: 'NavbarFixed',
  data () {
    return {
      back: false,
      fixed: true
    }
  },
  props: {
    title: {
      type: String
    }
  },
  components: {
    Navbar
  }
}
</script>

<style scoped lang="css">
</style>
