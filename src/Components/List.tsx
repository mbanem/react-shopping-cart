import { of } from 'rxjs';
import { useObservable } from '../utils/UseObservable';
import '../Styles/App.scss';
import { arr } from '../Models/Arr';
import { ListItem } from './ListItem';
import { IUser } from '../Models/Interfaces';
import { userFullName } from '../utils/ClassAndUserName';
import '../Styles/List.scss';
import { useState } from 'react';
import { action$ } from '../Models/UserNamesObservable';
import { setFetchPageSize } from '../Models/UserNamesObservable';

interface IProps {
	users: IUser[];
	children: string[];
}

export const List: React.FC<IProps> = ({ users, children }: IProps) => {
	const numbers = useObservable(of(arr));
	const [pSize, setPSize] = useState<string>('5');
	const [pageNo, setPageNo] = useState<number>(1);

	// const usersPPage = (evt: React.ChangeEvent<HTMLInputElement>) => {
	// 	// const val = parseInt()
	// 	setPSize(evt.target.value);
	// };
	const updateState = (delta: number) => {
		const pageNumber = pageNo + delta;
		setPageNo(pageNumber);
	};
	const usersPerPage = () => {
		const val = parseInt(pSize);
		setFetchPageSize(val);
	};
	return (
		<>
			<div>navigate forward and backward</div>
			<div className='navigation-container'>
				<button
					disabled={pageNo <= 1}
					className='navigation-button'
					onClick={() => {
						usersPerPage();
						updateState(-1);
						action$.next('back');
					}}
				>
					⇦
				</button>
				<button
					className='navigation-button'
					onClick={() => {
						usersPerPage();
						updateState(1);
						action$.next('forward');
					}}
				>
					⇨
				</button>
				<span className='page-number-label'>Page No: </span>
				<span className='page-number'>{pageNo}</span>
			</div>
			<label htmlFor='usersPerPage' className='number-of-users'>
				Users per page
				<input
					className='users-per-page'
					type='text'
					value={pSize}
					onChange={(e) => setPSize(e.target.value)}
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
