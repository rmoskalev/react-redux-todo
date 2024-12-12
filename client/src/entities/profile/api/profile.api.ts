import { z } from 'zod';

import { baseApi } from '@shared/api';

import {
	userRegisterSchema,
	UserRegisterSchema,
	userSelectSchema,
	UserSelectSchema,
} from '../schemas';

export const profileApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation<
			UserRegisterSchema,
			{ name: string; email: string; password: string }
		>({
			query: userData => ({
				url: '/register',
				method: 'POST',
				body: userData,
			}),
			transformResponse: response => userRegisterSchema.parse(response),
		}),

		login: builder.mutation<
			{ token: string },
			{ email: string; password: string }
		>({
			query: userData => ({
				url: '/login',
				method: 'POST',
				body: userData,
			}),
			transformResponse: response =>
				z.object({ token: z.string() }).parse(response),
		}),

		current: builder.query<UserSelectSchema, void>({
			query: () => ({
				url: '/user',
				method: 'GET',
			}),
			transformResponse: response => userSelectSchema.parse(response),
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation, useCurrentQuery } =
	profileApi;

export const {
	endpoints: { register, login, current },
} = profileApi;
