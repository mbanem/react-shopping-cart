export const getClassName = (item: string) => {
	const m = item.match(/(\w+)/);
	if (m && m[0]) return m[0];
	return null;
};
