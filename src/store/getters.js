
export default {
  cinemaList (state) {
    return state.cinemaListData.cinemas || []
  },
  cinemaPaging (state) {
    return state.cinemaListData.paging || {}
  }
}
