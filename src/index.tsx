// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import { ajax } from 'rxjs/ajax';
import { Observable, of, fromEvent, Subject } from 'rxjs';
import { ajax } from 'rxjs/internal/observable/dom/ajax';
import { catchError, map, scan, startWith, switchMap } from 'rxjs/operators';
import './styles.css';

export const useObservable = (
	observable: Observable<string[] | number | IUser | IUser[]>
) => {
	// initialize useState<string[]>([]) with empty array to avoid
	// typing state as string[] | undefined
	const [state, setState] = useState<string[] | number | IUser | IUser[]>();
	useEffect(() => {
		const subscription = observable.subscribe(setState);
		return () => subscription.unsubscribe();
	}, [observable]);

	return state;
};
// BEGIN -------------  Ajax fetch Users ------------
interface IUser {
	name: {
		title: string;
		first: string;
		last: string;
	};
}
const howManyRecords = 10;
const api = `https://randomuser.me/api/?results=${howManyRecords}&seed=rx-react&nat=us&inc=name&noinfo`;
/*
  this url returns for howManyRecords=2
  {"results":[
    {
      "name":{
        "title":"Mr",
        "first":"Mason",
        "last":"Holmes"
      }
    },{
      "name":{
        "title":"Mrs",
        "first":"Vanessa",
        "last":"Carlson"
      }
    }
  ]
}
*/

const observe$ = ajax.getJSON(`${api}&page=10`).pipe(
	map((response) => response),
	catchError((error) => of(error))
);
observe$.subscribe((res) => console.log(' ajax.getJSON res', res));
// ajax.getJSON(`${api}&page=10`).pipe(
// 	map((userResponse) => console.log('users: ', userResponse)),
// 	(error) => {
// 		console.log('getJSON error: ', error);
// 		return of(error);
// 	}
// );
// const getName = (user: IUser) =>
// 	`${user.name.title} ${user.name.first} ${user.name.last}`;

// -------
const actionMap: any = {
	forward: +1,
	back: -1,
};
const action$ = new Subject<any>();
// the page in scan will accumulate the pages over time
// NOTE: looks like startWith must be specified after scan method
// scan: pageNo +1/-1 as a new page number
// skip will start from pageNo +1/-1 and skip given number of pages
// with skip=2 every 2nd page will be selected
const skip = 1;
const page$ = action$.pipe(
	scan((pageNo, action) => pageNo + actionMap[action], skip),
	startWith(1)
);

// getRestaurant(): Observable<restaurant> {
//   return this.http.get<responseFormat>(environment.api + "/restaurant")
//     .map((response: responseFormat) => response.data as restaurant);
// }

const names$: Observable<IUser[]> = page$.pipe(
	switchMap((pageNo) => ajax.getJSON<IUser[]>(`${api}&page=${pageNo}`))
);
// console.log('before Ajax subscribe');
names$.pipe().subscribe((user) => {
	console.log('ajax user', user);
});
// console.log('after Ajax subscribe');
// END   -------------  Ajax fetch Users ------------

// BEGIN -------------  observable on string array ------------
// const source: string[] = ['Marko', 'Mia', 'Filip', 'Mat'];
// const namesB$ = of(source);
// console.log('', useObservable(names$))
// END -------------  observable on string array ------------

fromEvent(document, 'click').subscribe((value) => {
	console.log('doc', value);
});
fromEvent(document, 'click')
	.pipe() //what happens here?
	.subscribe((value) => {
		console.log('rx', value);
	});
// --
// An operator is a function you pass into a pipe, and pipe returns operator's observable
const operator = (observable: any) => {
	//return the original observable
	return observable;
};

fromEvent(document, 'click')
	.pipe(operator) //our operator only passes the observable through
	.subscribe((value) => {
		// console.log('value?',value)
	});

// The click observable never calls subscribe! It’s simply ignored by the operator
// We subscribe to the hi observable
const obsHi = of('original source observable'); // observable
const click = fromEvent(document, 'click'); // observable

click
	.pipe((observable) => {
		return obsHi;
	})
	.subscribe((value) => {
		// console.log('observable obsHi returns string value:', `--${value}`)
		// console.log('click.pipe(()=>obsHi === obsHi) returns true', click.pipe(() => obsHi) === obsHi)
	});

const operatorA = (observable: any) => {
	observable.subscribe((value: any) => {
		// console.log('operatorA in between:',value)
	});

	return observable;
};

const clickA = fromEvent(document, 'click').pipe(operatorA);

clickA.subscribe((value) => {
	console.log('after operatorA is done', value);
});

// Herein lies the secret sauce of operators:
//  - Create a new Observable inside the Operator
// - Subscribe to the original Observable
// - Pass different values to the next

const operatorB = (observable: any): any => {
	const newObservable = {
		//1. Create a new Observable
		subscribe: (next: any) => {
			observable.subscribe((value: any) => {
				//2. Subscribe to the original
				next(`--
  I operatorB did change the original observable returning this string
  This opens the door to do anything inside an operator!
          `); //3. Pass a different value to `next`
			});
		},
	};
	return newObservable;
};
const clickB = fromEvent(document, 'click').pipe(operatorB);
clickB.subscribe((value) =>
	console.log('onClick we get different value:', value)
);

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
function App() {
	// const names = useObservable(names$) as string[];
	return (
		<div className='App'>
			<h3>RxJS with React</h3>
			{/* {names && <List items={names} />} */}
			{/* <CountWidget/> */}
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
