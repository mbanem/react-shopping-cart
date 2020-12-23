// Feature 1
import React, { useState } from 'react';
import { ValueType } from 'react-select';
import '../Styles/App.scss';
import { IData, IProduct } from '../Models/Interfaces/Interfaces';
import { Products } from './Products';
import { Filter } from './Filter';
// const entries = [
// 	{ size: ['XL', 'XXL'], sort: 'XL' },
// 	{ size: ['M', 'XXL', 'XXL'], sort: 'XXL' },
// ];
interface TOption {
	value: string;
	label: string;
}
// -------------  The App ----------------
export const App: React.FC<IData> = (data: IData): JSX.Element => {
	const [state, setState] = useState<{
		products: IProduct[];
		size: TOption['value'];
		sort: TOption['value'];
	}>({ products: data.products, size: '', sort: '' });
	// const [products, setProducts] = useState<IProduct[]>(data.products);

	const sortProducts = (value: ValueType<TOption, false>) => {
		if (!value) {
			setState({
				...state,
				// put in the same order as specified in the data json object
				products: data.products.sort((a, b) => (a.id > b.id ? 1 : -1)),
			});
		} else {
			const sort = (value as TOption).value;
			setState({
				...state,
				products: data.products.sort((a, b) => {
					return sort === 'lowest'
						? a.price < b.price
							? -1
							: 1
						: sort === 'highest'
						? a.price > b.price
							? -1
							: 1
						: a.id > b.id
						? -1
						: 1;
				}),
			});
		}
		// console.log('sort.value', sort, typeof sort);
	};
	const filterProductsBySize = (size: ValueType<TOption, false>) => {
		if (size && size.value) {
			setState({
				...state,
				products: data.products.filter((product) => {
					return product.availableSizes.includes(size.value);
				}),
			});
		} else {
			setState({ ...state, products: data.products });
		}
	};
	return (
		<div className='grid-container'>
			<header>
				<a href='/'> React Shopping Cart </a>
			</header>
			<main>
				<div className='content'>
					<div className='main'>
						<Filter
							count={state.products.length}
							size={state.size}
							sort={state.sort}
							filterProductsBySize={filterProductsBySize}
							sortProducts={sortProducts}
						/>
						<Products products={state.products} />
					</div>
					<div className='sidebar'>Cart Items</div>
				</div>
			</main>
			<footer>All rights reserved.</footer>
		</div>
	);
};

// {products && <Products {...products} />}
