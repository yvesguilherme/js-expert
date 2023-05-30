import RickAndMortyBRL from '../integrations/rickAndMortyBRL.js';

export default class RickAndMortyBRLAdapter {
  static async getCharacters() {
    return RickAndMortyBRL.getCharactersFromJSON();
  }
}