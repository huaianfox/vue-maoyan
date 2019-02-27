import Axios from 'axios'
const defaultConfig = {
  baseURL: '/'
}

const STATUS_CODE = 200

const instance = Axios.create(defaultConfig)

const request = (url, method = 'get') => (params) => {
  return instance({
    url,
    method,
    ...params
  }).then(resp => {
    if (resp.status === STATUS_CODE) {
      return resp.data
    }
  })
}

export default request
