import { expect, describe, test, jest, beforeEach } from '@jest/globals';

import RickAndMortyUS from '../../src/business/integrations/rickAndMortyUS';
import RickAndMortyUSAdapter from '../../src/business/adapters/rickAndMortyUSAdapter';

describe('#RickAndMortyUSAdapter', () => {
  beforeEach(() => jest.clearAllMocks());

  test('#getCharacters should be an adapter for RickAndMortyUS.getCharactersFromXML', async () => {
    const usIntegration = jest.spyOn(
      RickAndMortyUS,
      RickAndMortyUS.getCharactersFromXML.name
    ).mockResolvedValue([]);

    const result = await RickAndMortyUSAdapter.getCharacters();

    expect(result).toEqual([]);
    expect(usIntegration).toHaveBeenCalled();
  });
});