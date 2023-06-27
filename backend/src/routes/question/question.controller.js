const Question = require('../../models/question.model');
const Document = require('../../models/document.model');
const Company = require('../../models/company.model');

const openai = require('../../config/openai/openai.config');

const { StatusCodes } = require('http-status-codes');

async function askQuestion(req, res, next) {
    try {
        const { documentId } = req.params;
        const { question } = req.body;
        const document = await Document.findById(documentId);
        const company = await Company.findById(document.company);
        const questionString = `Based on ${company.companyName}'s ${document.documentType} (${document.documentUrl}), ${question}?`;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: questionString,
            max_tokens: 4000,
            temperature: 0
        });
        const answer = response.data.choices[0].text;
        const answerSplit = answer.split('\n').filter((sent) => sent !== "");
        const newQuestion = await Question.create({
            question: question,
            answer: answerSplit,
            document: document._id
        });
        document.questions.push(newQuestion._id);
        await document.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            question: newQuestion.toObject()
        });     
    } catch (error) {
        next(error);
    }
}

async function getQuestionsAndAnswersForDocument(req, res, next) {
    try {
        const { documentId } = req.params;
        const questions = await Question.find({
            document: documentId
        }).lean();
        return res.status(StatusCodes.OK).json({
            success: true,
            questions: questions
        });   
    } catch (error) {
        next(error);
    }
}

async function deleteQuestion(req, res, next) {
    try {
        const { questionId } = req.params;
        const question = await Question.findOneAndDelete({ _id: questionId }).lean();
        await Document.updateOne(
            { _id: question.document },
            { $pull: { questions: questionId } }
        );
        return res.status(StatusCodes.OK).json({
            success: true,
            question: question
        });  
    } catch (error) {
        next(error);
    }
}

async function clearQuestions(req, res, next) {
    try {
        const { documentId } = req.params;
        let document = await Document.findById(documentId);
        document.questions = [];
        await Question.deleteMany({ document: documentId });
        await document.save();
        return res.status(StatusCodes.OK).json({
            success: true,
            document: document.toObject()
        });    
    } catch (error) {
        next(error);
    }
}

module.exports = {
    askQuestion,
    getQuestionsAndAnswersForDocument,
    deleteQuestion,
    clearQuestions
}