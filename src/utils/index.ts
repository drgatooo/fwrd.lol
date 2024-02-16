export function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}

export function favicon(url: string) {
	const domain = new URL(url).hostname;
	return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}
