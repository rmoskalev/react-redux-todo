import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@shared/constants';
import { AppState } from '@shared/types';

const JSON_CONTENT_TYPE = 'application/json';

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		headers: {
			'Content-Type': JSON_CONTENT_TYPE,
			Accept: JSON_CONTENT_TYPE,
		},
		prepareHeaders(headers, { getState }) {
			const state = getState() as AppState;
			const token = state.token;

			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});

export const {
	util: { resetApiState },
} = baseApi;
