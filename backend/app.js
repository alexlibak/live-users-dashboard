'use strict';

const express = require('express');
const { authRouter, dashboardRouter } = require('./src/routes/index');
require('./src/db/connection');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(dashboardRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})