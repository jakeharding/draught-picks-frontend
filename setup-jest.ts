/**
 * setupJest.ts
 *
 * Created by jake
 * Created on 10/21/18
 */

import 'jest-preset-angular';

import ga from 'universal-ga';

const mock = () => {
  let storage = {};
  return {
    getItem: key => key in storage ? storage[key] : null,
    setItem: (key, value) => storage[key] = value || '',
    removeItem: key => delete storage[key],
    clear: () => storage = {},
  };
};

Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: 'localhost',
});

/**
 * Mock the google analytics library
 */
jest.mock('universal-ga', () => ({
  default: {
    set: jest.fn(),
    pageview: jest.fn()
  }
}));

export const provide = (mock: any): any => mock;

const toPromise = { toPromise: () => Promise.resolve() };

export const httpClient = {
  get: jest.fn(),
  put: jest.fn(() => toPromise),
  post: jest.fn(() => toPromise),
  patch: jest.fn(() => toPromise)
};

export const mockToast = {
  present: jest.fn()
};
export const mockToastController = {
  create: jest.fn(() => mockToast)
};
export const mockNavController = {
  setRoot: jest.fn()
};
