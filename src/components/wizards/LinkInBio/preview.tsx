import type { LIBConfig } from '@/hooks/useLIBConfig';
import { LIBContent } from '@/components/layout/LinkInBioContent';
import type { PartialLink } from '@/types';

export function LIBPreview({ data, links }: { data: LIBConfig; links: PartialLink[] }) {
	return (
		<div className={'flex w-full justify-end'}>
			<div
				data-islib
				style={{ backgroundColor: 'var(--c3)' }}
				className={
					'relative flex aspect-[9/16] h-max w-full min-w-[100px] max-w-[460px] flex-col items-center gap-5 overflow-y-auto overflow-x-hidden rounded-xl px-8 pt-16'
				}
			>
				<LIBContent data={data} links={links} />
			</div>
		</div>
	);
}
