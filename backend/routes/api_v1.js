const express = require('express');
const router = express.Router();
const {
  jwtCheck
} = require('../helper/tokenCheck')
const v1 = require('../controlers/v1')

router.get('/', jwtCheck,v1.getUserIdp);

router.post('/auth/login/basic', v1.login)
// router.post('/auth/logout', v1.login)


module.exports = router;
