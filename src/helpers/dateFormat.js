export function dateFormat(date = new Date(Date.now())) {
  return `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })} ${date.toLocaleString('en', { year: '2-digit' })}`
}
