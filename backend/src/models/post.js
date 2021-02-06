'use strict';

const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        text: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Post = model('Post', postSchema);
module.exports = Post;