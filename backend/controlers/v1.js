const approot = require('app-root-path');
const status = require('http-status');
const {
    successResponse,
    errorResponse
} = require('../helper/response');
const db = require(approot + '/database/models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require("redis");
const rd = redis.createClient();
const validate = require('validate.js');
const cryptoRandomString = require('crypto-random-string');
const uuid = require('uuid/v4');
require('dotenv').config()
rd.on("error", function(error) {
    console.error('Redis:',error);
});

module.exports = {
    getUserIdp: (req, res, next) => {
        db.users_directories.findAndCountAll({
            include: [
                {
                    model: db.auths,
                    attributes: ['id', 'entity', 'resetToken']
                },
                {
                    model: db.auth_modes,
                    attributes: ['id', 'name']
                }
            ]
        })
        .then(recordUsers => successResponse(res, status.OK, {
            rowCount: recordUsers.count,
            rows: recordUsers.rows
        }))
        .catch(err => errorResponse(res,
            status.INTERNAL_SERVER_ERROR,
            process.env.NODE_ENV === 'development' ? err.stack : status[status.INTERNAL_SERVER_ERROR]));
    },

    /**
     * API controller /api/v1/auth/login/basic
     */
    login: (req, res, next) => {
        const body = req.body;
        db.users_directories.findOne({
            where: {email: body.email},
            include: [
                {
                    model: db.auths,
                    attributes: ['id', 'entity', 'resetToken']
                },
                {
                    model: db.auth_modes,
                    where: {id: 1},
                    attributes: ['id', 'name']
                }
            ]
        })
        .then(recordUsers => {
            if (recordUsers !== null) {
                if(bcrypt.compareSync(body.password, recordUsers.auths[0].entity)) {
                    db.users_directories.update({
                        lastLogin: new Date()
                    }, {
                        where: {
                            id: recordUsers.id
                        }
                    })
                    .then(afterUpdate => {
                        const payload= {
                            uuid: recordUsers.uuid,
                            email: recordUsers.email,
                            firstName: recordUsers.firstName,
                            lastName: recordUsers.lastLogin,
                            image: recordUsers.image,
                            role: recordUsers.roleId
                        }
                        const token = jwt.sign({
                            data: payload
                        }, process.env.SECRET_TOKEN, {
                            expiresIn: '1d'
                        })
                        const userAgent = req.headers['user-agent'];
                        const uuidUser = recordUsers.uuid;
                        rd.set(token, JSON.stringify({uuidUser,  userAgent}), redis.print);
                        rd.expire(token, 60 * 60 * 24);
                        res.cookie('access_token', token);
                        successResponse(res, status.OK, {token});
                    })
                    .catch(err => errorResponse(res,
                        status.INTERNAL_SERVER_ERROR,
                        process.env.NODE_ENV === 'development' ? err.stack : status[status.INTERNAL_SERVER_ERROR]));

                } else {
                    errorResponse(res, status.UNAUTHORIZED, 'email or password was wrong');
                }
            } else {
                errorResponse(res, status.UNAUTHORIZED, 'email or password was wrong');
            }
        })
        .catch(err => errorResponse(res,
            status.INTERNAL_SERVER_ERROR,
            process.env.NODE_ENV === 'development' ? err.stack : status[status.INTERNAL_SERVER_ERROR]))
    },

    /**
     * API controler /api/v1/auth/logout
     */
    logout: (req, res, next) => {
        try {
            rd.del(req.cookies.access_token)
            res.clearCookie('access_token');
            successResponse(res, status.OK, 'logout success')
        } catch (err) {
            errorResponse(res,
                status.INTERNAL_SERVER_ERROR,
                process.env.NODE_ENV === 'development' ? err.stack : status[status.INTERNAL_SERVER_ERROR]);
        }
    },

    /**
     * API controller /api/v1/auth/register
     */
    register: (req, res, next) => {
        const authMode = req.query.mode
        const body = req.body
        const constraint = {
            firstName: {
                presence: {
                    message: "is required"
                },
                format: {
                    pattern: /[a-zA-Z]+/
                }
            },
            lastName: {
                presence: {
                    message: "is required"
                },
                format: {
                    pattern: /[a-zA-Z]+/
                }
            },
            email: {
                presence: {
                    message: "is required"
                },
                email: {
                    message: "is not valid email"
                }
            },
             password: {
                 presence: {
                    message: "is required"
                },
                length: {
                    minimum: 6,
                    message: "must be at least 6 characters"
                },
                format: {
                    pattern: /.*[0-9].*/,
                    message: "must be at least contain 1 number"
                }
             }
        }
        if(authMode == 1) {
            const result = validate(body, constraint);
            if(result === undefined) {
                db.users_directories.findOrCreate({
                    where: { email: body.email },
                    defaults: {
                        uuid: uuid(body.email),
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        roleId: 4
                    }
                })
                .then(resultUsers => {
                    if (resultUsers[1]){
                        db.auths.create({
                            entity: bcrypt.hashSync(body.password, 10),
                            resetToken: cryptoRandomString({length: 25})
                        }).then(resultAuth => {
                            db.users_auth_modes.create({
                                usersId: resultUsers[0].id,
                                authModeId: 1,
                                authId: resultAuth.id
                            })
                            .then(resultRegister => {
                                successResponse(res, 200, 'registration success')
                            })
                            .catch(err => errorResponse(res,
                                status.UNPROCESSABLE_ENTITY,
                                process.env.NODE_ENV === 'development' ? err.stack : status[status.UNPROCESSABLE_ENTITY]));
                        }).catch(err => errorResponse(res,
                            status.UNPROCESSABLE_ENTITY,
                            process.env.NODE_ENV === 'development' ? err.stack : status[status.UNPROCESSABLE_ENTITY]));
                    } else {
                        errorResponse(res, status.UNPROCESSABLE_ENTITY, 'user already exist');
                    }
                })
                .catch(err => errorResponse(res,
                    status.UNPROCESSABLE_ENTITY,
                    process.env.NODE_ENV === 'development' ? err.stack : status[status.UNPROCESSABLE_ENTITY]));
            } else {
                errorResponse(res, status.BAD_REQUEST, result)
            }
        } else {
            errorResponse(res, status.BAD_REQUEST, "auth mode not found")
        }
    }
}