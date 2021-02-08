const mongoose = require('mongoose');
const Post = require('../post');
const postData = { title: 'title 1', text: 'text 1', userId: '6020658755178b8cba7e446b' };

describe('Post Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create new post', async () => {
        const post = new Post(postData);
        const result = await post.save();

        expect(result._id).toBeDefined();
        expect(result.title).toBe(postData.title);
        expect(result.text).toBe(postData.text);
        expect(result.userId.toString()).toBe(postData.userId);
    });

    it('insert post, with undefined field', async () => {
        const post = new Post({ title: 'title test', text: 'text demo', userId: '6020658755178b8cba7e446b', phone: "03-9999999" });
        const result = await post.save();
        expect(result._id).toBeDefined();
        expect(result.phone).toBeUndefined();
    });
});