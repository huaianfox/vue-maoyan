<template>
  <div class="no-data">
    <div class="content">
      <img src="http://p0.meituan.net/movie/8b521599145a30fe521be9f2d60392d845310.png"
           alt="">
      <p class='no-cinema-tip'>{{title}}</p>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    title: String
  }
}
</script>

<style scoped lang="scss">
.no-data {
  position: relative;
  height: 100%;
  width: 100%;
  .content {
    width: 50%;
    padding-top: 20%;
    margin: auto;
    img {
      display: block;
      width: 40%;
      margin: auto;
    }
  }
}
</style>
