import React from 'react';
import Select, { ValueType } from 'react-select';
import '../Styles/Filter.scss';
/*
  <Select
    name="form-dept-select"
    options={departments}
    defaultValue={{ label: "Select Dept", value: 0 }}
    onChange={e => {
                this.setState({
                department: e.label,
                deptId: e.value
                });
            }}
  />
*/
// parent should send those props as <Filter count={some-number} />
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
// ===========  FILTER COMPONENT ============
export const FilterMemo: React.FC<IProps> = ({
	count,
	size,
	sort,
	filterProductsBySize,
	sortProducts,
}) => {
	const optionsSort: TOption[] = [
		{ value: '', label: 'Put on Top' },
		{ value: 'latest', label: 'Latest' },
		{ value: 'lowest', label: 'Lowest' },
		{ value: 'highest', label: 'Highest' },
	];
	const optionsSize: TOption[] = [
		{ value: '', label: 'Sort From' },
		{ value: 'XS', label: 'XS' },
		{ value: 'S', label: 'S' },
		{ value: 'M', label: 'M' },
		{ value: 'L', label: 'L' },
		{ value: 'XL', label: 'XL' },
		{ value: 'XXL', label: 'XXL' },
	];
	return (
		<div className='filter'>
			<div className='filter-result'>{count} Products</div>
			<div className='filter-sort'>
				Order from top
				<Select
					isMulti
					defaultValue={[optionsSort[0]]}
					onoChange={sortProducts}
					options={optionsSort}
					className='filter-sort'
				/>
			</div>
			<div className='filter-size'>
				Filter by size
				<Select
					onChange={filterProductsBySize}
					options={optionsSize}
					className='filter-size'
				/>
			</div>
		</div>
	);
};
export const Filter = React.memo(FilterMemo);
