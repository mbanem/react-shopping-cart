import { IUser } from '../Models/Interfaces';

export const getClassFromFullName = (item: string) => {
	const m = item.match(/(\w+)/);
	if (m && m[0]) return m[0];
	return '';
};
export const userFullName = ({ name: { title, first, last } }: IUser) => {
	return `${title} ${first} ${last}`;
};
export const userClassName = (user: IUser) => {
	return getClassFromFullName(userFullName(user));
};
