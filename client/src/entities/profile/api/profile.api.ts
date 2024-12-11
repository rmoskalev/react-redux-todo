import { baseApi } from '@shared/api';
import { z } from 'zod';
import { userSelectSchema, UserSelectSchema } from '../schemas';

const USER_TAG = 'User';

export const {
	endpoints: profileEndpoints,
	useRegisterUserMutation,
	useLoginUserMutation,
	useUserSelectQuery,
	useLazyUserSelectQuery,
	useLogoutUserMutation,
} = baseApi.enhanceEndpoints({ addTagTypes: [USER_TAG] }).injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		registerUser: builder.mutation<
			UserSelectSchema,
			{ name: string; email: string; password: string }
		>({
			invalidatesTags: [USER_TAG],
			query: body => ({
				url: '/register',
				method: 'POST',
				body,
			}),
			transformResponse: response => userSelectSchema.parse(response),
		}),

		loginUser: builder.mutation<
			{ token: string },
			{ email: string; password: string }
		>({
			query: body => ({
				url: '/login',
				method: 'POST',
				body,
			}),
			transformResponse: response =>
				z.object({ token: z.string() }).parse(response),
		}),

		userSelect: builder.query<UserSelectSchema, void>({
			providesTags: [USER_TAG],
			query: () => ({
				url: '/user',
				method: 'GET',
			}),
			transformResponse: response => userSelectSchema.parse(response),
		}),

		logoutUser: builder.mutation<void, void>({
			invalidatesTags: [USER_TAG],
			query: () => ({
				url: '/logout',
				method: 'GET',
			}),
		}),
	}),
});
