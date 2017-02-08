export function dateFormat(dateString = new Date(Date.now())) {
  const date = new Date(dateString);
  return `${date.getDate()}` + ' ' +
    `${date.toLocaleString('en', { month: 'short' })}` + ' ' +
    `${date.toLocaleString('en', { year: '2-digit' })}`;
}
