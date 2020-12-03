import { stringRandomNumber } from '../utils/RandomNumber';
export const arr: Array<string> = [];
for (let x = 0; x < 5; x++) {
	const digits = 3 + Math.floor(Math.random() * 10);
	arr.push(stringRandomNumber(digits));
}
