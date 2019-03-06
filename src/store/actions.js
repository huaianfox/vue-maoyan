import { getCinemaList, postMovie, getCityList } from '@/api'
import qs from 'qs'

export default {
  updatedMovieDetail (ctx, movie) {
    ctx.commit('updateDetailMovie', movie)
  },
  changeCity (ctx, city) {
    ctx.commit('changeCity', city)
  },
  getCinemaList (ctx) {
    const { filters, city } = ctx.state
    if (filters.offset === 0) {
      ctx.commit('initCinemaList', {})
    }
    return getCinemaList({ params: { ...filters, cityId: city.id } }).then(data => {
      ctx.commit('initCinemaList', data)
      return data
    })
  },
  postMovie (ctx, payload) {
    const { filters } = ctx.state
    // const time = Date.now()
    if (filters.offset === 0) {
      ctx.commit('initCinemaList', {})
    }
    return postMovie({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        ...filters,
        ...payload
      })
    }).then(data => {
      ctx.commit('initCinemaList', data)
      return data
    })
  },
  getCityList (ctx) {
    getCityList().then(resp => {
      ctx.commit('saveCityList', resp.data)
    })
  }
}
