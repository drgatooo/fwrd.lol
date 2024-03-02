import { useEffect, useState } from 'react';
import axios from 'axios';
import palettes from '@/constants/palettes.json';
import toast from 'react-hot-toast';
import { useBoolean } from '.';
import { useRouter } from 'next/router';

export interface LIBConfig {
	title: string;
	description: string;
	image: string;
	footer: string;
	username: string;
	palette: Palette;
	buttonRound: ButtonRound;
	buttonStyle: ButtonStyle;
}

type ButtonRound = 'none' | 'medium' | 'full';
type ButtonStyle = 'fill' | 'outline' | 'hardshadow';
export type Palette = [string, string, string, string, string];

type Field =
	| 'title'
	| 'description'
	| 'image'
	| 'footer'
	| 'username'
	| 'palette'
	| 'buttonRound'
	| 'buttonStyle';

export type SetLIBConfig = <K extends Field>(field: K, value: LIBConfig[K]) => void;

export function useLIBConfig(initial: Partial<LIBConfig>) {
	const router = useRouter();

	const [title, setTitle] = useState(initial.title ?? '');
	const [description, setDescription] = useState(initial.description ?? '');
	const [image, setImage] = useState(initial.image ?? '');
	const [username, setUsername] = useState(initial.username ?? '');
	const [footer, setFooter] = useState(initial.footer ?? '');
	const [palette, setPalette] = useState<Palette>((initial.palette ?? palettes.arch) as Palette);
	const [buttonRound, setButtonRound] = useState<ButtonRound>(initial.buttonRound ?? 'medium');
	const [buttonStyle, setButtonStyle] = useState<ButtonStyle>(initial.buttonStyle ?? 'fill');

	const hasChanges =
		initial.title !== title ||
		initial.description !== description ||
		initial.image !== image ||
		initial.footer !== footer ||
		initial.username !== username ||
		initial.palette !== palette ||
		initial.buttonRound !== buttonRound ||
		initial.buttonStyle !== buttonStyle;

	const [submitting, { off: unsetSubmit, on: setSubmit }] = useBoolean(false);

	useEffect(() => {
		palette.forEach((color, i) => {
			document.documentElement.style.setProperty(`--c${i + 1}`, color);
		});
	}, [palette]);

	function set<K extends Field>(field: K, value: LIBConfig[K]) {
		switch (field) {
			case 'title':
				setTitle(value as string);
				break;
			case 'description':
				setDescription(value as string);
				break;
			case 'palette':
				setPalette(value as Palette);
				break;
			case 'buttonRound':
				setButtonRound(value as ButtonRound);
				break;
			case 'buttonStyle':
				setButtonStyle(value as ButtonStyle);
				break;
			case 'image':
				setImage(value as string);
				break;
			case 'footer':
				setFooter(value as string);
				break;
			case 'username':
				setUsername(value as string);
				break;
		}
	}

	async function submit() {
		setSubmit();
		const msg = await axios
			.put('/api/linkinbio/update', {
				title,
				description,
				image,
				footer,
				palette,
				buttonRound,
				buttonStyle,
				username
			})
			.then(({ data }) => ({
				success: data.message,
				error: undefined
			}))
			.catch(err => ({
				success: undefined,
				error: err.response.data.message
			}));

		unsetSubmit();

		if (msg.success) {
			toast.success('¡Se modificó tu enlace de perfil!');
			return setTimeout(() => router.reload(), 1000);
		} else {
			return toast.error(msg.error);
		}
	}

	return {
		title,
		description,
		image,
		footer,
		username,
		palette,
		buttonRound,
		buttonStyle,
		set,
		submit,
		submitting,
		hasChanges
	};
}
