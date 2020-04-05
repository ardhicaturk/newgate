const { userAgentDecrypt, userAgentEncrypt } = require('../../../helper/requestCheck');
require('dotenv').config()
const req = {
    headers: {
        'user-agent': 'testing agent'
    },
    connection: {
        remoteAddress: 'localtest'
    }
}

let nextCheck = false
let next = () => {
    nextCheck = true
}

describe("User agent encrypt & decrypt", () => {
    it("[+] should be get string", async (done) => {
        await userAgentEncrypt(req, {status: 200}, next)
        expect(nextCheck).toEqual(true);
        expect(typeof req.userAgentEncrypt).toEqual('string');
        done()
    })

    it("[+] should be get string with custom secret", async (done) => {
        process.env.SECRET_TOKEN='tst'
        await userAgentEncrypt(req, {status: 200}, next)
        expect(nextCheck).toEqual(true);
        expect(typeof req.userAgentEncrypt).toEqual('string');
        done()
    })

    it("[+] should be same with request", async (done) => {
        await userAgentEncrypt(req, {status: 200}, next)
        const payload = await userAgentDecrypt(req.userAgentEncrypt);
        expect(typeof req.userAgentEncrypt).toEqual('string');
        const parser = JSON.parse(payload);
        expect(typeof parser).toEqual('object');
        expect(parser).toHaveProperty('userAgent')
        expect(parser).toHaveProperty('remoteClient');
        done()
    })
    
})