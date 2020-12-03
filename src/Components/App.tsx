import React, { useEffect, useRef, useState } from 'react';
import { useObservable } from '../utils/UseObservable';
import { UsersObservable$, action$ } from '../Models/UserNamesObservable';
import { List } from '../Components/List';
import { grandChildren } from '../Models/GrandChildren';
import { documentOnClick } from '../Tests/DocumentOnClick';

import '../Styles/App.scss';
import { createAnCallObservable } from '../Tests/CreateAndCallObservable';

export const App = () => {
	useEffect(() => {
		// NOTE: if function is applied inside the body it would be
		// called twice, so we put it inside useEffect and if we do not
		// specify dependency (missing []) it will be call twice, before
		// and after component renders completely
		// so we specify empty dependency (empty []) so useEffect will
		// be called only
		createAnCallObservable();
	}, []);

	const msgRef = useRef<HTMLDivElement>(null);
	const users = useObservable(UsersObservable$);
	const [pageNo, setPageNo] = useState<number>(1);
	const updateState = (delta: number) => {
		const pageNumber = pageNo + delta;
		setPageNo(pageNumber);
	};
	return (
		<>
			<div className='App'>
				<h4>Ajax Get Users, useObservable, subscribe, pipe, TypeScript... </h4>
				<div>navigate forward and backward</div>
				<div className='navigation-container'>
					<button
						disabled={pageNo <= 1}
						className='navigation-button'
						onClick={() => {
							updateState(-1);
							action$.next('back');
						}}
					>
						⇦
					</button>
					<button
						className='navigation-button'
						onClick={() => {
							updateState(1);
							action$.next('forward');
						}}
					>
						⇨
					</button>
					<span className='page-number-label'>Page No: </span>
					<span className='page-number'>{pageNo}</span>
				</div>
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
				<div ref={msgRef} className='message-box'>
					Bottom buttons write messages here
				</div>
			</div>
		</>
	);
};
