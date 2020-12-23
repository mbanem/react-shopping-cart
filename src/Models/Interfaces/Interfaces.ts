export type IProduct = {
	id: number;
	title: string;
	image: string;
	description: string;
	price: number;
	availableSizes: string[];
};
export type IData = {
	products: IProduct[];
};
