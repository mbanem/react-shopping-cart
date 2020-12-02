import { fromEvent } from 'rxjs';

export const operatorFromFunction = (observable: any) => {
	//return the original observable
	return observable;
};

export const documentClick = () => {
	fromEvent(document, 'click')
		.pipe(operatorFromFunction) //our operator only passes the observable through
		.subscribe((value: any) => {
			console.log('value?', value);
		});
};
