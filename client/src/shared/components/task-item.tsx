import { TaskSchema } from '@entities/tasks/schemas';
import { useState } from 'react';
import { FaCheck, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';

type TaskItemProps = {
	task: TaskSchema;
	index: number;
	onUpdateTitle: (id: string, title: string) => void;
	onDeleteTask: (id: string) => void;
	onToggleCompleted: (id: string) => void;
};

const TaskItem = ({
	task,
	index,
	onUpdateTitle,
	onDeleteTask,
	onToggleCompleted,
}: TaskItemProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(task.title);

	const handleUpdateTitle = () => {
		onUpdateTitle(task._id, newTitle);
		setIsEditing(false);
	};

	const handleDeleteTask = () => {
		onDeleteTask(task._id);
	};

	const handleToggleCompleted = () => {
		onToggleCompleted(task._id);
	};

	return (
		<li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
			<div className="flex items-center">
				<span className="mr-4 text-gray-500">{index + 1}.</span>
				{isEditing ? (
					<input
						type="text"
						value={newTitle}
						onChange={e => setNewTitle(e.target.value)}
						className="mr-4"
						autoFocus
					/>
				) : (
					<span
						className={`mr-4 ${task.completed ? 'line-through text-gray-500' : ''}`}
					>
						{task.title}
					</span>
				)}
			</div>
			<div className="space-x-3 ml-8">
				{isEditing ? (
					<button
						className="mr-2 text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
						onClick={handleUpdateTitle}
					>
						<FaSave />
					</button>
				) : (
					<button
						className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
						onClick={() => setIsEditing(true)}
					>
						<GrUpdate />
					</button>
				)}
				<button
					className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
					onClick={handleDeleteTask}
				>
					<FaTrash />
				</button>
				{!task.completed && (
					<button
						className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
						onClick={handleToggleCompleted}
					>
						<FaCheck />
					</button>
				)}
				{task.completed && (
					<button className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded">
						<FaTimes />
					</button>
				)}
			</div>
		</li>
	);
};

export default TaskItem;
