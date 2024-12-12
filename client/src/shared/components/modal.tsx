type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
};

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white rounded-lg p-4 w-1/2">
				<h2 className="text-lg font-bold mb-2">{title}</h2>
				<p className="text-gray-600 mb-4">{message}</p>
				<div className="flex justify-end">
					<button
						className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded-lg mr-2"
						onClick={onClose}
					>
						Отмена
					</button>
					<button
						className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
						onClick={onConfirm}
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
