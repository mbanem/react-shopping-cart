import React from 'react';
import Select, { ContainerProps, ValueType } from 'react-select';
import Tooltip from '@atlaskit/tooltip';
import '../Styles/Filter.scss';
interface IProps {
	count: number;
	size: string;
	sort: string;
	filterProductsBySize: (sort: ValueType<TOption, false>) => void;
	sortProducts: (size: ValueType<TOption, false>) => void;
}
// <option value="" selected disabled hidden>Choose here</option>
type TOption = {
	value: string;
	label: string;
	isDisabled?: boolean;
};
const optionsSort: TOption[] = [
	{ value: 'latest', label: 'Latest' },
	{ value: 'lowest', label: 'Lowest' },
	{ value: 'highest', label: 'Highest' },
];
const optionsSize: TOption[] = [
	{ value: 'XS', label: 'XS Extra Small' },
	{ value: 'S', label: 'S Small' },
	{ value: 'M', label: 'M Medium' },
	{ value: 'L', label: 'L Large' },
	{ value: 'XL', label: 'XL Extra Large' },
	{ value: 'XXL', label: 'XXL Extra-Extra Large' },
];
// ===========  FILTER COMPONENT ============
const SelectContainer: React.FC<ContainerProps<TOption, false>> = ({
	children,
	...props
}) => {
	return (
		<Tooltip content={'Select option to sort by'} delay={0}>
			<SelectContainer {...props}>{children}</SelectContainer>
		</Tooltip>
	);
};
export const FilterMemo: React.FC<IProps> = ({
	count,
	size,
	sort,
	filterProductsBySize,
	sortProducts,
}) => {
	const customStyles = {
		menuList: (base: any) => ({
			...base,
			minHeight: 60, // dropdown menu list height shrink down to 60 if no options
			maxHeight: 240,
		}),
		// un-open control w/o chevron
		control: (base: any) => ({
			...base,
			// color: 'red', // has no effect
			backgroundColor: 'cornsilk',
		}),
		valueContainer: (base: any) => ({
			...base,
			width: 160,
			// border: '2px solid blue',  // works
		}),
		// indicatorContainer: (base: any) => ({
		// 	...base,
		// 	width: 80,
		// 	border: '2px solid green',
		// 	zIndex: 5,
		// }),
		placeholder: (base: any) => ({
			...base,
			fontSize: 20,
			fontStyle: 'italic',
			padding: '0 1rem',
			color: 'red',
			// backgroundColor: '#eeeec2',
		}),
	};
	return (
		<div className='filter'>
			<div className='filter-result'>{count} Products</div>
			<div>
				<Select
					className='filter-sort'
					isClearable
					onChange={sortProducts}
					options={optionsSort}
					styles={customStyles}
					placeholder='Put on Top'
					// components={{ SelectContainer }}
				/>
			</div>
			<div>
				<Select
					className='filter-size'
					isClearable
					onChange={filterProductsBySize}
					options={optionsSize}
					styles={customStyles}
					placeholder='Select Size'
					// components={{ SelectContainer }}
				/>
			</div>
		</div>
	);
};
export const Filter = React.memo(FilterMemo);
