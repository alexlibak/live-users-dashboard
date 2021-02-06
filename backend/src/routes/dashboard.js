'use strict';

const { Router } = require('express');
const router = Router();
// const auth = require('../middlewares/auth');

//homepage
router.get('/', async(req, res) => {
    try {
        
        res.json({message:"homepage"})
    }
    catch(err) {
        console.error(err.message)
    }
});

router.get('/posts', async(req, res) => {
    try {
        
        res.json({message:"get user posts"})
    }
    catch(err) {
        console.error(err.message)
    }
});


router.post('/posts', async(req, res) => {
    try {

        res.json({message:"create new post"})
    }
    catch(err) {
        console.error(err.message)
    }
});

module.exports = router;