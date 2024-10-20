import { STORAGE_ITEM_TYPE, STORAGE_NAME } from 'src/store/constants';

export const setStorageItem = (itemId: STORAGE_ITEM_TYPE, payload: unknown) => {
  const currentStorage = JSON.parse(localStorage.getItem(STORAGE_NAME) ?? '{}');
  const currentStorageObj =
    currentStorage && typeof currentStorage === 'object' ? currentStorage : {};
  const newStorageState = JSON.stringify({ ...currentStorageObj, [itemId]: payload });

  localStorage.setItem(STORAGE_NAME, newStorageState);
};
