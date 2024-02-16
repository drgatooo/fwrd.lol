import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

export function useDebounce<S>(
	initialValue: S,
	delay: number
): [S, S, Dispatch<SetStateAction<S>>, boolean] {
	const [actualValue, setActualValue] = useState(initialValue);
	const [debounceValue, setDebounceValue] = useState(initialValue);
	const [inDelay, setInDelay] = useState(false);

	useEffect(() => {
		setInDelay(true);
		const debounceId = setTimeout(() => {
			setDebounceValue(actualValue);
			setInDelay(false);
		}, delay);
		return () => clearTimeout(debounceId);
	}, [actualValue, delay]);

	return [debounceValue, actualValue, setActualValue, inDelay];
}
