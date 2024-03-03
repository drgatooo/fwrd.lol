import { MdCircle } from 'react-icons/md';

export function DashboardSkeleton() {
	return (
		<div className={'flex animate-pulse flex-col gap-4 rounded-xl bg-black/5 p-5 dark:bg-white/5'}>
			<SkTitle />
			<SkDetails />
			<SkStats />
			<SkActions />
		</div>
	);
}

function SkTitle() {
	return (
		<div className={'flex h-full items-center gap-4'}>
			<MdCircle size={'28px'} />
			<div className="h-7 w-full bg-black/20 dark:bg-white/20" />
		</div>
	);
}

function SkDetails() {
	return (
		<div className="flex w-full flex-col gap-2 text-sm">
			<div className="h-5 w-full bg-black/20 dark:bg-white/20" />
			<div className="h-5 w-full bg-black/20 dark:bg-white/20" />
		</div>
	);
}

function SkStats() {
	return (
		<div className={'flex items-center justify-between gap-5'}>
			<span className={'inline-flex items-center gap-2 text-sm'}>
				<div className="h-5 w-16 bg-black/20 dark:bg-white/20" />
			</span>
			<span className={'inline-flex items-center gap-2 text-sm'}>
				<div className="h-5 w-16 bg-black/20 dark:bg-white/20" />
			</span>
		</div>
	);
}

function SkActions() {
	return (
		<div className={'grid grid-cols-2 items-center gap-3'}>
			<SkButton />
			<SkButton />
		</div>
	);
}

function SkButton() {
	return (
		<div className="text-opposite flex h-9 w-full items-center justify-center rounded-full bg-black/70 dark:bg-white/70">
			...
		</div>
	);
}
