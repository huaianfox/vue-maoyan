// format date
const year = 'getFullYear'
const month = 'getMonth'
const date = 'getDate'

const formatDate = (actions) => (format) => (date = (new Date())) => {
  return actions.map(action => date[action]()).join(format)
}
const formatByDay = formatDate([year, month, date])

export const getDay = formatByDay('-')
