export function serialize(obj) {
  let queryUrl = "";
  for (let key in obj) {
    queryUrl += `&${key}=${obj[key]}`;
  }
  return queryUrl;
}
