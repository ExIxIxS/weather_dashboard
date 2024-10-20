import { STORAGE_ITEM_TYPE, STORAGE_NAME } from 'src/store/constants';

export const getStorageItem = (itemId: STORAGE_ITEM_TYPE): unknown => {
  const storage = JSON.parse(localStorage.getItem(STORAGE_NAME) ?? '{}');

  if (!storage || typeof storage !== 'object') return;

  return storage[itemId];
};
