import { v4 as uuid } from 'uuid';

export default class CartIdOld {
  constructor() {
    this.id = uuid();
  }
}