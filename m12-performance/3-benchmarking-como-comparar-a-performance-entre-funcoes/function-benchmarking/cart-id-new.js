import { randomUUID as uuid } from 'crypto';

export default class CartIdNew {
  constructor() {
    this.id = uuid();
  }
}