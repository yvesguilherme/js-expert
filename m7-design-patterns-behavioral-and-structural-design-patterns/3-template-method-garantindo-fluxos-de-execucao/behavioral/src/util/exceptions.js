class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} as called without an implementation`);

    this.name = 'NotImplementedException';
  }
}

export { NotImplementedException };