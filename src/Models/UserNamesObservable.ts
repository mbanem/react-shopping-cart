import { ajax } from 'rxjs/ajax';
import { IResult, IUser } from './Interfaces';
import { Subject } from 'rxjs';
import { map, scan, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// export const actionMap = {
// 	forward: +1,
// 	back: -1,
// };
export const action$ = new Subject<any>();
// the page in scan will accumulate the pages over time
// NOTE: looks like startWith must be specified after the scan operator
// scan: pageNo +1/-1 as the next/previous starting page
// skip is how many pages to skip when getting next page
// with skip=2 every 2nd page will be selected in collection
const skip = 1;
// NOTE: instead of action==='forward'?1:-1
// should be actionMap[action] but could not make it in typescript
export const page$ = action$.pipe(
	scan((pageNo, action) => (pageNo + action === 'forward' ? 1 : -1), skip),
	startWith(1)
);
// return full user name with title
export const getName = ({ name }: IUser) =>
	`${name.title}. ${name.first} ${name.last}`;

// url to serve users
export const UsersObservable$ = (recordsPerPage: number): Observable<any> => {
	const api = `https://randomuser.me/api/?results=${recordsPerPage}&seed=rx-react&nat=us&inc=name&noinfo`;

	// query for data and maps them into an array of strings,
	// i.e. array of full user names with title as an Observable<string[]>
	//   const names$ = ajax
	// 	.getJSON<IResult>(api)
	// 	.pipe(map((data: IResult) => data.results.map(getName)));
	//   return names$
	return page$
		.pipe(switchMap((pageNo) => ajax.getJSON<IResult>(`${api}&page=${pageNo}`)))
		.pipe(map((data) => data.results));
};
