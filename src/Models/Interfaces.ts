export interface IUserDetails {
	title: string;
	first: string;
	last: string;
}
// instead of user, here for a person container is chosen name
export interface IUser {
	name: IUserDetails;
}
// what getJSON returns
export interface IResult {
	results: Array<IUser>;
}
