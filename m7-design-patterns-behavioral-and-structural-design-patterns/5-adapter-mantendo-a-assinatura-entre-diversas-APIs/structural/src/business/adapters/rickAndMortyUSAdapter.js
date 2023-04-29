import RickAndMortyUS from '../integrations/rickAndMortyUS.js';

export default class RickAndMortyUSAdapter {
  static async getCharacters() {
    return RickAndMortyUS.getCharactersFromXML();
  }
}