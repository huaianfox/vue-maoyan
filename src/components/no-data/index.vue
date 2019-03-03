<template>
  <div class="no-data">
    <div class="content">
      <img src="../../assets/img/nothing.png"
           alt="">
      <p class='no-cinema-tip'>{{title}}</p>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    title: {
      type: String,
      default: '暂无符合条件的影院'
    }
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
    .no-cinema-tip {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
