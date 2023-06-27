import { SUMMARY_ACTION_TYPES } from "./summary.types";
import { createAction } from '../../../utils/reducer/reducer.utils';

export const getSummaryStart = (docType, company, docUrl) => createAction(SUMMARY_ACTION_TYPES.FETCH_SUMMARY_START, {
    docType,
    company,
    docUrl
});

export const getSummarySuccess = (response) => createAction(SUMMARY_ACTION_TYPES.FETCH_SUMMARY_SUCCESS, response);

export const getSummaryFailed = (error) => createAction(SUMMARY_ACTION_TYPES.FETCH_SUMMARY_FAILED, error);

export const clearSummaryData = () => createAction(SUMMARY_ACTION_TYPES.CLEAR_SUMMARY_DATA);