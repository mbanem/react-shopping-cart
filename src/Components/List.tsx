import { useEffect, useState } from 'react';
import { IUser } from '../Models/Interfaces';
import { ListItem } from './ListItem';
import { fetchUsers } from '../utils/FetchUsers';
import { userFullName } from '../utils/ClassAndUserName';
import '../Styles/App.scss';
import '../Styles/List.scss';

interface IProps {
	children: string[];
}
let pageSize = 5;
let pageNumber = 1;
export const getApi = () => {
	return `https://randomuser.me/api/?results=${pageSize}&seed=rx-react&nat=us&inc=name&noinfo&page=${pageNumber}`;
};
export const List: React.FC<IProps> = ({ children }: IProps) => {
	// const numbers = useObservable(of(arr));
	const [pSize, setPSize] = useState<number>(5);
	const [pageNo, setPageNo] = useState<number>(1);
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		fetchUsers(setUsers);
	}, []);
	const getRequestedPage = (delta: number) => {
		pageNumber = pageNo + delta;
		setPageNo(pageNumber);
		fetchUsers(setUsers);
	};
	const setPageSize = (val: string) => {
		pageSize = parseInt(val);
		setPSize(pageSize);
	};
	return (
		<>
			<div>navigate forward and backward</div>
			<div className='navigation-container'>
				<button
					disabled={pageNo <= 1}
					className='navigation-button'
					onClick={() => {
						getRequestedPage(-1);
					}}
				>
					⇦
				</button>
				<button
					className='navigation-button'
					onClick={() => {
						getRequestedPage(1);
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
					onChange={(e) => setPageSize(e.target.value)}
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
			{/* <ul className='ul-container-numbers'>
				{numbers &&
					numbers.map((number) => <li key={`tt${number}`}>{number}</li>)}
			</ul> */}
		</>
	);
};
