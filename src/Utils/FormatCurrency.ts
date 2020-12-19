export const formatCurrency = (num: number) => {
	const dec = ['.00', '0', ''];
	const m = num.toLocaleString().match(/(\d+)\.?(\d*)?/);
	if (m) {
		const length = m[2] ? m[2].length : 0;
		return `$${num}${dec[length]}`;
	}
	throw new Error(`formatCurrency: invalid entry ${num}`);
};
