<template>
  <div class="brand">
    <div class="item"
         v-for="item in brands.subItems"
         :key="item.id"
         :class="{active: item.id === selectIndex}"
         @click="choose(item.id)">
      <span class="brand-name">{{item.name}}</span>
      <span class="brand-count">{{item.count}}</span>
    </div>
  </div>
</template>

<script >
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['filters']),
    selectIndex () {
      console.log(this.filters.brandId)
      return this.filters.brandId
    }
  },
  props: {
    brands: Object
  },
  methods: {
    ...mapMutations(['changeFilter']),
    choose (brandId) {
      this.changeFilter({ brandId, offset: 0 })
      this.$store.dispatch('getCinemaList')
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/fn';
.brand {
  padding-right: 20px;
  height: 320px;
  overflow-y: scroll;
}
.item {
  display: flex;
  position: relative;
  line-height: 44px;
  height: 44px;
  padding: 0 15px 0 26px;
  border-bottom: 1px solid #e5e5e5;
  color: #333;
  span {
    flex: 1;
  }
  .brand-count {
    text-align: right;
  }
  &.active {
    color: #dd403b;

    &:before {
      @extend .selected;
      left: 8px;
      top: 18px;
      width: 11.5px;
      height: 8px;
    }
  }
}
</style>
