// The click observable never calls subscribe as is is replaced by
// another observable, which will be subscribed to
// In this case click observable is replaced by hi observable.

import { fromEvent, of, Subscription } from 'rxjs';
// import { message } from '../utils/Message';

let replaceSubscription: Subscription;
export const replaceObservableOnClick = (
	evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	msgRef: React.RefObject<HTMLDivElement>,
	msg: string
) => {
	if (replaceSubscription) {
		if (evt.ctrlKey) {
			console.log('unsubscribed from document.onClick');
			return replaceSubscription.unsubscribe();
		} else {
			console.log('document.onClick handler is already registered');
			return null;
		}
	} else {
		console.log(
			'registered doc.onclick handler to replace mouse event with string'
		);
	}
	// We subscribe to the hi observable
	// message(msgRef, msg);
	const observableHi = of('original source observable'); // observable
	const click = fromEvent(document, 'click').pipe(() => {
		return observableHi;
	});

	replaceSubscription = click.subscribe((value) => {
		console.log('replaceObservable value', value);
		// console.log(
		// 	`The click observable from document on click is an event source\n
		//   but is replaced inside pipe operator by observableHi of a string\n
		//   so we subscribe to observableHi but on document click event source`
		// );
		// console.log('observable observableHi returns string value:', `--${value}`);
		// console.log(
		// 	'click.pipe(()=>observableHi) === observableHi) returns true',
		// 	click.pipe(() => observableHi) === observableHi
		// );
	});
};
