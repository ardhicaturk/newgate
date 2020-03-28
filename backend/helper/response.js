const status = require('http-status')
module.exports = {
    successResponse: (res, http_status, data, statuscode) => {
        res.status(http_status).send({
            success: true,
            status_code: statuscode || http_status,
            data
        })
    },
    errorResponse: (res, http_status, message, statusError) => {
        res.status(http_status).send({
            success: false,
            status_code: statusError || http_status,
            error: message || status[http_status]
        })
    }
}