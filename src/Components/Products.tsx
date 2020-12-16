import React from 'react';
import { IProduct } from '../Models/Interfaces/Interfaces';
import { formatCurrency } from '../Utils/FormatCurrency';
import '../Styles/App.scss';
import '../Styles/Products.scss';

export const Products: React.FC<IProduct[]> = (products): JSX.Element => {
	const arr: [string, IProduct][] = Object.entries(products);
	console.log('products', products);

	return (
		<div>
			<ul className='products'>
				{arr &&
					arr.map(([_, product]) => (
						<li key={product.id}>
							<div className='product'>
								<a href={`#${product.id}`}>
									{/* path is case sensitive /Images/dress1.jpg instead of /images/dress1.jpg */}
									<img
										src={product.image}
										className='product-img'
										alt={product.title}
									/>
									<p>{product.title}</p>
								</a>
								<div className='product-price'>
									<div>{formatCurrency(product.price)}</div>
									<button className='button-primary'>Add to Cart</button>
								</div>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};
