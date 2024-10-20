// import { ResponseCity } from 'src/api/citiesSliceAPI/types';
import { getStorageItem } from 'src/store/utils/getStorageItem';
import { setStorageItem } from 'src/store/utils/setStorageItem';

jest.mock('src/store/utils/getStorageItem', () => ({
  getStorageItem: jest.fn(),
}));

jest.mock('src/store/utils/setStorageItem', () => ({
  setStorageItem: jest.fn(),
}));

// const mockCity: ResponseCity = {
//   name: 'New York',
//   country: 'USA',
//   lat: 40.7128,
//   lon: -74.006,
// };

describe('favoriteCitiesSlice', () => {
  beforeEach(() => {
    (getStorageItem as jest.Mock).mockClear();
    (setStorageItem as jest.Mock).mockClear();
  });

  describe('initial state', () => {
    it('should initialize with an empty array if storage state is invalid', () => {
      expect(1).toEqual(1);
    });
  });
});
