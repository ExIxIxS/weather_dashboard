import { getStorageItem } from 'src/store/utils/getStorageItem';
import { setStorageItem } from 'src/store/utils/setStorageItem';
import {
  removeFavoriteCity,
  resetFavoriteCities,
  toggleFavoriteCity,
} from 'src/store/slices/favoriteCitiesSlice';
import { STORAGE_ITEM_TYPE } from 'src/store/constants';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';

jest.mock('src/store/utils/getStorageItem', () => ({
  getStorageItem: jest.fn(),
}));

jest.mock('src/store/utils/setStorageItem', () => ({
  setStorageItem: jest.fn(),
}));

const mockCity_1: ResponseCity = {
  name: 'New York',
  country: 'USA',
  lat: 40.7128,
  lon: -74.006,
};

const mockCity_2: ResponseCity = {
  name: 'Warsaw',
  country: 'PL',
  lat: 23.7128,
  lon: -24.006,
};

const mockCity_3: ResponseCity = {
  name: 'Wroclaw',
  country: 'PL',
  lat: 23.7028,
  lon: -21.006,
};

const initialStoredState = [mockCity_1, mockCity_2];
const fullState = [...initialStoredState, mockCity_3];

const testDataSet = [
  {
    title: 'should add a city to favorites if not present',
    payload: mockCity_3,
    expectedResult: fullState,
    actionCreator: toggleFavoriteCity,
  },
  {
    title: 'should add a city to favorites if not present',
    payload: mockCity_2,
    expectedResult: [mockCity_1],
    actionCreator: toggleFavoriteCity,
  },
  {
    title: 'should add a city to favorites if not present',
    payload: mockCity_2,
    expectedResult: [mockCity_1],
    actionCreator: removeFavoriteCity,
  },
  {
    title: 'should add a city to favorites if not present',
    payload: undefined,
    expectedResult: [],
    actionCreator: resetFavoriteCities,
  },
];

describe('favoriteCitiesSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize state', async () => {
    (getStorageItem as jest.Mock).mockReturnValue(null);

    const { default: reducer } = require('src/store/slices/favoriteCitiesSlice');

    const initialState = reducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual([]);
  });
});

describe.each(testDataSet)('actions test', ({ payload, expectedResult, actionCreator, title }) => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(title, () => {
    const initialState: ResponseCity[] = initialStoredState;

    const action = payload ? actionCreator(payload) : actionCreator();
    const { default: reducer } = require('src/store/slices/favoriteCitiesSlice');

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expectedResult);
    expect(setStorageItem).toHaveBeenCalledWith(STORAGE_ITEM_TYPE.FAVORITE_CITIES, expectedResult);
  });
});
