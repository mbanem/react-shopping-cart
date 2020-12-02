import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
// put values from an observable<string[]> into a local state
// and return the state to the caller
export const useObservable = (observable: Observable<any>) => {
	const [state, setState] = useState<string[]>([]);

	useEffect(() => {
		const sub = observable.subscribe(setState);
		return () => sub.unsubscribe();
	}, [observable]);

	return state;
};
