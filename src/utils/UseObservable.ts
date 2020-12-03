import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
import { IUser } from '../Models/Interfaces';
// put values from an observable<string[]> into a local state
// and return the state to the caller
export const useObservable = (observable: Observable<any>) => {
	const [state, setState] = useState<IUser[]>([]);

	useEffect(() => {
		const sub = observable.subscribe(setState);
		return () => sub.unsubscribe();
	}, [observable]);

	return state;
};
