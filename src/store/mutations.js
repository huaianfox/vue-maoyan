
export default {
  changeCity (state, city) {
    state.city = city
    localStorage.city = city
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
  }
}
