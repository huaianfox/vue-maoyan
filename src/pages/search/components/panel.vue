<template>
  <div class="result-wrapper">
    <h3 class="title">{{title}}</h3>
    <slot name="result" />
    <div class="more-result" v-if="tips">{{tips}}</div>
  </div>
</template>

<script >
export default {
  computed: {
  },
  props: {
    title: String,
    tips: String
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
.result-wrapper {
  margin-bottom: 20px;
  background-color: #fff;
  .title {
    font-size: 15px;
    color: #999;
    padding: 9px 15px;
  }
  .more-result {
    color: #ef4238;
    text-align: center;
    line-height: 44px;
    height: 44px;
    font-size: 15px;
  }
}
</style>
