import { of } from 'rxjs';
import { useObservable } from '../utils/UseObservable';
import '../Styles/App.scss';
import { arr } from '../Models/Arr';
import { ListItem } from './ListItem';
import { IUser } from '../Models/Interfaces';
import { userFullName } from '../utils/ClassAndUserName';
import '../Styles/List.scss';
import { useState } from 'react';
interface IProps {
	users: IUser[];
	children: string[];
}
export const List: React.FC<IProps> = ({ users, children }: IProps) => {
	const numbers = useObservable(of(arr));
	const [pageSize, setPageSize] = useState<number>(5);
	const usersPerPage = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setPageSize(parseInt(evt.target.value));
	};
	return (
		<>
			<label htmlFor='usersPerPage' className='number-of-users'>
				Users per page
				<input
					className='users-per-page'
					type='number'
					value={pageSize}
					onChange={usersPerPage}
				/>
			</label>
			<ul className='ul-container'>
				{users &&
					users.map((user) => (
						<ListItem key={`L${userFullName(user)}`} user={user} />
					))}
			</ul>
			<ul className='ul-container'>
				{children &&
					children.map((child) => (
						<li key={child} className='li-child'>
							{child}
						</li>
					))}
			</ul>
			<div className='explanation'>
				Numbers got via useObservable(of(arr)) where arr is loaded with random
				numbers in a loop
			</div>
			<ul className='ul-container-numbers'>
				{numbers &&
					numbers.map((number) => <li key={`tt${number}`}>{number}</li>)}
			</ul>
		</>
	);
};
