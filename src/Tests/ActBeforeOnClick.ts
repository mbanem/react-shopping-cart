import { fromEvent, Observable, Subscription } from 'rxjs';
import { message } from '../utils/Message';

const operatorA = (observable: Observable<any>) => {
	observable.subscribe((value: any) => {
		console.log(
			`we subscribe to observable X by operatorA(X)
       allowing operatorA to subscribe to X
       before returning observable X to us`,
			value
		);
	});

	return observable;
};

let clickSubscription: Subscription;
export const actBeforeA = (
	evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	msgRef: React.RefObject<HTMLDivElement>,
	msg: string
) => {
	if (clickSubscription) {
		if (evt.ctrlKey) {
			console.log(msg);
			return clickSubscription.unsubscribe();
		} else {
			console.log('actBeforeA handler is already registered');
			return null;
		}
	} else {
		console.log(
			'actBeforeA handler registered\nnow clicking in body will render\nmouse coordinates'
		);
	}
	message(msgRef, 'registered doc.onDblClick actBefore A & B');
	const clickObservable = fromEvent(document, 'dblclick').pipe(operatorA);

	clickSubscription = clickObservable.subscribe((value) => {
		console.log('Document onClick after operatorA is done', value);
		message(msgRef, value);
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
export const actBeforeB = () => {
	const clickB = fromEvent(document, 'click').pipe(operatorB);
	clickB.subscribe((value) =>
		console.log('onClick we get different value:', value)
	);
};
