import React, { useEffect, useRef } from 'react';
import { useObservable } from '../utils/UseObservable';
import { UsersObservable$ } from '../Models/UserNamesObservable';
import { List } from '../Components/List';
import { grandChildren } from '../Models/GrandChildren';
import { documentOnClick } from '../Tests/DocumentOnClick';

import '../Styles/App.scss';
import { createAnCallObservable } from '../Tests/CreateAndCallObservable';
import {
	actBeforeOnClickA,
	actBeforeOnClickB,
} from '../Tests/ActBeforeOnClick';

export const App = () => {
	useEffect(() => {
		// NOTE: if function is applied inside the body it would be
		// called twice, so we put it inside useEffect and if we do not
		// specify useEffect second argument (dependency array) it will be
		// called twice, before and after component renders completely
		// so we specify 2nd argument as an empty dependency ([]) so useEffect
		// will be called only once
		createAnCallObservable();
	}, []);

	const msgRef = useRef<HTMLDivElement>(null);
	const users = useObservable(UsersObservable$);

	return (
		<>
			<div className='App'>
				<h4>Ajax Get Users, useObservable, subscribe, pipe, TypeScript... </h4>

				<List users={users} children={grandChildren} />
				<div>
					Double click in the document body to start interval observable to log
					4 random numbers
				</div>
				<div>10 sec delay for rendering (x),(x**2),(x**3) + random number</div>
			</div>
			<div className='message-buttons-container'>
				Ctrl+Click to unregister event handler
				<button
					className='button'
					onClick={(evt) => documentOnClick(evt, msgRef)}
				>
					register document onClick
				</button>
				<button
					className='button'
					onClick={(evt) => {
						actBeforeOnClickA('pnDblClick actBeforeOnClick A & B', msgRef);
						actBeforeOnClickB();
					}}
				>
					execute actBeforeOnClickA, B
				</button>
				<div ref={msgRef} className='message-box'>
					Bottom buttons write messages here
				</div>
			</div>
		</>
	);
};
