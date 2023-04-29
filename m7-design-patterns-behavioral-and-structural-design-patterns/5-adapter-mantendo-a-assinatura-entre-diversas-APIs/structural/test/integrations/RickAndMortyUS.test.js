import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import fs from 'fs/promises';
import axios from 'axios';

import Character from '../../src/entities/character.js';
import RickAndMortyUS from '../../src/business/integrations/rickAndMortyUS.js';

describe('#RickAndMortyUS', () => {
  beforeEach(() => jest.clearAllMocks());

  test('#getCharactersXML should return a list of Character Entity', async () => {
    const response = await fs.readFile('./test/mocks/characters.xml');
    const expected = [{ "gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "species": "Human", "status": "Dead", "type": "Superhuman (Ghost trains summoner)" }];

    // Axios mock
    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyUS.getCharactersFromXML();

    expect(result).toMatchObject(expected);
  });

  test('#getCharactersXML should return an empty list if the API returns nothing', async () => {
    const response = await fs.readFile('./test/mocks/characters-empty.xml');
    const expected = [];

    // Axios mock
    jest.spyOn(axios, 'get').mockResolvedValue({ data: response });

    const result = await RickAndMortyUS.getCharactersFromXML();

    expect(result).toStrictEqual(expected);
  });
});