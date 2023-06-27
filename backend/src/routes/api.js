const express = require('express');

const authRouter = require('./auth/auth.router');
const companyRouter = require('./company/company.router');
const documentRouter = require('./document/document.router');
const questionRouter = require('./question/question.router');
const gptRouter = require('./gpt/gpt.router');


const api = express.Router();

api.use("/auth", authRouter);
api.use("/gpt", gptRouter);
api.use("/company", companyRouter);
api.use("/document", documentRouter);
api.use("/question", questionRouter);

module.exports = api;