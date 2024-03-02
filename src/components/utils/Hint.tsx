import { MdInfo } from 'react-icons/md';

export function Hint({ children }: { children: React.ReactNode }) {
	return (
		<div className={'inline-flex items-center gap-1 rounded-xl bg-indigo-500/20 p-3'}>
			<MdInfo /> {children}
		</div>
	);
}
