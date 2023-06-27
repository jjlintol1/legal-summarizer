import { COMPANY_ACTION_TYPES } from "./company.types";

const INITIAL_STATE = {
    companies: [],
    isLoading: false,
    error: null
}

export const companyReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case COMPANY_ACTION_TYPES.ADD_COMPANY_START:
        case COMPANY_ACTION_TYPES.GET_COMPANIES_START:
        case COMPANY_ACTION_TYPES.UPDATE_COMPANY_START:
        case COMPANY_ACTION_TYPES.DELETE_COMPANY_START:
        case COMPANY_ACTION_TYPES.ADD_DOCUMENT_START:
        case COMPANY_ACTION_TYPES.DELETE_DOCUMENT_START:
            return {
                ...state,
                isLoading: true
            }
        case COMPANY_ACTION_TYPES.GET_COMPANIES_SUCCESS:
        case COMPANY_ACTION_TYPES.ADD_COMPANY_SUCCESS:
        case COMPANY_ACTION_TYPES.UPDATE_COMPANY_SUCCESS:
        case COMPANY_ACTION_TYPES.DELETE_COMPANY_SUCCESS:
        case COMPANY_ACTION_TYPES.ADD_DOCUMENT_SUCCESS:
        case COMPANY_ACTION_TYPES.DELETE_DOCUMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                companies: payload
            }
        case COMPANY_ACTION_TYPES.ADD_COMPANY_FAILED:
        case COMPANY_ACTION_TYPES.GET_COMPANIES_FAILED:
        case COMPANY_ACTION_TYPES.UPDATE_COMPANY_FAILED:
        case COMPANY_ACTION_TYPES.DELETE_COMPANY_FAILED:
        case COMPANY_ACTION_TYPES.ADD_DOCUMENT_FAILED:
        case COMPANY_ACTION_TYPES.DELETE_DOCUMENT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case COMPANY_ACTION_TYPES.CLEAR_COMPANY_DATA:
            return {
                ...state,
                companies: []
            }
        default: 
            return state;
    }
}