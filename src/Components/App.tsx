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
		size: TOption['value'];
		sort: TOption['value'];
	}>({ size: '', sort: '' });
	const [products, setProducts] = useState<IProduct[]>(data.products);

	const sortProducts = (sort: ValueType<TOption, false>) => {};
	const filterProductsBySize = (size: ValueType<TOption, false>) => {
		console.log('size', size);
		if (size && size.value) {
			setProducts(
				data.products.filter((product) => {
					return product.availableSizes.includes(size.value);
				})
			);
		} else {
			setProducts(data.products);
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
							count={products.length}
							size={state.size}
							sort={state.sort}
							filterProductsBySize={filterProductsBySize}
							sortProducts={sortProducts}
						/>
						<Products products={products} />
					</div>
					<div className='sidebar'>Cart Items</div>
				</div>
			</main>
			<footer>All rights reserved.</footer>
		</div>
	);
};

// {products && <Products {...products} />}
