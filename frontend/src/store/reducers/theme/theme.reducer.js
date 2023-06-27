import { THEME_ACTION_TYPES } from "./theme.types";

const INITIAL_STATE = {
    themeMode: 'light'
}

export const themeReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case THEME_ACTION_TYPES.TOGGLE_THEME_MODE:
            return {
                ...state,
                themeMode: payload
            }
        default:
            return state;
    }
}