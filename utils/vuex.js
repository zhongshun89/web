export const set = property => (state, payload) => (state[property] = payload)
export const toggle = property => state => (state[property] = !state[property])

export function genUrl (url, options) {
  let result = `${url}?page=${options.page}&pageSize=${options.itemsPerPage}`
  let ordering = ''
  options.sortBy.forEach((value, i) => {
    if (i === options.sortBy.length - 1) {
      ordering += options.sortDesc[i] ? `-${value}` : `${value}`
    } else {
      ordering += options.sortDesc[i] ? `-${value},` : `${value},`
    }
  })
  result += ordering ? `&ordering=${ordering}` : ''
  result += options.search ? `&search=${options.search}` : ''
  return encodeURI(result)
}

export function genNoticeText (response) {
  let result = ''
  const code = response.status
  const detail = response.data.detail
  if (code >= 200 && code < 300) {
    result = `操作成功！`
  } else {
    result = `操作失败:${detail}`
  }
  return result
}
