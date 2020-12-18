import * as React from 'react';
import '../Styles/FancyButton.scss';

// NOTE: button defines three scss classes where the latest two
// are used to toggle between them.
// At initialization the parent component toggle on of them so
// the other become active. On click the parent toggle both classes
// so the other one become active and that continue on subsequent clicks
type ButtonProps = React.HTMLProps<HTMLButtonElement>;
export const FancyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, buttonRef) => (
		<button
			// this buttonRef is now attached to this DOM element button
			// and the calling parent component now has access to the button
			// via buttonRef.current
			ref={buttonRef}
			onClick={props.onClick}
			className='fancy-button green blue'
		>
			{props.children}
		</button>
	)
);
