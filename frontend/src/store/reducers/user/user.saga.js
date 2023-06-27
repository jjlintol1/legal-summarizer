import {
    takeLatest,
    put,
    all,
    call,
    select
} from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import {
    signInSuccess,
    signInFailed,
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
    signOutStart,
} from './user.action';

import { store } from '../../store';

import { signInUser, signUpUser, signOutUser } from '../../../utils/api/user.utils';
import { clearCompanyData, getCompaniesStart } from '../company/company.action';
import { resetActiveDocument } from '../question/question.action';
import { clearSummaryData } from '../summary/summary.action';
import { selectSessionExpiration } from './user.selector';
import { showExpirationAlert } from '../alert/alert.action';

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const response = yield call(signInUser, email, password);
        if (!response.success) {
            throw new Error(response.message);
        }
        const dispatch = store.dispatch;
        const sessionExpiration = setTimeout(() => {
            dispatch(showExpirationAlert());
            dispatch(signOutStart());
        }, response.user.expiration - Date.now());
        yield put(signInSuccess(response.user, sessionExpiration));
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUp({ payload: { email, password } }) {
    try {
        const response = yield call(signUpUser, email, password);
        if (!response.success) {
            throw new Error(response.message);
        }
        const dispatch = store.dispatch;
        const sessionExpiration = setTimeout(() => {
            dispatch(showExpirationAlert());
            dispatch(signOutStart());
        }, response.user.expiration - Date.now());
        yield put(signUpSuccess(response.user, sessionExpiration));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signOut() {
    try {
        const sessionExpiration = yield select(selectSessionExpiration);
        if (sessionExpiration) {
            clearTimeout(sessionExpiration);
        }
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* resetCompanyData() {
    yield put(clearSummaryData());
    yield put(clearCompanyData());
    yield put(resetActiveDocument());
}

export function* startFetchCompanies() {
    yield put(getCompaniesStart());
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignInSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_IN_SUCCESS, startFetchCompanies);
}

export function* onSignOutSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_SUCCESS, resetCompanyData);
}

export function* userSagas() {
    yield all([
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignOutStart),
        call(onSignInSuccess),
        call(onSignOutSuccess)
    ])
}