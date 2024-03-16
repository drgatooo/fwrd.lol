import { LIBEditor } from './editor';
import { LIBPreview } from './preview';
import { Spinner } from '../core';
import { UnexpectedError } from '../errors';
import { useLIBConfig } from '@/hooks/useLIBConfig';

export function LinkInBio() {
	const { set, submit, submitting, hasChanges, isLoading, links, error, data } = useLIBConfig();

	return (
		<div className={'grid gap-8 md:grid-cols-2'}>
			{isLoading ? (
				<div className={'flex h-48 w-full items-center justify-center gap-3 text-xl md:col-span-2'}>
					<Spinner />
					Preparando todo...
				</div>
			) : error ? (
				<div className={'md:col-span-2'}>
					<UnexpectedError error={error} />
				</div>
			) : (
				<>
					<LIBEditor
						data={data}
						set={set}
						submit={submit}
						submitting={submitting}
						hasChanges={hasChanges}
					/>
					<LIBPreview data={data} links={links} />
				</>
			)}
		</div>
	);
}
