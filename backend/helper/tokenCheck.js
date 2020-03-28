
const jwt = require('jsonwebtoken')
const {
    errorResponse
} = require('../helper/response');
const status = require('http-status');
require('dotenv').config();

const getAuthBearer = (header) => {
    return header.split(' ')[0].toLowerCase() === 'bearer' ? header.split(' ')[1] : undefined;
}

module.exports= {
    jwtCheck: (req, res, next) => {
        /**
         * token from authorization header with the scheme 'bearer' or cookie 'access_token
         */
        const jwtFromRequest= req.cookies.access_token || getAuthBearer(req.headers.authorization);
        const secretOrKey= process.env.SECRET_TOKEN;
        if(jwtFromRequest !== undefined && jwtFromRequest !== null) {
            const payload = jwt.verify(jwtFromRequest, secretOrKey);
            if(Date.now() > payload.exp * 1000){
                errorResponse(res, status.UNAUTHORIZED, 'session expied')
            } else {
                next();
            }
        } else {
            errorResponse(res, status.UNAUTHORIZED, 'no token provided')
        }
        
    }
}