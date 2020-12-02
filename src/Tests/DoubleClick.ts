import { interval, fromEvent } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

const clicks$ = fromEvent(document, 'dblclick');
export const documentOnDoubleClick = () => {
	const result$ = clicks$.pipe(switchMap((ev) => interval(1000).pipe(take(5))));
	result$.subscribe((x) =>
		console.log(`Click Event ${x + 1}`, Math.floor(10000 * Math.random()))
	);
};
