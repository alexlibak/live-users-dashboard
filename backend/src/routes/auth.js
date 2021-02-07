'use strict';

const { Router } = require('express');
const router = Router();
const { validateLogin, validateSignUp } = require('../middlewares/validation');
const { authController } = require('../controllers/index');

router.post('/signup', validateSignUp, authController.authSignUp);
router.post('/login', validateLogin, authController.authLogin);

//todo
router.post('/logout', /*  auth, */);

module.exports = router;