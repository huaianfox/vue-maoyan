<template>
  <div class="page">
    <Navbar />
    <div class="search-header">
      <div class="input-wrapper">
        <input v-model="searchText"
               @input="handleSearchInput"
               type="text"
               class="search-input"
               placeholder="搜影院">
      </div>
      <div class="cancel">取消</div>
    </div>
    <ResultHistory />
  </div>
</template>

<script >
import Navbar from '@/components/navbar'
import { getSearch } from '@/api'
import ResultHistory from './components/history'

export default {
  name: 'Search',
  data () {
    return {
      searchText: '',
      searchType: {
        movie: 1,
        cinema: 2
      }
    }
  },
  computed: {
    type () {
      const st = this.$route.params.searchtype || ''
      return this.searchType[st]
    }
  },
  methods: {
    handleSearchInput (e) {
      getSearch({
        params: {
          kw: this.searchText,
          cityId: 42,
          style: this.type
        }
      }).then(data => {
        console.log(data)
      })
    }
  },
  components: {
    Navbar,
    ResultHistory
  }
}
</script>

<style scoped lang="scss">
.search-header {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 0 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  z-index: 1;
  .input-wrapper {
    padding: 0 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    background-color: #fff;
    -webkit-box-flex: 1;
    flex-grow: 1;
    .search-input {
      -webkit-box-flex: 1;
      flex: 1;
      border: none;
      width: 100%;
      font-size: 13px;
      color: #333;
      line-height: 20px;
      padding: 4px 0;
      width: calc(100% - 40px);
    }
  }
  .cancel {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 16px;
    color: #f03d37;
  }
}
</style>
