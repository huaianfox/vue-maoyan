// format date
const year = 'getFullYear'
const month = 'getMonth'
const date = 'getDate'

const formatDate = (actions) => (format) => (date = (new Date())) => {
  return actions.map(action => {
    let num = date[action]()
    if (action === 'getMonth') {
      num++
    }
    num < 10 && (num = '0' + num)
    return num
  }).join(format)
}
const formatByDay = formatDate([year, month, date])

export const getDay = formatByDay('-')
