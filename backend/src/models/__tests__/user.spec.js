const mongoose = require('mongoose');
const User = require('../user');
const userData = { name: 'Alexander', email: 'alex@example.com', password: 'Aa123123' };

describe('User Model', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create user', async () => {
        const user = new User(userData);
        const result = await user.save();

        expect(result._id).toBeDefined();
        expect(result.name).toBe(userData.name);
        expect(result.gender).toBe(userData.gender);
        expect(result.dob).toBe(userData.dob);
        expect(result.loginUsing).toBe(userData.loginUsing);
    });

    it('create user without required field should fail', async () => {
        const userWithoutRequiredField = new User({ name: 'Vasily' });
        let err;
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error;
        };

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.password).toBeDefined();
    });
});