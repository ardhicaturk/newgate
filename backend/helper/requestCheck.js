const CryptoJS = require('crypto-js')
require('dotenv').config()

const secret = (token) => {
    console.log(token)
    let secret;
    if(token.length < 16) {
        secret = token
        for (var i = token.length ; i < 16; i++){
            secret += `a`
        }
    } else {
        secret= token;
        secret = secret.substring(0, 16)
    }
    return secret
}

exports.userAgentEncrypt = (req, res, next) => {
    const key = CryptoJS.enc.Utf8.parse(secret(process.env.SECRET_TOKEN));
    const iv = CryptoJS.enc.Base64.parse(secret(process.env.SECRET_TOKEN));
    const payload = {
        userAgent: req.headers['user-agent'],
        remoteClient: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    }
    const chiper = CryptoJS.AES.encrypt(JSON.stringify(payload), key, { iv }).toString();
    req.userAgentEncrypt = chiper;
    next();
};
exports.userAgentDecrypt = (chiper) => {
    const key = CryptoJS.enc.Utf8.parse(secret(process.env.SECRET_TOKEN));
    const iv = CryptoJS.enc.Base64.parse(secret(process.env.SECRET_TOKEN));
    const dec = CryptoJS.AES.decrypt(
        chiper,
        key,
        { iv });
    const decStr = CryptoJS.enc.Utf8.stringify(dec);
    return decStr;
}