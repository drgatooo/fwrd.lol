import emojiRegex from 'emoji-regex';

export function isValidURL(url: string): boolean {
	const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
	return !!url.length && pattern.test(url);
}

export function isValidAlias(code: string): boolean {
	const originalEmojiRegex = emojiRegex();
	const onlyEmojis = new RegExp(
		// eslint-disable-next-line @typescript-eslint/no-base-to-string
		`^(${originalEmojiRegex.toString().replace(/\/g$/, '')}|[a-zA-Z0-9_.-])+$`
	);

	const alphaRegex = /^[a-zA-Z0-9_-]+$/;

	return !!code.length && (alphaRegex.test(code) || onlyEmojis.test(code));
}
