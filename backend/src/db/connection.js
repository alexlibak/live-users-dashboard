'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const LOCAL_URI = `${process.env.DB_HOST_LOCAL}:${process.env.DB_PORT_LOCAL}/${process.env.DB_NAME}`;
const URI = process.env.NODE_ENV === 'dev' ? LOCAL_URI : process.env.DB_URI;

const { Post } = require('../models/post');

///test
// const userTest = new User({
//   name: 'alex-dev',
//   email: 'alex.libak@gmail.com',
//   password: 'pass1'
// });


(async () => {
    try {
        await mongoose.connect(URI, { 
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        // const userDB = await userTest.save()
        // console.log(userDB);

    } catch (error) {
        console.error(error);
    }
})();

// const handleError = () => {
// }

// const db = mongoose.connection
mongoose.connection.once('open', _ => {
  console.log('Database connected to:', URI)
});

mongoose.connection.on('error', err => {
  console.error('connection error:', err)
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose Disconnected');
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
      console.log('Mongoose connection closed on Application Timeout');
      process.exit(0);
  })
});