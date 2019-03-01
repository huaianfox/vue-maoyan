import storage from 'store'
import { getDay } from '@/util/date'
import filters from '@/config/filters'
const city = storage.get('city') || { nm: '淮安', id: 180 }
const cityHistory = storage.get('cityHistory') || {}
const day = getDay()

export default {
  city,
  pageTitle: '猫眼电影',
  detailMovie: {},
  day,
  cityHistory,
  dates: [],
  filters,
  cinemaListData: {},
  cinemas: []
}
