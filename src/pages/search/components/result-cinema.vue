<template>
  <Panel title="影院"
         :tips="tips">
    <div class="list"
         slot="content">
      <cinema-item v-for="item in result.list"
                   :key="item.id"
                   :cinema="item">
      </cinema-item>
    </div>
  </Panel>
</template>

<script >
import Panel from './panel'
import CinemaItem from '@/components/cinema-item'

export default {
  computed: {
    tips () {
      const total = this.result.total || 0
      return total > this.max ? `查看全部${total}家电影院` : ''
    }
  },
  props: {
    result: Object,
    max: Number
  },
  components: {
    Panel,
    CinemaItem
  }
}
</script>
