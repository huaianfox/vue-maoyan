import Axios from 'axios'

const STATUS_CODE = 200

const request = (url, method = 'get') => (params) => {
  return Axios({
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
