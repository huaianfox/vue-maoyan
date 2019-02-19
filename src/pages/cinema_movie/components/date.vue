<template>
  <div class="days">
    <ul class="content">
      <li class="day">今天02月19日</li>
      <li class="day">今天02月19日</li>
      <li class="day">今天02月19日</li>
      <li class="day">今天02月19日</li>
      <li class="day">今天02月19日</li>
      <li class="day">今天02月19日</li>
      <li class="day">今天02月19日</li>
    </ul>
  </div>
</template>

<script >
export default {
  data () {
    return {}
  },
  components: {}
}
</script>

<style scoped lang="scss">
.days {
  width: 100%;
  height: 45px;
  background-color: #fff;
  overflow: hidden;
  .content {
    padding: 0;
    margin: 0;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 50px;
    line-height: 50px;
  }
  .day {
    position: relative;
    display: inline-block;
    width: 115px;
    line-height: 43px;
    margin-left: 4.5px;
    font-size: 14px;
    text-align: center;
    list-style: none;
    color: #666;
  }
}
</style>
