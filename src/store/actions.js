import { getCinemaList, postMovie } from '@/api'

export default {
  updatedMovieDetail (ctx, movie) {
    ctx.commit('updateDetailMovie', movie)
  },
  changeCity (ctx, city) {
    ctx.commit('changeCity', city)
  },
  getCinemaList (ctx) {
    const filters = ctx.state.filters
    if (filters.offset === 0) {
      ctx.commit('initCinemaList', {})
    }
    return getCinemaList({ params: filters }).then(data => {
      ctx.commit('initCinemaList', data)
      return data
    })
  },
  postMovie (ctx, payload) {
    const { filters } = ctx.state
    const time = Date.now()
    if (filters.offset === 0) {
      ctx.commit('initCinemaList', {})
    }
    return postMovie({
      params: {
        forceUpdate: time
      },
      data: {
        ...filters,
        ...payload
      }
    }).then(data => {
      ctx.commit('initCinemaList', data)
      return data
    })
  }
}
