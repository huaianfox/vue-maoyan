<template>
  <ul class="stars">
    <li class="">
      <span class="star"
            v-for="(item,index) in classes"
            :key="index"
            :class="item"></span>
    </li>
  </ul>
</template>

<script >
const LENGTH = 5
const CLS_FULL = 'full'
const CLS_HALF = 'half'
const CLS_ZERO = '  zero'

export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    classes () {
      let ret = []
      let score = Math.floor(this.score) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        ret.push(CLS_FULL)
      }
      if (hasDecimal) {
        ret.push(CLS_HALF)
      }
      if (ret.length < LENGTH) {
        ret.push(CLS_ZERO)
      }
      return ret
    }
  }
}
</script>

<style scoped lang="scss">
.stars {
  display: inline-block;
  margin-right: 5px;
  overflow: hidden;

  .star {
    float: left;
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-size: 15px 15px;
    & + .star {
      margin-left: 6px;
    }

    &.full {
      background-image: url('../../assets/img/star/star-full.png');
    }
    &.half {
      background-image: url('../../assets/img/star/star-half.png');
    }

    &.zero {
      background-image: url('../../assets/img/star/star-zero.png');
    }
  }
}
</style>
