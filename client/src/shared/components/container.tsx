type Props = {
	children: React.ReactElement[] | React.ReactElement;
};

export const Container: React.FC<Props> = ({ children }) => {
	return (
		<div className="flex w-screen h-screen justify-center items-center">
			{children}
		</div>
	);
};
