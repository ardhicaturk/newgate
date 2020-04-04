const request = require('supertest');
const app = require('../../app');
const { redisShutdown, redisContext } = require('../../config/redis');
require('dotenv').config();
const URI_API_V1 = '/api/v1';

let token, token2

beforeAll(async () => {
    process.env['TOKEN_EXP'] = '5s';
    const res = await request(app)
        .post(URI_API_V1 + '/auth/login/basic')
        .send({
            email: "tester@example.com",
            password: "testing"
        })
        .set('Accept', 'application/json')
    setTimeout(async () => {
        const res2 = await request(app)
            .post(URI_API_V1 + '/auth/login/basic')
            .send({
                email: "tester@example.com",
                password: "testing"
            })
            .set('Accept', 'application/json')

        token2 = res2.body.data.token
    }, 1000)
    
    token = res.body.data.token
})

describe('Endpoint V1 ', () => {
    it('[-] should 401 -> empty token', async (done) => {
        const res = await request(app)
            .get(URI_API_V1 + '/');
        expect(res.statusCode).toEqual(401);
        done();
    });

    it('[+] should 200 -> valid token', async (done) => {
        const res = await request(app)
            .get(URI_API_V1 + '/')
            .set('authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        done();
    });
    
    it('[-] should 401 -> invalid user agent', async (done) => {
        const res = await request(app)
            .get(URI_API_V1 + '/')
            .set('authorization', `Bearer ${token}`)
            .set('User-Agent', `ngawur`);
        expect(res.statusCode).toEqual(401);
        done();
    });
    it('[-] should 401 -> invalid token format', async (done) => {
        const res = await request(app)
            .get(URI_API_V1 + '/')
            .set('authorization', `bbjhbjhbhjbhbhbjhx`)
        expect(res.statusCode).toEqual(401);
        done();
    });
    it('[-] should 401 -> invalid token', async (done) => {
        const res = await request(app)
            .get(URI_API_V1 + '/')
            .set('authorization', `Bearer bbjhbjhbhjbhbhbjhx`)
        expect(res.statusCode).toEqual(401);
        done();
    });
    it('[-] should 401 -> exp token', async (done) => {
        setTimeout(async () => {
            console.log('res 1')
            const res = await request(app)
                .get(URI_API_V1 + '/')
                .set('authorization', `Bearer ${token}`)
            expect(res.statusCode).toEqual(401);
        }, 5*1000)
        setTimeout(async () => {
            console.log('res 2')
            const res2 = await request(app)
                .get(URI_API_V1 + '/')
                .set('authorization', `Bearer ${token2}`)
            
            expect(res2.statusCode).toEqual(401);
            done();
        }, 6*1000)
    });
    
});

afterAll(() => {
    return redisShutdown();
});