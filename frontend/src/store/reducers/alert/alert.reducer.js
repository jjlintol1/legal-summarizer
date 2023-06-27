import { ALERT_ACTION_TYPES } from "./alert.types";

const INITIAL_STATE = {
    expirationAlert: false
}

export const alertReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case ALERT_ACTION_TYPES.SHOW_EXPIRATION_ALERT:
            return {
                ...state,
                expirationAlert: true,
            }
        case ALERT_ACTION_TYPES.HIDE_EXPIRATION_ALERT:
            return {
                ...state,
                expirationAlert: false
            }
        default:
            return state;
    }
}