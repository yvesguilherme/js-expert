const { describe, it } = require("mocha");
const request = require('supertest');
const assert = require('assert');

const app = require('./api');

describe('Api suite test', () => {
  describe('/dashboard', () => {
    it('should request the dashboard page and return HTTP status 200', async () => {
      const response = await request(app)
        .get('/dashboard')
        .expect(200);

      assert.ok(response.ok)
      assert.deepStrictEqual(response.text, 'dashboard page');
    });
  });

  describe('/anyRoute', () => {
    it('should request an inexistent route and returns Method Not Allowed', async () => {
      const response = await request(app)
        .get('/anyRoute')
        .expect(405);

      assert.deepStrictEqual(response.text, 'Method Not Allowed');
    });
  });

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'batman', password: '123' })
        .expect(200);

      assert.deepStrictEqual(response.text, 'Login has succeeded!');
    });

    it('should unauthorize a request when requesting it using wrong credentials and return HTTP status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'superman', password: '321' })
        .expect(401);

      assert.deepStrictEqual(response.text, 'Logging failed!');
    });
  });
});