import { takeLatest, put, all, call } from 'redux-saga/effects';

import { SUMMARY_ACTION_TYPES } from "./summary.types";

import {
    getSummarySuccess,
    getSummaryFailed,
} from './summary.action';

import {
    fetchSummaryFromAPI
} from '../../../utils/api/gpt.utils';

export function* fetchSummary({ payload: { docType, company, docUrl } }) {
    try {
        const response = yield call(fetchSummaryFromAPI, docType, company, docUrl);
        const newSummary = response.text.map((clause) => clause.replace(/^\d+\.\s/, ""));
        const responseObj = {
            docType,
            company,
            docUrl,
            summary: newSummary
        }
        yield put(getSummarySuccess(responseObj));
    } catch (error) {
        yield put(getSummaryFailed(error));
    }
}

export function* onSummaryFetchStart() {
    yield takeLatest(SUMMARY_ACTION_TYPES.FETCH_SUMMARY_START, fetchSummary);
}

export function* summarySagas() {
    yield all([
        call(onSummaryFetchStart)
    ]);
}