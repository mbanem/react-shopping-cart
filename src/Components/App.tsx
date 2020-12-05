import React, { useEffect, useRef } from 'react';
import { useObservable } from '../utils/UseObservable';
import { UsersObservable$ } from '../Models/UserNamesObservable';
import { List } from '../Components/List';
import { grandChildren } from '../Models/GrandChildren';
import { documentOnClick } from '../Tests/DocumentOnClick';
import { documentOnDoubleClick } from '../Tests/DoubleClick';
import '../Styles/App.scss';
import { createAnCallObservable } from '../Tests/CreateAndCallObservable';
import { actBeforeA, actBeforeB } from '../Tests/ActBeforeOnClick';
import { replaceObservableOnClick } from '../Tests/ReplaceObservable';
import { switchMapExample } from '../Tests/SwitchMap';
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
					onClick={(evt) =>
						documentOnClick(
							evt,
							msgRef,
							'document.onclick handler registered\nnow clicking in body will render\nmouse coordinates'
						)
					}
				>
					register document onClick
				</button>
				<button
					className='button'
					onClick={(evt) => {
						actBeforeA(evt, msgRef, 'registered doc.onDblClick actBeforeA');
						actBeforeB();
					}}
				>
					register document.onDblClick actBeforeA, B
				</button>
				<button
					className='button'
					onClick={(evt) => {
						documentOnDoubleClick(evt, msgRef, 'registered doc.OnDoubleClick');
					}}
				>
					register documentOnDoubleClick
				</button>
				<button
					className='button'
					onClick={(evt) => {
						replaceObservableOnClick(
							evt,
							msgRef,
							'registered replaceObservableOnClick - see in console'
						);
					}}
				>
					register replaceObservableOnClick
				</button>
				<button
					className='button'
					onClick={(evt) => {
						switchMapExample(evt, msgRef, 'registered switchMapExample');
					}}
				>
					register switchMapExample
				</button>
				<div ref={msgRef} className='message-box'>
					Bottom buttons write messages here
				</div>
			</div>
		</>
	);
};
