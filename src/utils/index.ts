export const getFromLocalStorage = (name: string) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(name);
    if (!!item && typeof item !== 'string') return JSON.parse(item);
    if (!!item && typeof item === 'string') return item;
    return null;
  }
};
