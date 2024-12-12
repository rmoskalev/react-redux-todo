import { TaskSchema } from '@entities/tasks/schemas';
import TaskItem from './task-item';

type TasksListProps = {
	tasks: TaskSchema[];
	onUpdateTitle: (id: string, title: string) => void;
	onDeleteTask: (id: string) => void;
	onToggleCompleted: (id: string) => void;
};
const TaskList = ({
	tasks,
	onUpdateTitle,
	onDeleteTask,
	onToggleCompleted,
}: TasksListProps) => {
	return (
		<ul>
			<li className="my-2 text-sm italic">All Your Notes Here...</li>
			{tasks.map((task, index) => (
				<TaskItem
					key={task._id}
					task={task}
					index={index}
					onUpdateTitle={onUpdateTitle}
					onDeleteTask={onDeleteTask}
					onToggleCompleted={onToggleCompleted}
				/>
			))}
		</ul>
	);
};

export default TaskList;
