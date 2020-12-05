import React from 'react';

export const message = (
	msgRef: React.RefObject<HTMLDivElement>,
	msg: string | number
) => {
	if (msgRef && msgRef.current) {
		const it = msgRef.current.innerText;
		if (!it.endsWith(msg.toString())) {
			msgRef.current.innerText += `\n${msg}`;
		}
	}
};
