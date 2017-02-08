export function dateFormat(date = new Date(Date.now())) {
  date = new Date(date);
  return `${date.getDate()}` +
    `${date.toLocaleString('en', { month: 'short' })}` +
    `${date.toLocaleString('en', { year: '2-digit' })}`;
}
