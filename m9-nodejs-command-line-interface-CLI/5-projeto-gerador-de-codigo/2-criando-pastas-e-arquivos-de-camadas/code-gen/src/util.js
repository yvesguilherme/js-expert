export default class Util {

  /**
   * yvesguilherme => [0] => y
   * first = y
   * rest = vesguilherme
   */
  static #transform({ str: [first, ...rest], upperCase = true }) {
    if (!first) {
      return '';
    }

    const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase();

    return [firstLetter, ...rest].join('');
  }

  static upperCaseFirstLetter(str) {
    return Util.#transform({ str });
  }

  static lowerCaseFirstLetter(str) {
    return Util.#transform({ str, upperCase: false });
  }
}