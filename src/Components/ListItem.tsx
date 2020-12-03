import React from 'react';
import { IUser } from '../Models/Interfaces';
import { userClassName, userFullName } from '../utils/ClassAndUserName';
import '../Styles/ListItem.scss';
interface IProps {
	user: IUser;
}
export const ListItem: React.FC<IProps> = ({ user }: IProps) => {
	const name = userFullName(user);
	const m = name.match(/(\w+)\s*(.*)$/);
	if (!m || m.length !== 3) {
		return null;
	}
	return (
		<li key={name} className={userClassName(user)}>
			<span className='li-title'>{m[1]}.</span>
			<span className='li-name'>{m[2]}</span>
		</li>
	);
};
