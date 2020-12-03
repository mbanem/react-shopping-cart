export const randomNumber = (digits: number): number => {
	return Math.floor(10 ** digits * Math.random());
};
export const stringRandomNumber = (digits: number): string => {
	return Math.floor(10 ** digits * Math.random())
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
