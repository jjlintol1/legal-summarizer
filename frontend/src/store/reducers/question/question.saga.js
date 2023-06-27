import { takeLatest, all, call, put } from "redux-saga/effects";

import { QUESTION_ACTION_TYPES } from "./question.types";

import {
    askQuestionFailed,
    askQuestionSuccess,
    clearQuestionsFailed,
    clearQuestionsSuccess,
    deleteQuestionFailed,
    deleteQuestionSuccess,
    getQuestionsFailed,
    getQuestionsStart,
    getQuestionsSuccess
} from './question.action';

import { httpAskQuestion, httpClearQuestions, httpDeleteQuestion, httpGetQuestionsAndAnswersForDocument } from '../../../utils/api/question.utils';

function sortQuestions(questions) {
    return questions.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
    });
}

function deleteQuestionFromState(prevQuestions, questionId) {
    const filteredQuestions = prevQuestions.filter((question) => question._id !== questionId);
    const newQuestions = sortQuestions(filteredQuestions);
    return newQuestions;
}

export function* startGetQuestions({ payload: { _id } }) {
    yield put(getQuestionsStart(_id));
}

export function* getQuestions({ payload }) {
    try {
        const response = yield call(httpGetQuestionsAndAnswersForDocument, payload);
        if (!response.success) {
            throw new Error('Failed to fetch questions');
        }
        const newQuestions = sortQuestions(response.questions);
        yield put(getQuestionsSuccess(newQuestions));
    } catch (error) {
        console.error(error);
        yield put(getQuestionsFailed(error));
    }
}

export function* askQuestion({ payload: { prevQuestions, documentId, question }}) {
    try {
        const response = yield call(httpAskQuestion, documentId, question);
        if (!response.success) {
            throw new Error('Something went wrong. Please try again');
        }
        prevQuestions.push(response.question);
        const newQuestions = sortQuestions(prevQuestions);
        yield put(askQuestionSuccess(newQuestions));
    } catch (error) {
        console.error(error);
        yield put(askQuestionFailed(error));
    }
}

export function* removeQuestion({ payload: { prevQuestions, questionId } }) {
    try {
        const response = yield call(httpDeleteQuestion, questionId);
        if (!response.success) {
            throw new Error('Unable to delete question');
        }
        const newQuestions = deleteQuestionFromState(prevQuestions, questionId);
        yield put(deleteQuestionSuccess(newQuestions));
    } catch (error) {
        console.error(error);
        yield put(deleteQuestionFailed(error));
    }
}

export function* clearQuestions({ payload }) {
    try {
        const response = yield call(httpClearQuestions, payload);
        if (!response.success || response.document.questions.length !== 0) {
            throw new Error('Unable to clear questions history');
        }
        yield put(clearQuestionsSuccess());
    } catch (error) {
        console.error(error);
        yield put(clearQuestionsFailed());
    }
}

export function* onSetActiveDocument() {
    yield takeLatest(QUESTION_ACTION_TYPES.SET_ACTIVE_DOCUMENT, startGetQuestions);
}

export function* onGetQuestionsStart() {
    yield takeLatest(QUESTION_ACTION_TYPES.GET_QUESTIONS_START, getQuestions);
}

export function* onAskQuestionStart() {
    yield takeLatest(QUESTION_ACTION_TYPES.ASK_QUESTION_START, askQuestion);
}

export function* onDeleteQuestionStart() {
    yield takeLatest(QUESTION_ACTION_TYPES.DELETE_QUESTION_START, removeQuestion);
}

export function* onClearQuestionsStart() {
    yield takeLatest(QUESTION_ACTION_TYPES.CLEAR_QUESTIONS_START, clearQuestions);
}

export function* questionSagas() {
    yield all([
        call(onSetActiveDocument),
        call(onGetQuestionsStart),
        call(onAskQuestionStart),
        call(onDeleteQuestionStart),
        call(onClearQuestionsStart)
    ]);
}

