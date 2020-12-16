// Feature 1
import React from 'react';

import '../Styles/App.scss';
// import data from '../Models/data.json';
import { IData } from '../Models/Interfaces/Interfaces';
import { Products } from './Products';
// const entries = [
// 	{ size: ['XL', 'XXL'], sort: 'XL' },
// 	{ size: ['M', 'XXL', 'XXL'], sort: 'XXL' },
// ];
export const App: React.FC<IData> = ({ products }: IData): JSX.Element => {
	// const [state, setState] = useState<{
	// 	size: string[];
	// 	sort: string;
	// }>({ size: ['M', 'XL', 'XXL'], sort: 'XL' });
	// window.data = data;
	// console.log('data.length, data', data as IProduct[]);
	// console.log('data.products[0].description', products[0].description);

	return (
		<div className='grid-container'>
			<header>
				<a href='/'> React Shopping Cart </a>
			</header>
			<main>
				<div className='content'>
					<div className='main'>{products && <Products {...products} />}</div>
					<div className='sidebar'>Cart Items</div>
				</div>
			</main>
			<footer>All rights reserved.</footer>
		</div>
	);
};

// {products && <Products {...products} />}
