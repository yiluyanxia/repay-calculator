export function moneyFormat (val) {
  const value = val || 0
  return value.toLocaleString('zh', {minimumFractionDigits: 2, maximumFractionDigits: 2})
}
export default {
  moneyFormat
}
