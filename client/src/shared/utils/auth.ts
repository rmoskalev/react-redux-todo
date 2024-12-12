import { createListenerMiddleware } from '@reduxjs/toolkit';

import { profileApi } from '@entities/profile';

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
