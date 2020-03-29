
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
        const userAgent = req.headers['user-agent']
        if(jwtFromRequest !== undefined && jwtFromRequest !== null) {
            const payload = jwt.verify(jwtFromRequest, secretOrKey);
            rd.get(jwtFromRequest, function(err, reply) {
                if (err || reply === null) {
                    res.clearCookie('access_token');
                    rd.del(jwtFromRequest);
                    errorResponse(res, status.UNAUTHORIZED, 'token expired');
                } else {
                    if(Date.now() > payload.exp * 1000){
                        res.clearCookie('access_token');
                        rd.del(jwtFromRequest);
                        errorResponse(res, status.UNAUTHORIZED, 'token expired');
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