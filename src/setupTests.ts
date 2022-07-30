import '@testing-library/jest-dom';

global.matchMedia = jest.fn(() => ({
  addEventListener: jest.fn(),
  addListener: jest.fn(),
  dispatchEvent: jest.fn(),
  matches: false,
  media: '',
  onchange: jest.fn(),
  removeEventListener: jest.fn(),
  removeListener: jest.fn(),
}));
