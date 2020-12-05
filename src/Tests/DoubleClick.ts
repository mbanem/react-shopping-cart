import { interval, fromEvent } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { message } from '../utils/Message';

const clicks$ = fromEvent(document, 'dblclick');

export const documentOnDoubleClick = (
	evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	msgRef: React.RefObject<HTMLDivElement>,
	msg: string
) => {
	message(msgRef, msg);
	const result$ = clicks$.pipe(switchMap((ev) => interval(1000).pipe(take(5))));
	result$.subscribe((x) => message(msgRef, Math.floor(10000 * Math.random())));
};
