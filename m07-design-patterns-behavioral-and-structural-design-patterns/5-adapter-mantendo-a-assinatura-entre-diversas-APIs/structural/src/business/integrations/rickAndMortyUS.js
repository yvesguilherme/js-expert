import axios from 'axios';
import { parseStringPromise } from 'xml2js';

import Character from '../../entities/character.js';

const URL = 'https://gist.githubusercontent.com/ErickWendel/927970b8fa7117182413be100417607d/raw/d78adae11f5bdbff086827bf45f1bc649c339766/rick-and-morty-characters.xml';

export default class RickAndMortyUS {
  static async getCharactersFromXML() {
    const { data } = await axios.get(URL);
    const optionsXml2Js = {
      explicitRoot: false,
      explicitArray: false
    };

    const { results: { element: results = [] } } = await parseStringPromise(data, optionsXml2Js);
    const defaultFormat = Array.isArray(results) ? results : [results];
    
    return defaultFormat.map(data => new Character(data));
  }
}