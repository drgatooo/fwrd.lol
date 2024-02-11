import { useState } from 'react';

type VoidFn = () => void;
type UseBoolean = [boolean, { on: VoidFn; off: VoidFn; toggle: VoidFn }];

export function useBoolean(initialState = false): UseBoolean {
	const [value, setValue] = useState(initialState);

	const on = () => setValue(true);
	const off = () => setValue(false);
	const toggle = () => setValue(!value);

	return [value, { on, off, toggle }];
}
