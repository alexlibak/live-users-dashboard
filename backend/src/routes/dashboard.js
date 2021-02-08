'use strict';

const { Router } = require('express');
const router = Router();
// const { validatePost } = require('../middlewares/validation');
const { dashboardController } = require('../controllers/index');

router.get('/', dashboardController.homepage);
router.get('/posts/:userId', dashboardController.getPosts);
router.post('/posts', dashboardController.createPost);

module.exports = router;