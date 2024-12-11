import { profileApi } from '@entities/profile';
import { createListenerMiddleware } from '@reduxjs/toolkit';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: profileApi.endpoints.login.matchFulfilled,
	effect: async (action, listenerApi) => {
		listenerApi.cancelActiveListeners();

		if (action.payload.token) {
			localStorage.setItem('token', action.payload.token);
		}
	},
});
