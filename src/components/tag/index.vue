<template>
  <p class="feature-tags">
    <span>座</span>
    <span v-if="tag.allowRefund">退</span>
    <span v-if="tag.endorse">改签</span>
    <span class="featrue"
          v-if="tag.snack">小吃</span>
    <span class="featrue"
          v-if="tag.vipDesc">折扣卡</span>
  </p>
</template>

<script >
export default {
  name: 'tag',
  props: {
    tag: Object
  }
}
</script>

<style scoped lang="scss">
.feature-tags {
  margin-top: 7px;
  span {
    border: 1px solid #589daf;
    color: #589daf;
    position: relative;
    display: inline-block;
    padding: 0 3px;
    height: 15px;
    line-height: 15px;
    border-radius: 2px;
    font-size: 12px;
    margin: 0 2px;
  }
  .featrue {
    color: #f90;
    border-color: #f90;
  }
}
</style>
