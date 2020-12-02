import React from 'react';
import { useObservable } from '../utils/UseObservable';
import { UsersObservable$, action$ } from '../Models/UserNamesObservable';
import { List } from '../Components/List';
import { grandChildren } from '../Models/GrandChildren';

export const App = () => {
	const names = useObservable(UsersObservable$(10));
	return (
		<div className='App'>
			<h1>Ajax Get Users, useObservable, subscribe, pipe... </h1>
			<div>navigate forward and backward</div>
			<div className='navigation-container'>
				<div className='navigation-button' onClick={() => action$.next('back')}>
					⇦
				</div>
				<div
					className='navigation-button'
					onClick={() => action$.next('forward')}
				>
					⇨
				</div>
			</div>
			<List items={names} children={grandChildren} />
			<div>
				Double click in the document body to start interval observable to log 4
				random numbers
			</div>
			<div>10 sec delay for rendering (x),(x**2),(x**3) + random number</div>
		</div>
	);
};
