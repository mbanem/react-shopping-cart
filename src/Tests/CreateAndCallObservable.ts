import { Observable } from 'rxjs';

// Creation
export const countObservable = new Observable((observer) => {
	for (let i = 0; i < 3; i++) {
		observer.next(i);
	}
});
export const createAnCallObservable = () => {
	console.log('createAnCallObservable count 0..2');

	// Usage
	countObservable.subscribe((value) => console.log(value));
};
