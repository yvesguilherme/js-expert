import { deepStrictEqual } from 'assert';

import DateUtil from './index.js';

{
  const format = 'dd-M-y';
  const expected = { error: `The format ${format} isn't available yet... :(` };
  const date = new Date(1995, 6, 1);
  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}

{
  const expected = '18-07-1995';
  const format = 'dd-mm-yyyy';
  const date = new Date('1995-07-18');
  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}

{
  const expected = '19/09/1996';
  const format = 'dd/mm/yyyy';
  const date = new Date('1996-09-19');
  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}

{
  const expected = '1997-10-20';
  const format = 'yyyy-mm-dd';
  const date = new Date('1997-10-20');
  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}

/**
 * FormatString
 */

{
  const expected = { error: 'Your text is empty.' };
  const date = '';
  const result = DateUtil.formatString(date);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: '1990-april-01',
    format: 'yyyy-M-dd'
  };
  const expected = { error: `The format ${data.format} is not available yet... :(` };
  const result = DateUtil.formatString(data.value, data.format);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: '1990-01-01',
    format: 'yyyy-mm-dd'
  };
  const expectedFormat = 'dd/M/yyyy';
  const expected = { error: `The format ${expectedFormat} is not available yet... :(` };
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: '1989-01-01',
    format: 'dd-mm-yyyy'
  };
  const expectedFormat = 'dd-mm-yyyy';
  const expected = '01-01-1989';
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: '1 9 9 0 / 0 1 / 01',
    format: 'yyyy/mm/dd'
  };
  const expectedFormat = 'yyyy/mm/dd';
  const expected = '1990/01/01';
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: '1 9 9 1/  0 1 / 01',
    format: 'yyyy-mm-dd'
  };
  const expectedFormat = 'yyyy-mm-dd';
  const expected = '1991-01-01';
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}

{
  const data = {
    value: '0 1 / 01/    1 9 9 2 ',
    format: 'dd/mm/yyyy'
  };
  const expectedFormat = 'dd/mm/yyyy';
  const expected = '01/01/1992';
  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}