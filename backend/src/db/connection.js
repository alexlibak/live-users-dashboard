'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const LOCAL_URI = `${process.env.DB_HOST_LOCAL}:${process.env.DB_PORT_LOCAL}/${process.env.DB_NAME}`;
const URI = process.env.NODE_ENV === 'dev' ? LOCAL_URI : process.env.DB_URI;

(async () => {
    try {
        await mongoose.connect(URI, { 
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    } catch (error) {
        console.error(error);
    }
})();

// const handleError = () => {
// }

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