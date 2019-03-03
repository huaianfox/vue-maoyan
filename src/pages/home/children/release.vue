<template>
  <section class="inner">
    <Expect />
    <ComingGroup />
  </section>
</template>

<script>
import Expect from '../components/relaese-expect'
import ComingGroup from '../components/release-coming'

export default {
  name: 'Coming',
  data () {
    return {}
  },
  components: {
    Expect,
    ComingGroup
  }
}
</script>

