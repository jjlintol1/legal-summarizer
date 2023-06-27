import { QUESTION_ACTION_TYPES } from "./question.types";

import { createAction } from "../../../utils/reducer/reducer.utils";

export const setActiveDocument = (documentData) => createAction(QUESTION_ACTION_TYPES.SET_ACTIVE_DOCUMENT, documentData);

export const getQuestionsStart = (documentId) => createAction(QUESTION_ACTION_TYPES.GET_QUESTIONS_START, documentId);

export const askQuestionStart = (prevQuestions, documentId, question) => createAction(QUESTION_ACTION_TYPES.ASK_QUESTION_START, { 
    prevQuestions,
    documentId, 
    question 
});

export const deleteQuestionStart = (prevQuestions, questionId) => createAction(QUESTION_ACTION_TYPES.DELETE_QUESTION_START, {
    prevQuestions,
    questionId
});

export const clearQuestionsStart = (documentId) => createAction(QUESTION_ACTION_TYPES.CLEAR_QUESTIONS_START, documentId);

export const getQuestionsSuccess = (questions) => createAction(QUESTION_ACTION_TYPES.GET_QUESTIONS_SUCCESS, questions);

export const askQuestionSuccess = (questions) => createAction(QUESTION_ACTION_TYPES.ASK_QUESTION_SUCCESS, questions);

export const deleteQuestionSuccess = (questions) => createAction(QUESTION_ACTION_TYPES.DELETE_QUESTION_SUCCESS, questions);

export const clearQuestionsSuccess = () => createAction(QUESTION_ACTION_TYPES.CLEAR_QUESTIONS_SUCCESS);

export const getQuestionsFailed = (error) => createAction(QUESTION_ACTION_TYPES.GET_QUESTIONS_FAILED, error);

export const askQuestionFailed = (error) => createAction(QUESTION_ACTION_TYPES.ASK_QUESTION_FAILED, error);

export const deleteQuestionFailed = (error) => createAction(QUESTION_ACTION_TYPES.DELETE_QUESTION_FAILED, error);

export const clearQuestionsFailed = (error) => createAction(QUESTION_ACTION_TYPES.CLEAR_QUESTIONS_FAILED, error);

export const resetActiveDocument = () => createAction(QUESTION_ACTION_TYPES.RESET_ACTIVE_DOCUMENT);