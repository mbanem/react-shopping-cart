import { of } from 'rxjs';
import { useObservable } from '../utils/UseObservable';
import './index.css';
import { arr } from '../Models/Arr';
interface IProps {
	items: string[];
	children: string[];
}
export const List: React.FC<IProps> = ({ items, children }) => {
	const numbers = useObservable(of(arr));

	return (
		<>
			<div>Lists 10 users per page</div>
			<ul className='ul-container'>
				{items &&
					items.map((item) => <ListItem key={`xx${item}`} item={item} />)}
			</ul>
			<ul className='ul-container'>
				{children &&
					children.map((child) => (
						<li key={child} className='li-child'>
							{child}
						</li>
					))}
			</ul>
			<pre>
				{`
  Numbers got via useObservable(of(arr))
  where arr is loaded with random numbers
  in a loop
      `}
			</pre>
			<ul className='ul-container'>
				{numbers &&
					numbers.map((number) => <li key={`tt${number}`}>{number}</li>)}
			</ul>
		</>
	);
};
