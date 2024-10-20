import { resetSelectedCity, setSelectedCity } from 'src/store/slices/selectedCitySlice';
import type { ResponseCity } from 'src/api/citiesSliceAPI/types';

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

const testDataSet = [
  {
    title: 'should set selectedCity for empty state',
    initialState: null,
    payload: mockCity_1,
    expectedResult: mockCity_1,
    actionCreator: setSelectedCity,
  },
  {
    title: 'should change selectedCity',
    initialState: mockCity_1,
    payload: mockCity_2,
    expectedResult: mockCity_2,
    actionCreator: setSelectedCity,
  },
  {
    title: 'should reset selectedCity',
    initialState: null,
    payload: undefined,
    expectedResult: null,
    actionCreator: resetSelectedCity,
  },
];

describe('selectedCitySlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize state', async () => {
    const { default: reducer } = require('src/store/slices/selectedCitySlice');

    const initialState = reducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual(null);
  });
});

describe.each(testDataSet)(
  'actions test',
  ({ initialState, payload, expectedResult, actionCreator, title }) => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it(title, () => {
      const { default: reducer } = require('src/store/slices/selectedCitySlice');
      const action = payload ? actionCreator(payload) : actionCreator();

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedResult);
    });
  }
);
