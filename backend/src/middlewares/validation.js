'use strict';

const joi = require('joi');

const loginSchema = {
    email: joi.string().required(),
    password: joi.string().required()
}

const signUpSchema = {
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required()
}

const createPostSchema = {
    userId: joi.string().required(),
    title: joi.string().required(),
    text: joi.string().required()
}

const validateLogin = (req, res, next) => {
    try {
        let validation = joi.object(loginSchema).validate(req.body);
        if (validation.error) {
            const error = validation?.error?.details?.[0]?.message || 'bad request'
            return res.status(400).send({error });
        }
    } catch (e) {
        return res.status(500).send(e);
    }
    next();
}

const validateSignUp = (req, res, next) => {
    try {
        let validation = joi.object(signUpSchema).validate(req.body);
        if (validation.error) {
            const error = validation?.error?.details?.[0]?.message || 'bad request'
            return res.status(400).send({error });
        }
    } catch (e) {
        return res.status(500).send(e);
    }
    next();
}

const validateCreatePost = (req, res, next) => {
    try {
        let validation = joi.object(createMailSchema).validate(req.body);
        if (validation.error) {
            const error = validation?.error?.details?.[0]?.message || 'bad request'
            return res.status(400).send({error });
        }
    } catch (e) {
        return res.status(500).send(e);
    }
    next();
}

module.exports = {
    validateLogin,
    validateSignUp,
    validateCreatePost
}