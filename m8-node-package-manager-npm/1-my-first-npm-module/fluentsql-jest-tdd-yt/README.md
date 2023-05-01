# Welcome to my first NPM Package - fluentsql

This is a simple project that aims to publish a package on [npm](https://www.npmjs.com/). It's intended for demonstration purposes only and should not be used in production projects.

## Installation

To install the package, run the following command:

```bash
npm install @yvesguilherme/fluentsql
```

## Usage

To use the package, import it into your code and call the `for()` function with data:

```js
const fluentsql = require('@yvesguilherme/fluentsql');

const result = fluentsql.for(data)
  .where() // put something...
  .select() // put something...
  .orderBy() // put something...
  .limit() // put something...
  .build();

console.table(result);
```

This will print the query to the console table.

## Contribution
This is a test project, so contributions are not expected. Feel free to use it as a reference for creating your own packages on npm.

## License
This project is licensed under the [MIT License](LICENSE).
