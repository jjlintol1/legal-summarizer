import { createAction } from "../../../utils/reducer/reducer.utils";
import { ALERT_ACTION_TYPES } from "./alert.types";

export const showExpirationAlert = () => createAction(ALERT_ACTION_TYPES.SHOW_EXPIRATION_ALERT);

export const hideExpirationAlert = () => createAction(ALERT_ACTION_TYPES.HIDE_EXPIRATION_ALERT);