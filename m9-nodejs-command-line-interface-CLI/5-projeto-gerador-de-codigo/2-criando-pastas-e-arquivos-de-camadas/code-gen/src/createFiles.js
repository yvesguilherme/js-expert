import fsPromises from 'fs/promises';
import fs from 'fs';

import templates from './templates/index.js';
import Util from './util.js';

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [
      `${componentName}Repository`
    ],
    factory: [
      `${componentName}Repository`,
      `${componentName}Service`
    ]
  };

  // it may come as 'Product'.
  return dependencies[layer].map(Util.lowerCaseFirstLetter);
};

async function executeWrites(pendingFilesToWrite) {
  return Promise.all(
    pendingFilesToWrite.map(({ fileName, txtFile }) => fsPromises.writeFile(fileName, txtFile))
  );
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
  const keys = Object.keys(templates);

  const pendingFilesToWrite = [];
  for (const layer of layers) {
    /**
     * keys = [
     *    factoryTemplate,
     *    serviceTemplate,
     *    repositoryTempalte
     * ];
     * 
     * layers = ['inexistent']
     */
    const chosenTemplate = keys.find(key => key.includes(layer));

    if (!chosenTemplate) {
      return { error: 'The chosen layer doesn\'t have a template.' };
    }

    const template = templates[chosenTemplate];
    // Example: /usr/Document/jsexpert/yves/src/factory
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;
    const dependencies = defaultDependencies(layer, componentName);
    const { fileName: className, template: txtFile } = template(componentName, ...dependencies);
    // Example:  /usr/Document/jsexpert/yves/src/factory/heroesFactory.js
    const fileName = `${targetFolder}/${Util.lowerCaseFirstLetter(className)}.js`;

    pendingFilesToWrite.push({ fileName, txtFile });
  }

  await executeWrites(pendingFilesToWrite);

  return { success: true };
}