import { fromEvent, Subscription } from 'rxjs';
import { message } from '../utils/Message';
import { countObservable } from './CreateAndCallObservable';
export const operatorFromFunction = (observable: any) => {
	// observable.subscribe((count: any) => console.log('count', count));
	console.log(
		'Log before subscribe kicks in\nfor a GIVEN observable\nand call countObservable 0..2'
	);
	countObservable.subscribe((value) => console.log(value));
	console.log('then we continue with subscribe to the given observable');
	return observable;
};
let docOnClickSubscription: Subscription;

export const documentOnClick = (
	evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	msgRef: React.RefObject<HTMLDivElement>,
	msg: string
) => {
	if (docOnClickSubscription) {
		if (evt.ctrlKey) {
			console.log('unsubscribed from document.onClick');
			return docOnClickSubscription.unsubscribe();
		} else {
			console.log('document.onClick handler is already registered');
			return null;
		}
	} else {
		message(msgRef, msg);
	}
	docOnClickSubscription = fromEvent(document, 'click')
		.pipe(operatorFromFunction) //our operator only passes the observable through
		.subscribe((value: any) => {
			if (docOnClickSubscription) {
				console.log('pos (x,y) =', `(${value.x}, ${value.y})`);
				message(msgRef, 'document.onClick (x,y) registered');
			}
		});
};
