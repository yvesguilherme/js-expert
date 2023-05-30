import http from 'http';

/**
 * Decorator, middleware and Interceptor have the same name. 
 */
async function InjectHttpInterceptor() {
  const oldEmit = http.Server.prototype.emit;
  // ...args, should be checked in the documentation.
  http.Server.prototype.emit = function (...args) {
    const [type, req, response] = args;

    if (type === 'request') {
      response.setHeader('X-Instrumented-By', 'YvesGuilherme');
    }

    return oldEmit.apply(this, args);
  };
}

export { InjectHttpInterceptor };