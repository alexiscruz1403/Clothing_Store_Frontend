export function errorObjectToString(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${value}`)
    .join('. ');
}
