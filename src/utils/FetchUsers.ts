import { getApi } from '../Components/List';
import { INameUser, IUser } from '../Models/Interfaces';

// either one function signature works OK
// export const fetchUsers = (setUsers: (arr: IUser[]) => void) => {
export const fetchUsers = (
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
) => {
	const arr: IUser[] = [];
	const url = getApi();
	fetch(url)
		.then(async (response) => await response.json())
		.then((data) => {
			data.results.forEach((el: INameUser) => {
				arr.push(el.name);
			});
			setUsers(arr);
		});
	return arr;
};
