<template>
  <div class="page">
    <NavBar title="城市列表"
            :fixed="true" />
    <List :letterMap="letterMap"
          :letter="letter" />
    <Alphabet :letterMap="letterMap"
              @changePanel="handleLetterChange" />
  </div>
</template>

<script >
import NavBar from '@/components/navbar'
import List from './components/list'
import Alphabet from './components/alphabet'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      letter: ''
    }
  },
  computed: {
    ...mapState(['cityList']),
    letterMap () {
      return this.cityList || {}
    }
  },
  components: {
    List,
    NavBar,
    Alphabet
  },
  created () {
    this.cityList || this.getCityList()
  },
  methods: {
    ...mapActions(['getCityList']),
    handleLetterChange (letter) {
      this.letter = letter
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/fn.scss';
.page {
  position: absolute;
  top: $navbarHeight;
  width: 100%;
  background-color: #ebebeb;
  font-size: 14px;
  color: #333;
  bottom: 0;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
}
</style>
