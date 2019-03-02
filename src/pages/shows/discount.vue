<template>
  <div class="discount">
    <div class="vip-tips">
      <div class="label">{{info.tag}}</div>
      <div class="label-text">{{info.title}}</div>
      <div class="process">{{info.process}}</div>
    </div>
  </div>
</template>

<script >
export default {
  data () {
    return {
    }
  },
  props: {
    info: Object
  }
}
</script>

<style scoped lang="scss">
.vip-tips {
  display: flex;
  color: #777;
  padding: 0 15px;
  height: 42px;
  line-height: 42px;
  background-color: #fff5ea;
  .label {
    flex: 0 0 auto;
    display: inline-block;
    background-color: #60b8e1;
    border-radius: 2px;
    font-size: 10px;
    line-height: 15px;
    height: 15px;
    width: 34px;
    text-align: center;
    color: #fff;
    margin-top: 13px;
    margin-right: 10px;
  }
  .label-text {
    flex: 1 1 auto;
    font-size: 12px;
    color: #fa9600;
  }
  .process {
    flex: 0 0 auto;
    line-height: 42px;
    color: #999;
    font-size: 12px;
    &:after {
      display: inline-block;
      content: '';
      width: 7px;
      height: 7px;
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      transform: rotate(135deg);
    }
  }
}
</style>
