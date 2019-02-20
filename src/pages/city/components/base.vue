<template>
  <section class="city-panel">
    <header class="title">{{title}}</header>
    <div class="main">
      <slot></slot>
    </div>
  </section>
</template>

<script >
export default {
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  padding-left: 15px;
  line-height: 30px;
}
.main {
  background-color: #f5f5f5;
  padding-bottom: 8px;
  overflow: hidden;
  .item {
    float: left;
    background: #fff;
    width: 29%;
    height: 33px;
    margin-top: 15px;
    margin-left: 4%;
    padding: 0 4px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>