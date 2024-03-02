import emojiRegex from 'emoji-regex';

export function isValidURL(url: string): boolean {
	const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
	return !!url.length && pattern.test(url);
}

const originalEmojiRegex = emojiRegex();
const onlyEmojis = new RegExp(
	// eslint-disable-next-line @typescript-eslint/no-base-to-string
	`^(${originalEmojiRegex.toString().replace(/\/g$/, '')}|[a-zA-Z0-9_.-])+$`
);

const alphaRegex = /^[a-zA-Z0-9_-]+$/;

export function isValidAlias(code: string): boolean {
	return !!code.length && (alphaRegex.test(code) || onlyEmojis.test(code));
}

// use alphaRegex and onlyEmojis to transform the base code into a valid alias, deleting invalid characters
export function convertToValidAlias(code: string): string {
	return code.replace(new RegExp(`[^${alphaRegex.source}${onlyEmojis.source}]`, 'g'), '');
}

export function convertToValidUsername(username: string): string {
	return username.replace(/[^a-zA-Z0-9_]/g, '');
}
