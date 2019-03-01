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
      console.log('confirm')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/fn';
.special-content {
  height: 260px;
  overflow: hidden;
  .item-title {
    margin-left: 12px;
    font-size: 15px;
  }
  .item-list {
    margin: 0 12px 12px;
  }
  .special-list-item {
    float: left;
    width: 21.3%;
    height: 30px;
    padding: 3px 0;
    margin-right: 3%;
    margin-top: 10px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    &.active {
      background: #fcf0f0;
      color: #f03d37;
      border: 1px solid #f03d37;
    }
  }
}
.special-btn {
  height: 60px;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  margin-top: 10px;
  background: #fafafa;
  .btn {
    display: inline-block;
    height: 34px;
    width: 21.3%;
    margin: 13px 11px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
  }
  .confirm-btn {
    float: right;
    background: #f03d37;
    border: 1px solid #f03d37;
    color: #fff;
  }
}
</style>
