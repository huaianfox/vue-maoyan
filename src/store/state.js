import storage from 'store'

const city = storage.get('city') || { nm: '淮安', ci: 180 }

export default {
  city,
  pageTitle: '猫眼电影',
  detailMovie: {}
}
