const express = require('express');
const router = express.Router();
const {
  jwtCheck
} = require('../helper/tokenCheck')
const v1 = require('../controlers/v1')

router.get('/', jwtCheck, v1.getUserIdp);

router.post('/auth/login/basic', v1.login)
router.get('/auth/logout', jwtCheck, v1.logout)
router.post('/auth/register', v1.register)

module.exports = router;
