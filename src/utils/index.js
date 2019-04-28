/**
 * @param {*} val
 * 很多手机不兼容
 */
export function moneyFormat1 (val) {
  const value = val || 0
  return value.toLocaleString('zh', {minimumFractionDigits: 2, maximumFractionDigits: 2})
}

export function moneyFormat (s, n) {
  n = n > 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  var l = s.split('.')[0].split('').reverse()
  var r = s.split('.')[1]
  var t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}

export default {
  moneyFormat
}
