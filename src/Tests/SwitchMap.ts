import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
/*
  switchMap example x -> x, x*x, x*x*x
  every value emitted by the source$ observable is transformed
  into an observable with three values x,x**2,x**3
  so when subscribed to switcherSource it will emit three times
  more value then source$
*/
const source$ = of(2, 3, 4, 5);
export const switchMapExample = () => {
	console.log('source values');
	source$.subscribe((x) => console.log(x));

	const mapper = (x: number) => {
		return of(x, x ** 2, x ** 3);
	};

	const switchedSource$ = source$.pipe(switchMap(mapper), delay(4000));

	let ix = 0;
	const label = ['base\t', 'square\t', 'cube\t'];
	switchedSource$.subscribe((x) =>
		console.log(
			label[ix++ % 3],
			`$getRemote{x}\t`,
			Math.floor((x + 10000) * Math.random())
		)
	);
};
