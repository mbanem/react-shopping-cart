import { fromEvent, Observable } from 'rxjs';

const operatorA = (observable: Observable<any>) => {
	observable.subscribe((value: any) => {
		console.log(
			`we subscribe to observable X by operatorA(X)\n
       allowing operatorA to subscribe to X\n
       before returning observable X to us`,
			value
		);
	});

	return observable;
};

export const actBeforeOnClickA = () => {
	const clickObservable = fromEvent(document, 'click').pipe(operatorA);

	clickObservable.subscribe((value) => {
		console.log('Document onClick after operatorA is done', value);
	});
};

/*  Herein lies the secret sauce of operators:
    - Create a new Observable inside the Operator
    - Subscribe to the original Observable
    - Pass different values to the next */

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
export const actBeforeOnClickB = () => {
	const clickB = fromEvent(document, 'click').pipe(operatorB);
	clickB.subscribe((value) =>
		console.log('onClick we get different value:', value)
	);
};
