<template>
  <div class="tab-panel">
    <div class="region-tab">
      <ul class="tab">
        <li v-for="(item, index) in tabs"
            :key="item.title"
            :class="{active : currentIndex === index}"
            @click="changTab(index)">
          {{item.name}}
        </li>
      </ul>
      <div class="region-list">
        <aside class="region-sidenav"
               v-if="sidenav">
          <div class="district-li"
               v-for="(item) in sidenav.subItems"
               :key="item.name"
               @click="changeSubTab(item, currentIndex)"
               :class="{active: item.id === currentCate.index}">
            {{item.name}}({{item.count}})
          </div>
        </aside>
        <section class="region-list-item"
                 v-if="currentSub && currentSub.length">
          <ul>
            <li class="item"
                v-for="item in currentSub"
                :class="{active: currentCate.subIndex === item.id}"
                @click="choosen(item, currentIndex)"
                :key="item.id">
              <span>{{item.name}}</span>
              <span>{{item.count}}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script >
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      currentIndex: 0,
      tabs: [
        {
          title: 'district',
          name: '商圈'
        },
        {
          title: 'subway',
          name: '地铁站'
        }
      ],
      currentSub: []
    }
  },
  props: {
    regions: Object
  },
  computed: {
    ...mapState(['filters']),
    sidenav () {
      const { currentTab, regions } = this
      return regions[currentTab.title]
    },
    currentTab () {
      return this.tabs[this.currentIndex]
    },
    currentCate () {
      return this.cate[this.currentIndex]
    },
    cate () {
      const { districtId, areaId, lineId, stationId } = this.filters
      return [
        { type: 'districtId', subType: 'areaId', index: districtId, subIndex: areaId },
        { type: 'lineId', subType: 'stationId', index: lineId, subIndex: stationId }
      ]
    }
  },
  methods: {
    ...mapMutations(['changeFilter']),
    changTab (index) {
      this.currentIndex = index
      this.currentSub = []
    },
    changeSubTab (item, index) {
      this.currentCate.index = item.id
      this.cate[index].index = item.id
      this.currentSub = item.subItems
    },
    choosen (item, index) {
      let params = {}
      this.currentCate.subIndex = item.id
      this.cate[index].subIndex = item.id
      this.cate.forEach(item => {
        params[item.type] = item.index
        params[item.subType] = item.subIndex
      })
      this.changeFilter({ ...params })
      console.log(params)
      this.$emit('close')
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/fn';
.region-tab {
  height: 44px;
  .tab {
    display: flex;
    li {
      position: relative;
      flex: 1;
      padding: 0 10px;
      height: 100%;
      line-height: 44px;
      text-align: center;
      &.active {
        color: #f03d37;
        &:after {
          content: '';
          position: absolute;
          display: block;
          bottom: 0;
          left: 0;
          width: 90%;
          border-top: 2px solid #f03d37;
        }
      }
    }
  }
  .region-list {
    display: flex;
    height: 300px;
    background: #f5f5f5;

    .region-sidenav {
      width: 35%;
      height: 100%;
      float: left;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .district-li {
      height: 44px;
      padding: 0 15px;
      line-height: 44px;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      background: #fff;
      &.active {
        color: #f03d37;
        background: #f5f5f5;
      }
    }
  }
  .region-list-item {
    position: relative;
    margin: 0 15px;
    flex: 1;
    overflow: hidden;
    ul {
      position: relative;
      overflow-y: scroll;
    }
    .item {
      position: relative;
      height: 45px;
      line-height: 45px;
      padding: 0 0 0 25px;
      &.active {
        color: #f03d37;
        &:before {
          @extend .selected;
          left: 8px;
          top: 19px;
          width: 11.5px;
          height: 8px;
        }
      }
    }
  }
}
</style>
