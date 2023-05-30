export default class NotImplementedException extends Error {
  constructor(message) {
    super(`the "${message}" function was not implemented.`);
    this.name = 'NotImplementedException';
  }
};