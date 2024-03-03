import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import type { Link } from '@prisma/client';
import palettes from '@/constants/palettes.json';
import toast from 'react-hot-toast';
import { useBoolean } from '.';
import useSWR from 'swr';

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

export function useLIBConfig() {
	const { data, isLoading, mutate, error } = useSWR('/api/linkinbio/current', fetcher, {
		revalidateOnFocus: false,
		refreshWhenHidden: false,
		refreshWhenOffline: false
	});

	const initial = data?.config;
	const links = data?.links;

	const [title, setTitle] = useState(initial?.title ?? '');
	const [description, setDescription] = useState(initial?.description ?? '');
	const [image, setImage] = useState(initial?.image ?? '');
	const [username, setUsername] = useState(initial?.username ?? '');
	const [footer, setFooter] = useState(initial?.footer ?? '');
	const [palette, setPalette] = useState<Palette>((initial?.palette ?? palettes.arch) as Palette);
	const [buttonRound, setButtonRound] = useState<ButtonRound>(initial?.buttonRound ?? 'medium');
	const [buttonStyle, setButtonStyle] = useState<ButtonStyle>(initial?.buttonStyle ?? 'fill');

	const hasChanges =
		initial?.title !== title ||
		initial.description !== description ||
		initial.image !== image ||
		initial.footer !== footer ||
		initial.username !== username ||
		initial.palette !== palette ||
		initial.buttonRound !== buttonRound ||
		initial.buttonStyle !== buttonStyle;

	useEffect(() => {
		if (initial) {
			setTitle(initial.title);
			setDescription(initial.description);
			setImage(initial.image);
			setFooter(initial.footer);
			setUsername(initial.username);
			setPalette(initial.palette);
			setButtonRound(initial.buttonRound);
			setButtonStyle(initial.buttonStyle);
		}
	}, [initial]);

	const [submitting, { off: unsetSubmit, on: setSubmit }] = useBoolean(false);

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
				success: data?.message,
				error: undefined
			}))
			.catch(err => ({
				success: undefined,
				error: err.response.data.message
			}));

		unsetSubmit();

		if (msg.success) {
			toast.success('¡Se modificó tu enlace de perfil!');
			return void mutate();
		} else {
			return toast.error(msg.error);
		}
	}

	const config = {
		title,
		description,
		image,
		footer,
		username,
		palette,
		buttonRound,
		buttonStyle
	};

	return {
		data: config,
		set,
		submit,
		submitting,
		hasChanges,
		isLoading,
		links: links ?? [],
		error
	};
}

async function fetcher(): Promise<FetcherResponse> {
	try {
		const {
			data: { config }
		} = await axios.get('/api/linkinbio/current');
		const {
			data: { links }
		} = await axios.get('/api/links/all');

		return { config, links };
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.response?.data.message ?? 'NO_RESPONSE');
		}

		throw new Error('NO_RESPONSE');
	}
}

interface FetcherResponse {
	config: LIBConfig;
	links: Link[];
}
