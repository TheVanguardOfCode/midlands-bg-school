import { strictEqual } from 'assert';
import number from './number';

describe('Typescript usage suite', () => {
  it('should be able to execute a NUMBER test', () => {
    strictEqual(true, true);
  });

  it('should return expected number', () => {
    strictEqual(number(5), 5);
  });
});