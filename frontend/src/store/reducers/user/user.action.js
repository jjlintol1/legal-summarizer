import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (currentUser, sessionExpiration) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, { currentUser, sessionExpiration });

export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email, password) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password });

export const signUpSuccess = (currentUser, sessionExpiration) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { currentUser, sessionExpiration });

export const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

