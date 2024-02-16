import * as qrcode from 'qrcode';
import { useEffect } from 'react';

interface CanvasOptions {
	dark: string;
	light: string;
	text: string;
}

export function useCanvas(canvasId: string, { text, dark, light }: CanvasOptions) {
	const createQR = (text: string, dark: string, light: string) => {
		const canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
		void qrcode.toCanvas(canvasElement, text.length ? text : 'https://fwrd.lol', {
			color: { dark, light },
			scale: 15,
			margin: 2
		});
	};

	useEffect(() => {
		setTimeout(() => {
			createQR(text, dark, light);
		}, 100);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dark, light, text, canvasId]);
}
