import axios from 'axios';
import crypto from 'crypto';

export function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}

export function favicon(url: string) {
	const domain = new URL(url).hostname;
	return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

export function createRandomAccessToken() {
	return crypto.randomBytes(32).toString('hex');
}

export function dataURLtoFile(dataurl: string, filename: string) {
	const arr = dataurl.split(',');
	const [mime] = arr[0].match(/:(.*?);/) ?? [];
	const bstr = atob(arr[arr.length - 1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}

export async function uploadImage(base64: string): Promise<string> {
	const blob = dataURLtoFile(base64, 'image');
	const postData = new FormData();
	postData.append('image', blob);

	const { data } = await axios
		.post(
			`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}&name=${crypto.randomBytes(16).toString('hex')}`,
			postData
		)
		.catch(err => {
			console.error(err);
			return { data: { error: true } };
		});

	if (data.error) return Promise.reject('Error uploading image');
	return data.data.url;
}
