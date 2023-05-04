import StringUtil from '@yvesguilherme/string-util';

const availableFormats = {
  'dd-mm-yyyy': '$<day>-$<month>-$<year>',
  'dd/mm/yyyy': '$<day>/$<month>/$<year>',
  'yyyy-mm-dd': '$<year>-$<month>-$<day>',
  'yyyy/mm/dd': '$<year>/$<month>/$<day>'
};

const yyyyMMdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g;
const ddMMyyyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g;

const stringToDateExpression = {
  'dd-mm-yyyy': ddMMyyyy,
  'yyyy-mm-dd': ddMMyyyy,
  'dd/mm/yyyy': yyyyMMdd,
  'yyyy/mm/dd': yyyyMMdd,
};

export default class DateUtil {
  static formatDate(date, format) {
    if (!Object.keys(availableFormats).includes(format)) {
      return { error: `The format ${format} isn't available yet... :(` };
    }

    const expression = availableFormats[format];
    const [result] = date.toISOString().match(yyyyMMdd);

    return result.replace(yyyyMMdd, expression);
  }

  static formatString(dateStr, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(dateStr)) {
      return { error: 'Your text is empty.' };
    }

    if (!Object.keys(availableFormats).includes(currentFormat)) {
      return { error: `The format ${currentFormat} is not available yet... :(` };
    }

    if (!Object.keys(availableFormats).includes(expectedFormat)) {
      return { error: `The format ${expectedFormat} is not available yet... :(` };
    }

    const toDateExpression = stringToDateExpression[currentFormat];
    const dateStrInISO = StringUtil
      .removeEmptySpaces(dateStr)
      .replace(toDateExpression, '$<year>-$<month>-$<day>');
    const finalDate = new Date(dateStrInISO);

    return this.formatDate(finalDate, expectedFormat);
  }
}