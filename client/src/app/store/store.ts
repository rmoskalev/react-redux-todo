import { configureStore } from '@reduxjs/toolkit/react';

import { tokenReducer, tokenSliceName } from '@entities/profile';

import { baseApi } from '@shared/api';

const createStore = () =>
	configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer,
			[tokenSliceName]: tokenReducer,
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(baseApi.middleware),
		devTools: import.meta.env.VITE_DEV_MODE !== 'production',
	});

export const store = createStore();
