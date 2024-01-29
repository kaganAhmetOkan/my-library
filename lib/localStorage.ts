// write values to local storage
export function setLocal(key: string, value: any) {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
};

// read values from local storage
export function getLocal(key: string) {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
  return value;
};