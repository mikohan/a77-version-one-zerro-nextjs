export function asString(query: string | string[]) {
  if (Array.isArray(query)) {
    return query[0];
  }
  return query;
}
