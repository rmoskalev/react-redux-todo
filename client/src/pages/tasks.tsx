import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';

import {
	useCreateTaskMutation,
	useDeleteTaskMutation,
	useGetAllTasksQuery,
	useLazyGetAllTasksQuery,
	useUpdateTaskMutation,
} from '@entities/tasks/api';
import Modal from '@shared/components/modal';
import TaskList from '@shared/components/task-list';

const Tasks = () => {
	const [title, setTitle] = useState<string>('');
	const { data: tasks, isLoading } = useGetAllTasksQuery();
	const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
	const [fetchTasks] = useLazyGetAllTasksQuery();
	const [updateTask] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [taskId, setTaskId] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await createTask({ title }).unwrap();
			setTitle('');
			fetchTasks();
		} catch (err) {
			console.error('Failed to create task: ', err);
		}
	};

	const handleUpdateTitle = async (id: string, title: string) => {
		try {
			await updateTask({ id, title });
			fetchTasks();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteTask = async (id: string) => {
		setTaskId(id);
		setIsModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (taskId) {
			try {
				await deleteTask(taskId);
				fetchTasks();
			} catch (error) {
				console.error(error);
			}
		}
		setIsModalOpen(false);
	};

	const handleToggleCompleted = async (id: string) => {
		try {
			const task = tasks?.find(task => task._id === id);
			await updateTask({ id, completed: !task?.completed });
			await fetchTasks();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="max-w-4xl mx-auto my-auto p-4 bg-gray-100 rounded">
			<h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">
				Personal TODO APP
			</h2>
			<div className="flex items-center mb-4">
				<input
					className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
					type="text"
					placeholder="Add Todo"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<button
					className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
					disabled={isCreating || isLoading}
					onClick={handleSubmit}
				>
					<BsPlus size={20} />
				</button>
			</div>
			{tasks ? (
				<TaskList
					tasks={tasks}
					onUpdateTitle={handleUpdateTitle}
					onDeleteTask={handleDeleteTask}
					onToggleCompleted={handleToggleCompleted}
				/>
			) : (
				<p>No tasks</p>
			)}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleConfirmDelete}
				title="Удалить задачу?"
				message="Вы уверены, что хотите удалить эту задачу?"
			/>
		</div>
	);
};

export default Tasks;
