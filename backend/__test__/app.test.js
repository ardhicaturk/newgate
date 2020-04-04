const request = require('supertest');
const app = require('../app');
const { redisShutdown } = require('../config/redis');

describe('server', () => {
    it('[+] should running', async (done) => {
        const res = await request(app)
            .get('/');
        expect(res.statusCode).toEqual(404);
        done();
    })
})

afterAll(() => {
    return redisShutdown();
});