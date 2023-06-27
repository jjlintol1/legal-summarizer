export const selectCurrentUser = (state) => state.user.currentUser;

export const selectAuthError = (state) => state.user.error;

export const selectSessionExpiration = (state) => state.user.sessionExpiration;