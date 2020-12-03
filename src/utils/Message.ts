import React from 'react';

export const message = (
	msgRef: React.RefObject<HTMLDivElement>,
	msg: string
) => {
	if (msgRef && msgRef.current) {
		const it = msgRef.current.innerText;
		if (!it.endsWith(msg)) {
			msgRef.current.innerText += `\n${msg}`;
		}
	}
};
