import React from 'react';
import { IData } from '../Models/Interfaces/Interfaces';
import { formatCurrency } from '../Utils/FormatCurrency';
import '../Styles/App.scss';
import '../Styles/Products.scss';
/* parent should send data as <Products products={products} />
   as interface is
   export type IData = {
     products: IProduct[];
   };
   so property name products is used at parent and
   is destructured from IData at the child
*/

export const Products: React.FC<IData> = ({ products }: IData): JSX.Element => {
	// const arr: [string, IProduct][] = Object.entries(products);
	// console.log('products', products);

	return (
		<div>
			<ul className='products'>
				{products &&
					products.map((product) => (
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
