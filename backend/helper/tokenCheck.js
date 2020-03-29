
const jwt = require('jsonwebtoken')
const {
    errorResponse
} = require('../helper/response');
const status = require('http-status');
const redis = require("redis");
const rd = redis.createClient();
require('dotenv').config();
rd.on("error", function(error) {
    console.error('Redis:',error);
});
const getAuthBearer = (header) => {
    if (header) return header.split(' ')[0].toLowerCase() === 'bearer' ? header.split(' ')[1] : undefined;
}

module.exports= {
    /**
     * Validate jwt token from cookies or headers
     */
    jwtCheck: (req, res, next) => {
        /**
         * token from authorization header with the scheme 'bearer' or cookie 'access_token
         */
        const jwtFromRequest= req.cookies.access_token || getAuthBearer(req.headers.authorization);
        const secretOrKey= process.env.SECRET_TOKEN;
        if(jwtFromRequest !== undefined && jwtFromRequest !== null) {
            rd.get(req.userAgentEncrypt, function(err, reply) {
                if (err || reply === null) {
                    res.clearCookie('access_token');
                    errorResponse(res, status.UNAUTHORIZED, 'token expired');
                    console.log("token check","redis record error or not found")
                    console.log(reply)
                } else {
                    const parser = JSON.parse(reply)
                    const index = parser.findIndex(x => x.token === jwtFromRequest)
                    const payload = jwt.verify(parser[index], secretOrKey);
                    if(Date.now() > payload.exp * 1000){
                        res.clearCookie('access_token');
                        const filtered = parser.filter(e => e.token !== jwtFromRequest)
                        console.log("token check","teken has beed expired")
                        if(filtered.length === 0) {
                            rd.del(req.userAgentEncrypt)
                            res.clearCookie('access_token');
                            successResponse(res, status.UNAUTHORIZED, 'token expired')
                        } else {
                            rd.set(req.userAgentEncrypt, JSON.stringify(filtered))
                            res.clearCookie('access_token');
                            successResponse(res, status.UNAUTHORIZED, 'token expired')
                        }
                    } else {
                        next();
                    }
                }
            });
        } else {
            errorResponse(res, status.UNAUTHORIZED, 'no token provided')
        }
        
    }
}