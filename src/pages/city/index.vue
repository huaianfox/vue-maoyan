<template>
  <div class="page">
    <NavBar
      title="城市列表"
      :back="true"
      :fixed="true"
    />
    <List
      :geoCity="geoCity"
      :letterMap="letterMap"
      :letter="letter"
    />
    <Alphabet
      :letterMap="letterMap"
      @changePanel="handleLetterChange"
    />
  </div>
</template>

<script >
import NavBar from '@/components/navbar'
import List from './components/list'
import Alphabet from './components/alphabet'
import { getCityList } from '@/api'
export default {
  data () {
    return {
      letter: '',
      geoCity: {},
      letterMap: {}
    }
  },
  components: {
    List,
    NavBar,
    Alphabet
  },
  created () {
    getCityList().then(resp => {
      const { geoCity, letterMap } = resp.data
      this.geoCity = geoCity
      this.letterMap = letterMap
    })
  },
  methods: {
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
