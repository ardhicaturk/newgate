const approot = require('app-root-path');
const status = require('http-status');
const {
    successResponse,
    errorResponse
} = require('../helper/response');
const db = require(approot + '/database/models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()


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
    }
}