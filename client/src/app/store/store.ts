import { configureStore } from '@reduxjs/toolkit/react';

import auth from '@entities/profile/models/token.slice';

import { baseApi } from '@shared/api';
import { listenerMiddleware } from '@shared/utils/auth';

const createStore = () =>
	configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer,
			auth,
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(baseApi.middleware).prepend(listenerMiddleware.middleware),
	});

export const store = createStore();
