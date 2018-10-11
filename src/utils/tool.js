/**
 * 判断传入值是否为空/null/undefined
 * @param {*} value
 */
export function isNotNormalValue(value) {
  if (value == null || value === '' || typeof value === undefined) {
    return true
  }
  return false
}

/**
 * 空值判断，并返回填充值
 * @param {*} value 值
 */
export function emptyFill(value) {
  if (!value) {
    return '—'
  }
  return value
}

/**
 *
 * @param {*} time 时间字符串/时间类型
 * @param {*} cFormat {y}-{m}-{d} {h}:{i}:{s}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 数字格式转换带千分号数字
 * @param {number} num
 */
export function formatNumber(num) {
  if (!num) return ''
  var parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * 格式化时间字符串
 * @param {string} dateStr 带有T Z的时间字符串
 */
export function formatDate(dateStr) {
  if (!dateStr) return ''
  return dateStr.replace(/T/g, ' ').replace(/\.[\d]+Z/, '')
}
