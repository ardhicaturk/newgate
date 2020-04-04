
const jwt = require('jsonwebtoken')
const {
    errorResponse
} = require('../helper/response');
const status = require('http-status');
const { redisContext } = require('../config/redis');
require('dotenv').config();
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
        const jwtFromRequest= getAuthBearer(req.headers.authorization) || req.cookies.access_token ;
        const secretOrKey= process.env.SECRET_TOKEN;
        if(jwtFromRequest !== undefined && jwtFromRequest !== null) {
            redisContext.get(req.userAgentEncrypt, function(err, reply) {
                if (err || reply === null) {
                    res.clearCookie('access_token');
                    errorResponse(res, status.UNAUTHORIZED, 'device not found');
                    console.log("token check","device not found");
                    console.log(reply);
                } else {
                    const parser = JSON.parse(reply);
                    const redisJWT = parser.find(x => x.token === jwtFromRequest);
                    if (!redisJWT) return errorResponse(res, status.UNAUTHORIZED, 'token invalid')
                    jwt.verify(redisJWT.token, secretOrKey, (err, result) => {
                        if(err) {
                            console.log("token check","token has beed expired")
                            if(parser.length < 2) { // last record in redis and != 0
                                console.log('last one token')
                                redisContext.del(req.userAgentEncrypt)
                            } else {
                                const filtered = parser.filter(e => e.token !== jwtFromRequest);
                                redisContext.set(req.userAgentEncrypt, JSON.stringify(filtered))
                            }
                            res.clearCookie('access_token');
                            errorResponse(res, status.UNAUTHORIZED, 'token expired')
                        } else {
                            next()
                        }
                    });
                }
            });
        } else {
            errorResponse(res, status.UNAUTHORIZED, 'no token provided')
        }
        
    }
}