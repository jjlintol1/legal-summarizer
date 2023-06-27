import { SUMMARY_ACTION_TYPES } from "./summary.types";


const INITIAL_STATE = {
    summary: [],
    docType: "",
    company: "",
    docUrl: "",
    isLoading: false,
    error: null
};

export const summaryReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case SUMMARY_ACTION_TYPES.FETCH_SUMMARY_START:
            return {
                ...state,
                isLoading: true,
            };
        case SUMMARY_ACTION_TYPES.FETCH_SUMMARY_SUCCESS:
            return {
                ...state,
                ...payload,
                isLoading: false
            };
        case SUMMARY_ACTION_TYPES.FETCH_SUMMARY_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case SUMMARY_ACTION_TYPES.CLEAR_SUMMARY_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
}