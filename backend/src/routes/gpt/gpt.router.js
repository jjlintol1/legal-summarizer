const express = require('express');
const { getSummary } = require('./gpt.controller');
const checkLoggedIn = require('../../middleware/check-logged-in');

const gptRouter = express.Router();

gptRouter.use(checkLoggedIn);

gptRouter.post("/", getSummary);

module.exports = gptRouter