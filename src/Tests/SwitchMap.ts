import { of, Subscription } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
/*
  switchMap example x -> x, x*x, x*x*x
  every value emitted by the source$ observable is transformed
  into an observable with three values x,x**2,x**3
  so when subscribed to switcherSource it will emit three times
  more value then source$
*/
let switchMapSubscription: Subscription;
export const switchMapExample = (
	evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	msgRef: React.RefObject<HTMLDivElement>,
	msg: string
) => {
	if (switchMapSubscription) {
		if (evt.ctrlKey) {
			console.log(msg);
			return switchMapSubscription.unsubscribe();
		} else {
			console.log('switchMap handler is already registered');
			return null;
		}
	} else {
		console.log('switchMap handler registered\nreplaces x with x,x^2,x^3');
	}
	const source$ = of(2, 3);
	console.log('From Original Source');
	source$.subscribe((x) => console.log(x));
	console.log('switchMap creates\n2,2^2,2^3, 3,3^2,3^3, i.e');
	console.log(
		`%cx=( ${2},${2 ** 2},${2 ** 3},${3},${3 ** 2},${3 ** 3} )`,
		'color:blue'
	);
	const mapper = (x: number) => {
		return of(x, x ** 2, x ** 3);
	};

	const switchedSource$ = source$.pipe(switchMap(mapper), delay(4000));
	switchMapSubscription = switchedSource$.subscribe((x) => {
		x === 2 && console.log(`(x, x^2, x^3)`);
		console.log(`%c(${x}, ${x ** 2}, ${x ** 3})`, 'color:green');
	});
};
