'use strict';

const express = require('express');
const { authRouter, dashboardRouter } = require('./src/routes/index');
require('./src/db/connection');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(dashboardRouter);
app.use('/api/auth', authRouter);

module.exports = app;