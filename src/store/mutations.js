// eslint-disable-next-line no-unused-vars
import storage from 'store'

export default {
  changeCity (state, city) {
    state.city = city
    storage.set('city', city)
  },
  changePageTitle (state, title) {
    state.pageTitle = title
  },
  updateDetailMovie (state, movie) {
    console.log('this is movie update')
    const { id } = movie
    state.detailMovie = {
      ...state.detailMovie,
      [id]: movie
    }
    return state
  },
  getMovieById (state, id) {
    return state.detailMovie[id]
  },
  setDates (state, dates) {
    state.dates = dates
  },
  changeDay (state, day) {
    state.day = day
  }
}
