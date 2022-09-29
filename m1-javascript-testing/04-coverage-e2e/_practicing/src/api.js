const http = require('http');

const DEFAULT_USER = { username: 'yvesguilherme', password: '123' };

const routes = {
  '/dashboard:get': (request, response) => {
    response.write('dashboard page');
    return response.end();
  },

  default: (request, response) => {
    response.writeHead(405);
    response.write('Method Not Allowed');
    return response.end();
  }
};

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  return chosen(request, response);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log(`app running at ${3000}`));

module.exports = app;