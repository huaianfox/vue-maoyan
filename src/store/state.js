import storage from 'store'
import { getDay } from '@/util/date'
const city = storage.get('city') || { nm: '淮安', ci: 180 }
const day = getDay()

export default {
  city,
  pageTitle: '猫眼电影',
  detailMovie: {},
  day,
  dates: []
}
