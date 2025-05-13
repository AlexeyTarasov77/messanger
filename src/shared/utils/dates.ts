
export function formatDate(dt: Date, format: string): string {
  let res = format.replaceAll("%YYYY", String(dt.getFullYear()))
    .replaceAll("%m", String(dt.getMonth()))
    .replaceAll("%d", String(dt.getDate()))
    .replaceAll("%M", String(dt.getMinutes()))
    .replaceAll("%H", String(dt.getHours()))
  return res
}
