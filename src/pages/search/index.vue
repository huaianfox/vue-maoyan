<template>
  <div class="page">
    <Navbar title="猫眼电影" />
    <div class="search-header">
      <div class="input-wrapper">
        <span class="iconfont icon-search"></span>
        <input v-model="searchText"
               @input="handleSearchInput"
               type="text"
               class="search-input"
               :placeholder="panel.name">
        <span v-if="searchText"
              @click="emptyText"
              class="iconfont icon-cancel"></span>
      </div>
      <div @click="handleCancelCilck"
           class="cancel">取消</div>
    </div>
    <ResultHistory v-if="!searchText"
                   @trigerSearch="trigerSearch"
                   :history="history" />
    <ResultMovie v-if="resultMovie.total"
                 :result="resultMovie"
                 :max="max" />
    <ResultCinema v-if="resultCinema.total"
                  :result="resultCinema"
                  :max="max" />
    <infinite-loading v-if="searching">
      <div class="loading"
           slot="spinner">Loading...</div>
    </infinite-loading>
  </div>
</template>

<script >
import Navbar from '@/components/navbar'
import { getSearch } from '@/api'
import ResultHistory from './components/history'
import ResultMovie from './components/result-movie'
import ResultCinema from './components/result-cinema'
import { mapState, mapMutations } from 'vuex'
import { uniqueArray } from '@/util'

export default {
  name: 'Search',
  data () {
    return {
      timer: null,
      searchText: '',
      searchtype: {
        movie: {
          type: -1,
          name: '搜电影、搜影院',
          title: 'movies'
        },
        cinema: {
          type: 2,
          name: '搜影院',
          title: 'cinemas'
        }
      },
      resultMovie: {},
      resultCinema: {},
      max: 3,
      searching: false
    }
  },
  watch: {
    searchText (value) {
      if (!value) {
        this.resultMovie = {}
        this.resultCinema = {}
      }
    }
  },
  computed: {
    ...mapState(['city', 'searchHistory']),
    cityId () {
      return this.city.id
    },
    panel () {
      const { searchtype, $route: { params } } = this
      const panel = params.searchtype || searchtype.movie
      return searchtype[panel]
    },
    history () {
      const { title } = this.panel
      return this.searchHistory[title]
    }
  },
  methods: {
    ...mapMutations(['updateSearchHistory']),
    handleSearchInput () {
      if (this.timer) return
      this.timer = setTimeout(() => {
        this.resultMovie = {}
        this.resultCinema = {}
        if (this.searchText) {
          this.history.data.unshift(this.searchText)
          this.history.data = uniqueArray(this.history.data)
          this.updateSearchHistory({
            ...this.history
          })
        }
        this.timer = null
        this.searching = true
        getSearch({
          params: {
            kw: this.searchText,
            cityId: this.cityId,
            style: this.panel.type
          }
        }).then(data => {
          const { cinemas, movies } = data
          this.panel.type === -1 && this.formatData(movies, 'resultMovie')
          this.formatData(cinemas, 'resultCinema')
          this.searching = false
        })
      }, 300)
    },
    handleCancelCilck () {
      this.$router.back()
    },
    emptyText () {
      this.searchText = ''
    },
    trigerSearch (val) {
      this.searchText = val
      this.handleSearchInput()
    },
    formatData (data, title) {
      if (!data) return
      const { list, total } = data
      this[title] = {
        list: total > this.max ? list.slice(0, this.max) : list,
        total
      }
    }
  },
  components: {
    Navbar,
    ResultHistory,
    ResultMovie,
    ResultCinema
  }
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100%;
  background-color: #f5f5f5;
  .loading {
    padding: 10px 0;
  }
}
.search-header {
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 0 8px 10px;
  border-bottom: 1px solid #e5e5e5;
  z-index: 1;
  .input-wrapper {
    position: relative;
    flex: 1;
    padding: 0 30px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    background-color: #fff;
    .search-input {
      padding: 5px 0;
      width: 100%;
      font-size: 13px;
      color: #333;
      line-height: 20px;
      &:focus {
        outline: none;
      }
    }
  }
  .iconfont {
    position: absolute;
    padding: 0 6px;
    line-height: 32px;
    &.icon-search {
      left: 0;
      color: #b3b0b0;
    }
    &.icon-cancel {
      right: 0;
      right: 0;
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
