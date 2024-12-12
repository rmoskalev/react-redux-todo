import { baseApi } from '@shared/api';

import { taskSchema, TaskSchema } from '../schemas/task-schema';

export const taskApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createTask: builder.mutation<
			TaskSchema,
			{
				title: string;
				description?: string;
				priority?: 'low' | 'medium' | 'high';
			}
		>({
			query: taskData => ({
				url: '/task/create',
				method: 'POST',
				body: taskData,
			}),
			transformResponse: response => taskSchema.parse(response),
		}),
		getAllTasks: builder.query<TaskSchema[], void>({
			query: () => ({
				url: '/tasks',
				method: 'GET',
			}),
		}),
		updateTask: builder.mutation<
			TaskSchema,
			Partial<{
				id: string;
				title: string;
				description?: string;
				priority?: 'low' | 'medium' | 'high';
				status?: string;
				completed: boolean;
			}>
		>({
			query: ({ id, ...taskData }) => ({
				url: `/task/${id}`,
				method: 'PUT',
				body: taskData,
			}),
			transformResponse: response => taskSchema.parse(response),
		}),
		deleteTask: builder.mutation<void, string>({
			query: id => ({
				url: `/task/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useCreateTaskMutation,
	useGetAllTasksQuery,
	useLazyGetAllTasksQuery,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
} = taskApi;

export const {
	endpoints: { createTask, getAllTasks, deleteTask },
} = taskApi;
