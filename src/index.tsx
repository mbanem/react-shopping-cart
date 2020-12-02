import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Components/App';
import './styles.css';

// BEGIN -------------  Ajax fetch Users ------------
// interface IUserDetails {
// 	title: string;
// 	first: string;
// 	last: string;
// }
// interface IUser {
// 	name: IUserDetails;
// }
// interface IResult {
// 	results: Array<IUser>;
// }

// const howManyRecords = 10;
// const api = `https://randomuser.me/api/?results=${howManyRecords}&seed=rx-react&nat=us&inc=name&noinfo`;

// /*  this url returns for howManyRecords=2
//   {"results":[
//     {
//       "name":{
//         "title":"Mr",
//         "first":"Mason",
//         "last":"Holmes"
//       }
//     },{
//       "name":{
//         "title":"Mrs",
//         "first":"Vanessa",
//         "last":"Carlson"
//       }
//     }
//   ]
// }*/
// // -------
// // increments or decrements the current pageNo as a starting page for fetching users
// const actionMap: any = {
// 	forward: +1,
// 	back: -1,
// };
// const action$ = new Subject<any>();
// // the page in scan will accumulate the pages over time
// // NOTE: looks like startWith must be specified after scan method
// // scan: pageNo +1/-1 as a new starting page number for fetching users
// // skip will start from pageNo +1/-1 and skip given number of pages
// // with skip=2 every 2nd page will be selected
// const skip = 1;
// const page$ = action$.pipe(
// 	scan((pageNo, action) => pageNo + actionMap[action], skip),
// 	startWith(2)
// );

// // const names$: Observable<IResult> =
// page$
// 	.pipe(switchMap((pageNo) => ajax.getJSON<IResult>(`${api}&page=${pageNo}`)))
// 	.pipe(map((data) => data.results))
// 	.subscribe((users: IUser[]) => {
// 		users
// 			.map((user) => user.name)
// 			.map((user: IUserDetails) =>
// 				console.log('user details', `${user.title}. ${user.first} ${user.last}`)
// 			);
// 	});

// console.log('after Ajax subscribe');

// END   -------------  Ajax fetch Users ------------

// --
// An operator is a function you pass into a pipe, and pipe returns operator's observable

// The click observable never calls subscribe! It’s simply ignored by the operator
// We subscribe to the hi observable
// const obsHi = of('original source observable'); // observable
// const click = fromEvent(document, 'click'); // observable

// click
// 	.pipe(() => {
// 		return obsHi;
// 	})
// 	.subscribe((value) => {
// 		// console.log('observable obsHi returns string value:', `--${value}`)
// 		// console.log('click.pipe(()=>obsHi === obsHi) returns true', click.pipe(() => obsHi) === obsHi)
// 	});

// const operatorA = (observable: any) => {
// 	observable.subscribe((value: any) => {
//     console.log(
//       `we subscribe to observable X by operatorA(X)\n
//        allowing operatorA to subscribe to X\n
//        before returning observable X to us`,value)
// 	});

// 	return observable;
// };

// const clickA = fromEvent(document, 'click').pipe(operatorA);

// clickA.subscribe((value) => {
// 	console.log('after operatorA is done', value);
// });

// Herein lies the secret sauce of operators:
//  - Create a new Observable inside the Operator
// - Subscribe to the original Observable
// - Pass different values to the next

// const operatorB = (observable: any): any => {
// 	const newObservable = {
// 		//1. Create a new Observable
// 		subscribe: (next: any) => {
// 			observable.subscribe((value: any) => {
// 				//2. Subscribe to the original
// 				next(`--
//   I operatorB did change the original observable returning this string
//   This opens the door to do anything inside an operator!
//           `); //3. Pass a different value to `next`
// 			});
// 		},
// 	};
// 	return newObservable;
// };
// const clickB = fromEvent(document, 'click').pipe(operatorB);
// clickB.subscribe((value) =>
// 	console.log('onClick we get different value:', value)
// );

// BEGIN -----------------     subject with action     ------------
// const actionB$ = new Subject();
// // // map the actionB strings to a state update number
// const update$ = actionB$.pipe(
// 	map((actionB) => (actionB === 'increment' ? +1 : -1))
// );
// update the state by summing the state and the update
// const count$ = update$.pipe(
// 	startWith(0),
// 	scan((count, update) => count + update)
// );
// END -----------------     subject with action     ------------

// const CountWidget = () => {
// 	const count = useObservable(count$);
// 	return (
// 		<div className='count-widget'>
// 			<button onClick={() => action$.next('decrement')}>-</button>
// 			<span>{count}</span>
// 			<button onClick={() => action$.next('increment')}>+</button>
// 		</div>
// 	);
// };

// interface IProps {
// 	items: string[];
// }
// const List: React.FC<IProps> = ({ items }: IProps) => {
// 	return (
// 		<>
// 			<ul className='li-item'>
// 				{items.map((item: string) => (
// 					<li key={item}>{item}</li>
// 				))}
// 			</ul>
// 		</>
// 	);
// };

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
