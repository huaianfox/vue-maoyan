<template>
  <div class="page">
    <Navbar />
    <MovieDetail />
    <Descp />
  </div>
</template>

<script >
import MovieDetail from '@/components/movieDetail'
import Navbar from '@/components/navbar'
import Descp from './desc'

export default {
  data () {
    return {}
  },
  components: {
    Navbar,
    MovieDetail,
    Descp
  }
}
</script>

<style scoped lang="scss">
.page {
  background: #f4f4f4;
}
</style>
