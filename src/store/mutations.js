// eslint-disable-next-line no-unused-vars
import storage from 'store'
import filters from '@/config/filters'

export default {
  changeCity (state, city) {
    state.city = city
    storage.set('city', city)
    document.cookie = `ci=${city.id}%2C${encodeURI(city.nm)}`
  },
  changePageTitle (state, title) {
    state.pageTitle = title
  },
  updateDetailMovie (state, movie) {
    const { id } = movie
    state.detailMovie = {
      ...state.detailMovie,
      [id]: movie
    }
    return state
  },
  addCityHistory (state, city) {
    state.cityHistory[city.id] = city
    storage.set('cityHistory', state.cityHistory)
  },
  getMovieById (state, id) {
    return state.detailMovie[id]
  },
  setDates (state, dates) {
    state.dates = dates
  },
  changeDay (state, day) {
    state.day = day
  },
  changeFilter (state, item) {
    state.filters = {
      ...state.filters,
      ...item
    }
  },
  resetFilter (state) {
    state.filters = filters
  }
}
