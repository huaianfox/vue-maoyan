import storage from 'store'
import filters from '@/config/filters'
const city = storage.get('city') || { nm: '淮安', id: 180 }
const cityList = storage.get('cityList')
const cityHistory = storage.get('cityHistory') || {}
const searchHistory = storage.get('searchHistory') || { movies: { data: [], type: 'movies' }, cinemas: { data: [], type: 'cinemas' } }
document.cookie = `ci=${city.id}%2C${encodeURI(city.nm)}`

export default {
  city,
  cityList,
  cityHistory,
  searchHistory,
  detailMovie: {},
  filters,
  cinemaListData: {},
  cinemas: []
}
