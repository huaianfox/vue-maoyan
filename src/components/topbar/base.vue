<template>
  <header class="topbar" :style="styles">
    <router-link to="city-list" class="city-entry">
      {{city}}
    </router-link>
    <slot></slot>
    <slot name="search" ></slot>
  </header>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: 'Thumbnail',
  data () {
    return {
    }
  },
  props: {
    styles: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import '../../scss/fn.scss';
.topbar {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  width: 100%;
  line-height: 44px;
  z-index: $big-zindex;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(37, 47, 57, 0.1);
  justify-content: space-between;

  .city-entry {
    position: relative;
    padding: 0 15px;
    font-size: 15px;
    color: #666;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      right: 4px;
      border: 4px solid transparent;
      border-top-color: #888;
    }
  }
}
</style>