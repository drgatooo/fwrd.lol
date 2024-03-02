import { type LIBConfig, useLIBConfig } from '@/hooks/useLIBConfig';
import { LIBEditor } from './editor';
import { LIBPreview } from './preview';
import type { PartialLink } from '@/types';

export function LinkInBio({ initial, links }: { initial: LIBConfig; links: PartialLink[] }) {
	const { set, submit, submitting, hasChanges, ...data } = useLIBConfig(initial);

	return (
		<div className={'grid gap-8 md:grid-cols-2'}>
			<LIBEditor
				data={data}
				set={set}
				submit={submit}
				submitting={submitting}
				hasChanges={hasChanges}
			/>
			<LIBPreview data={data} links={links} />
		</div>
	);
}
