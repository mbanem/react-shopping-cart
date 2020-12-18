import React, { useEffect, useState } from 'react';
interface IProps {
	name: string;
}
let ix = 0;
const color = ['red', 'blue'];
const View: React.FC<IProps> = ({ name }): JSX.Element => {
	return <div style={{ color: color[ix++ % 2] }}>`Hi, I'm ${name}`</div>;
};
const MemoView = React.memo(View);
export const AppMemo: React.FC = () => {
	const names = ['Peter', 'Clark'];
	const [state, setState] = useState<IProps>({ name: 'Anonymous' });

	useEffect(() => {
		setInterval(() => {
			const name = generateName();
			console.log('name', name);
			setState({ name });
		}, 1000);
	}, []);

	const generateName = () => names[Math.floor(Math.random() * names.length)];

	return <MemoView name={state.name} />;
};
