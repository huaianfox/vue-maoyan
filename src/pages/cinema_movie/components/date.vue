<template>
  <div class="days">
    <ul class="content">
      <li class="day"
          :class="currentIndex === index ? 'choosen': ''"
          v-for="(item, index) in dates"
          :key="item.date"
          @click="freshDate(item.date, index)">{{item.date}}</li>
    </ul>
  </div>
</template>

<script >
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    dates: Array
  },
  methods: {
    ...mapMutations(['changeFilter']),
    freshDate (day, index) {
      this.currentIndex = index
      this.changeFilter({ offset: 0, day: day, districtId: -1 })
      this.$store.dispatch('getCinemaList')
    }
  }
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
  .choosen {
    border-bottom: 2px solid #f03d37;
    color: #f03d37;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 3px;
      width: 100%;
      border-bottom: #f03d37 2px solid;
    }
  }
}
</style>
