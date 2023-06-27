import { combineReducers } from "redux";
import { alertReducer } from "./reducers/alert/alert.reducer";
import { companyReducer } from "./reducers/company/company.reducer";
import { questionReducer } from "./reducers/question/question.reducer";
import { summaryReducer } from "./reducers/summary/summary.reducer";
import { themeReducer } from "./reducers/theme/theme.reducer";
import { userReducer } from "./reducers/user/user.reducer";

export const rootReducer = combineReducers({
    summary: summaryReducer,
    theme: themeReducer,
    user: userReducer,
    company: companyReducer,
    question: questionReducer,
    alert: alertReducer
});