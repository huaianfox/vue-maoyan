<template>
  <section class="select-wrapper">
    <nav class="select-tab">
      <div v-if="selected"
           class="masker"
           @click="closeChoosed"></div>
      <div class="select-tab-item"
           v-for="tab in tabs"
           :key="tab.name"
           :class="selected===tab.name?'active':''"
           @click="choose(tab)">{{tab.text}}</div>
    </nav>
    <div class="tab-content"
         v-if="selected">
      <Region v-if="selected === 'region'"
              :regions="regions"
              @close="closeChoosed" />
      <Brand v-if="selected === 'brand'"
             @close="closeChoosed"
             :brands="brands" />
      <Special v-if="selected === 'special'"
               @close="closeChoosed"
               :specials="specials" />
    </div>
  </section>
</template>

<script >
import Region from './region'
import Brand from './brand'
import Special from './special'

export default {
  data () {
    return {
      selected: '',
      tabs: [
        {
          name: 'region',
          text: '全城'
        },
        {
          name: 'brand',
          text: '品牌'
        },
        {
          name: 'special',
          text: '特色'
        }
      ]
    }
  },
  computed: {
    regions () {
      const { district, subway } = this.filters
      return {
        district,
        subway
      }
    },
    brands () {
      const { brand } = this.filters
      return {
        ...brand
      }
    },
    specials () {
      const { service, hallType } = this.filters
      return [
        { ...service, type: 'serviceId' },
        { ...hallType, type: 'hallType' }
      ]
    }
  },
  components: {
    Region,
    Brand,
    Special
  },
  props: {
    filters: Object
  },
  methods: {
    choose (tab) {
      this.selected = tab.name
    },
    closeChoosed () {
      this.selected = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/fn.scss';
$selectDefaultColor: #b0b0b0;
$selectedColor: #e54847;

.select-wrapper {
  width: 100%;
  height: 40px;
  line-height: 40px;
  -webkit-box-shadow: 0 1px 2px 0 rgba(37, 47, 57, 0.1);
  box-shadow: 0 1px 2px 0 rgba(37, 47, 57, 0.1);
  z-index: 999;
  .select-tab {
    display: flex;
    text-align: center;
    background: #fff;
    .select-tab-item {
      position: relative;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      font-size: 13px;
      & + .select-tab-item:after {
        content: '';
        display: block;
        position: absolute;
        height: 20px;
        top: 10px;
        left: 0;
        border-left: 1px solid #e8e8e8;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 70%;
        border: 4px solid transparent;
        border-top-color: $selectDefaultColor;
      }
      &.active {
        color: $selectedColor;
      }
      &.active:before {
        top: 40%;
        border-top-color: transparent;
        border-bottom-color: $selectedColor;
      }
    }
  }
}

.masker {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background: rgba(0, 0, 0, 0.3);
}
.tab-content {
  position: relative;
  width: 100%;
  background: #fff;
  z-index: 100;
}
</style>
