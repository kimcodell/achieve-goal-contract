export function removeKeyContainDot(data: object) {
  const invalidKeys = Object.keys(data).filter((key) => key.includes("."));
  invalidKeys.forEach((key) => {
    delete data[key];
  });
  return data;
}
