import BaseError from './base/baseError.js';

export default class BusinessError extends BaseError {
  constructor(errorMessage) {
    super({
      message: errorMessage,
      name: 'BusinessError'
    });
  }
}