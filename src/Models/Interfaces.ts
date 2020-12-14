export interface IUser {
	title: string;
	first: string;
	last: string;
}
// instead of user, here for a person container is chosen name
export interface INameUser {
	name: IUser;
}
// what getJSON returns
export interface IResult {
	results: Array<INameUser>;
}
