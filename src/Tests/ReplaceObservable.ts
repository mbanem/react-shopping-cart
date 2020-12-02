// The click observable never calls subscribe as is is replaced by
// another observable, which will be subscribed to
// In this case click observable is replaced by hi observable.

import { fromEvent, of } from 'rxjs';

export const replaceObservableOnClick = () => {
	// We subscribe to the hi observable
	const observableHi = of('original source observable'); // observable
	const click = fromEvent(document, 'click'); // observable

	click
		.pipe(() => {
			return observableHi;
		})
		.subscribe((value) => {
			console.log(
				`The click observable from document on click is an event source\n
       but is replaced inside pipe operator by observableHi of a string\n
       so we subscribe to observableHi but on document click event source`
			);
			console.log(
				'observable observableHi returns string value:',
				`--${value}`
			);
			console.log(
				'click.pipe(()=>observableHi) === observableHi) returns true',
				click.pipe(() => observableHi) === observableHi
			);
		});
};
