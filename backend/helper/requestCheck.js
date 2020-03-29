const CryptoJS = require('crypto-js')
require('dotenv').config()

const key = CryptoJS.enc.Utf8.parse(process.env.SECRET_TOKEN);
const iv = CryptoJS.enc.Base64.parse(process.env.SECRET_TOKEN);

exports.userAgentEncrypt = (req, res, next) => {
    const payload = {
        userAgent: req.headers['user-agent'],
        remoteClient: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    }
    const chiper = CryptoJS.AES.encrypt(JSON.stringify(payload), key, { iv }).toString();
    console.log("USER_AGENT_ENCRYPTED:", chiper)
    console.log("USER_AGENT:", this.userAgentDecode(chiper))
    req.userAgentEncrypt = chiper;
    next();
};
exports.userAgentDecode = (chiper) => {
    const dec = CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(chiper), salt: "" },
        key,
        {
            iv
        });
    const decStr = CryptoJS.enc.Utf8.stringify(dec);
    console.log("TESTING",{chiper, decStr})
    return decStr;
}




