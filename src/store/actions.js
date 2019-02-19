export default {
  updatedMovieDetail (ctx, movie) {
    ctx.commit('updateDetailMovie', movie)
  },
  changeCity (ctx, city) {
    ctx.commit('changeCity', city)
  }
}
