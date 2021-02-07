'use strict';

const Post = require('../models/post');

//homepage
const homepage = async (req, res) => {
    try {
        res.json({message:"homepage"})
    }
    catch(err) {
        console.error(err.message)
        return res.status(500).send(err);
    }
};

const getPosts =  async ({ query: { userId }}, res) => {
    try {
        const posts = await Post.find({userId});
        return res.status(200).json(posts);
    }
    catch(err) {
        console.error(err.message);
        return res.status(500).send(err);
    }
};

const createPost = async({ body: { title, text, userId }}, res) => {
    try {
        const post = await new Post({ title, text, userId }).save();
        return res.status(200).json(post);
    }
    catch(err) {
        console.error(err.message);
        return res.status(500).send(err);
    }
};

module.exports = {
    homepage,
    getPosts,
    createPost
};