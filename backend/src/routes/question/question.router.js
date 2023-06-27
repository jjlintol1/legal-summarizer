const express = require('express');

const {
    getQuestionsAndAnswersForDocument,
    askQuestion,
    deleteQuestion,
    clearQuestions
} = require('./question.controller');
const checkLoggedIn = require('../../middleware/check-logged-in');

const questionRouter = express.Router();

questionRouter.use(checkLoggedIn);

questionRouter.get('/:documentId', getQuestionsAndAnswersForDocument);
questionRouter.post('/:documentId', askQuestion);
questionRouter.delete('/:questionId', deleteQuestion);
questionRouter.delete('/clear/:documentId', clearQuestions);

module.exports = questionRouter;