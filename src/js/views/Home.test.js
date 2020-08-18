import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './Home';

test('checking a passing test', () => {
  const sum = (a, b) => {
    return a+b;
  };
  expect(sum(1, 2)).toEqual(3);;
});
 