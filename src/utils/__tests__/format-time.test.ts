import { expect, test } from 'vitest';
import { formateTime } from '../formate-time';

test('61.93456 to equal 01:01:934', () => {
  expect(formateTime(61.93456)).toBe('01:01:934');
});
