<template>
  <ul>
    <router-link tag="li" :to="path + item.id"
                 v-for="(item, index) in list"
                 :key="index">
      <Thumbnail :movie="item" />
    </router-link>
  </ul>
</template>

<script >
import Thumbnail from '@/components/thumbnail'
export default {
  props: {
    path: String,
    list: Array
  },
  components: {
    Thumbnail
  }
}
</script>
