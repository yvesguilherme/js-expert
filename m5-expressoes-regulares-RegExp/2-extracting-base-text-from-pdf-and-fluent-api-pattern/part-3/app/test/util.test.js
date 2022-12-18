const { describe, it } = require('mocha');
const { expect } = require('chai');

const { InvalidRegexError, evaluateRegex } = require('./../src/util');

describe('Util', () => {
  it('#evaluateRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;

    /*
      O código abaixo fica rodando em loop e quebra tudo!
      Regex assim são chamadas de catastrophic backtracking!
      time \
      node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai você e como vai?') && console.log('legalzinho')"
    */

    expect(() => evaluateRegex(unsafeRegex))
      .to
      .throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`);
  });

  it('#evaluateRegex should not throw an error using a safe regex', () => {
    const safeRegex = /^([a-z])$/;

    expect(() => evaluateRegex(safeRegex)).to.not.throw();
    expect(evaluateRegex(safeRegex)).to.be.ok;

  });
});