'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const { validateLogin, validateSignUp } = require('../middlewares/validation');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';


router.post('/signup', validateSignUp, async ({ body: { name, email, password } }, res) => {
    const user = new User({ name, email, password });
    
    try {
        const isUserExists = await User.exists({ email });
        if (isUserExists) {
            return res.status(409).send({ error : 'user already exist' });
        }
        await user.save();

        const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET);
        res.cookie('token', token);
        
        return res.status(201).send({ user, token });
    } catch (err) {
        return res.status(500).send(err); //todo
    }
});

router.post('/login', validateLogin, async ({ body: { email, password } }, res) => {
    try {
        const user = await User.findUserByCredentials(email, password);
        if (!user) {
            return res.status(404).send({ error: 'user not found' });
        }

        const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET);
        res.cookie('token', token);

        return res.status(200).send({ user, token });
    } catch (err) {
        return res.status(500).send(err); //todo
    }
});

//todo
router.post('/logout', /*  */ async ({ body: { email, password } }, res) => {
    try {
        //todo
    } catch (err) {
        return res.status(500).send('error');
    }
});

module.exports = router;