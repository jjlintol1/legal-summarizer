import { QUESTION_ACTION_TYPES } from "./question.types";

const INITIAL_STATE = {
    activeDocument: {},
    questions: [],
    isLoading: false,
    error: null
}

export const questionReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case QUESTION_ACTION_TYPES.SET_ACTIVE_DOCUMENT:
            return {
                ...state,
                activeDocument: payload
            }
        case QUESTION_ACTION_TYPES.ASK_QUESTION_START:
            return {
                ...state,
                isLoading: true
            }
        case QUESTION_ACTION_TYPES.ASK_QUESTION_SUCCESS:
        case QUESTION_ACTION_TYPES.GET_QUESTIONS_SUCCESS:
        case QUESTION_ACTION_TYPES.DELETE_QUESTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                questions: payload
            }
        case QUESTION_ACTION_TYPES.CLEAR_QUESTIONS_SUCCESS:
            return {
                ...state,
                error: null,
                questions: []
            }
        case QUESTION_ACTION_TYPES.ASK_QUESTION_FAILED:
        case QUESTION_ACTION_TYPES.GET_QUESTIONS_FAILED:
        case QUESTION_ACTION_TYPES.DELETE_QUESTION_FAILED:
        case QUESTION_ACTION_TYPES.CLEAR_QUESTIONS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case QUESTION_ACTION_TYPES.RESET_ACTIVE_DOCUMENT:
            return {
                ...state,
                activeDocument: {},
                questions: []
            }
        default:
            return state;
    }
}