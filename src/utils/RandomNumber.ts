export const randomNumber = (digits: number): number => {
	return Math.floor(10 ** digits * Math.random());
};
