## select-panel组件结构
> 将功能分治在更小的组件内，供select-panel组件调用，对外暴露一个统一的调用接口

- [Region组件](select-panel?id=Region组件) 区域选择
- [Brand组件](select-panel?id=Brand组件)  品牌选择
- [Special组件](select-panel?id=Special组件) 服务和影厅等选择

```html
/**
*** @addr src\components\selectPanel\index.vue
**/
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
      this.$emit('change', 'fixed-50')
    },
    closeChoosed () {
      this.selected = ''
      this.$emit('change', '')
    }
  }
}
</script>
```

### select-panel组件逻辑
> select-panel组件主要负责分发筛选条件数据给各个功能小组件，控制遮罩、小组件的显示，功能小组件负责发出新的请求并通知select-panel组件关闭遮罩，隐藏显示
 
 ```js
 /**
  * this.$emit('change', 'fixed-50') 暴露给date组件使用,其他组件忽略
 */
    choose (tab) {
      this.selected = tab.name
      this.$emit('change', 'fixed-50')
    },
    closeChoosed () {
      this.selected = ''
      this.$emit('change', '')
    }

 ```

 ## Region组件
> Region组件内部控制行政区域和地铁线路两块业务逻辑

 ``` html
 /**
****** @addr src\components\selectPanel\region.vue
***/
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
               v-for="(item, index) in sidenav.subItems"
               :key="item.name"
               @click="changeSubTab(item, currentIndex, index)"
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
    changeSubTab (item, index, i) {
      this.currentCate.index = item.id
      this.cate[index].index = item.id
      this.currentSub = item.subItems
      if (i === 0) {
        const cate = this.cate[index]
        let params = {}
        params[cate.type] = -1
        params[cate.subType] = -1
        this.fresh(params)
      }
    },
    choosen (item, index) {
      let params = {}
      this.currentCate.subIndex = item.id
      this.cate[index].subIndex = item.id
      this.cate.forEach(item => {
        params[item.type] = item.index
        params[item.subType] = item.subIndex
      })
      this.fresh(params)
    },
    fresh (params) {
      this.changeFilter({ ...params, offset: 0 })
      this.$emit('close')
      this.$store.dispatch('getCinemaList')
    }
  }
}
</script>

 ```

## Brand组件

```html
/**
****** @addr src\components\selectPanel\brand.vue
***/
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

```

## Special组件

```html
/**
****** @addr src\components\selectPanel\special.vue
***/
<template>
  <div class="special">
    <div class="special-content">
      <div class="special-item"
           v-for="item in specials"
           :key="item.type">
        <div class="item-title">{{item.name}}</div>
        <div class="item-list">
          <div class="special-list-item"
               v-for="subItem in item.subItems"
               :key="subItem.id"
               :class="{active: cate[item.type] === subItem.id}"
               @click="change(item.type, subItem.id)">
            {{subItem.name}}
          </div>
        </div>
      </div>
    </div>
    <div class="special-btn">
      <span class="btn cancel"
            @click="reset">重置</span>
      <span class="btn confirm-btn"
            @click="confirm">确定</span>
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
    cate () {
      const { hallType, serviceId } = this.filters
      return {
        hallType,
        serviceId
      }
    }

  },
  props: {
    specials: Array
  },
  methods: {
    ...mapMutations(['changeFilter']),
    change (type, id) {
      const params = {}
      params[type] = id
      this.changeFilter({ ...params })
    },
    reset () {
      this.changeFilter({
        hallType: -1,
        serviceId: -1
      })
    },
    confirm () {
      this.$store.dispatch('getCinemaList')
      this.$emit('close')
    }
  }
}
</script>
  
  ```