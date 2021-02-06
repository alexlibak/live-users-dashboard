'use strict';

const express = require('express');
require('./src/db/connection');
const { auth, post } = require('./src/routes/index');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(auth);
app.use(post);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})