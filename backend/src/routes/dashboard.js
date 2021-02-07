'use strict';

const { Router } = require('express');
const router = Router();
// const { validatePost } = require('../middlewares/validation');
const { dashboardController } = require('../controllers/index');

router.get('/', dashboardController.homepage);
router.get('/posts', dashboardController.getPosts);
router.post('/posts', dashboardController.createPost);

module.exports = router;