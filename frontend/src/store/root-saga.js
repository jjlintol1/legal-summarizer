import { all, call } from "redux-saga/effects";

import { companySagas } from "./reducers/company/company.saga";
import { questionSagas } from "./reducers/question/question.saga";
import { summarySagas } from "./reducers/summary/summary.saga";
import { userSagas } from "./reducers/user/user.saga";

export function* rootSaga() {
    yield all([
        call(summarySagas),
        call(userSagas),
        call(companySagas),
        call(questionSagas)
    ]);
}