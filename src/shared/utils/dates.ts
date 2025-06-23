export function formatDate(dt: Date, format: string): string {
  let day = String(dt.getDate())
  day.length < 2 && (day = "0" + day)
  let month = String(dt.getMonth())
  month.length < 2 && (month = "0" + month)
  let res = format
    .replaceAll("%YYYY", String(dt.getFullYear()))
    .replaceAll("%m", month)
    .replaceAll("%d", day)
    .replaceAll("%M", String(dt.getMinutes()))
    .replaceAll("%H", String(dt.getHours()));
  return res;
}
