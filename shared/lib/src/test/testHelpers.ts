/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */

/** Adds missing fetch implementations to jest globals */
import 'whatwg-fetch';

/** Utilities */
import { Utilities } from '../utils/Utilities';

/**
 * Utility services' implementation
 */
beforeAll(() => {
  const libConfiguration = {
    apiConfigObject: {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
    },
  };

  Utilities.setConfiguration(libConfiguration);
});

/**
 * Fetch API mocking helper
 */
const scope: any = {
  global,
};
scope.global.fetch = jest.fn();
scope.global.mockFetch = (
  status: number,
  ok: boolean,
  data?: any,
  wait = 0
) => {
  const response = { status, ok, json: () => Promise.resolve(data) };
  scope.global.fetch.mockImplementationOnce(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, wait);
    });
  });
};
