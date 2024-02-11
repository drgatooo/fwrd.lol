import localFont from 'next/font/local';

export const satoshi = localFont({
	variable: '--font-satoshi',
	src: [
		{
			path: '../../fonts/Satoshi300.woff2',
			weight: '300',
			style: 'normal'
		},
		{
			path: '../../fonts/Satoshi400.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../fonts/Satoshi500.woff2',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../../fonts/Satoshi700.woff2',
			weight: '700',
			style: 'normal'
		},
		{
			path: '../../fonts/Satoshi900.woff2',
			weight: '900',
			style: 'normal'
		}
	]
});

export const cascadiaCode = localFont({
	variable: '--font-cascadia',
	src: [
		{
			path: '../../fonts/CascadiaCode.woff2',
			weight: '400',
			style: 'normal'
		}
	]
});
