import { useState } from 'react';

export const useLogMessage = (message: string, shouldExecute: boolean) => {
	const [result, setResult] = useState<string>('');
	const [executing, setExecuting] = useState(false);
	const [hasError, setHasError] = useState(false);

	if (shouldExecute) {
		setExecuting(true);
	}

	const executeRequest = (shouldExecute: boolean) => {
		if (shouldExecute) {
			try {
				const res = `returned message: ${message}`;
				setResult(res);
			} catch (error) {
				setHasError(true);
			}

			setExecuting(false);
		}
	};
	executeRequest(shouldExecute);
	// useEffect(() => {
	// 	if (shouldExecute) {
	// 		executeRequest();
	// 	}
	// }, [shouldExecute]);

	return { executing, hasError, result };
};
