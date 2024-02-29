import axios from 'axios';
import { convertToValidAlias } from '@/utils/validators';
import toast from 'react-hot-toast';
import { useBoolean } from '.';
import { useState } from 'react';

type LinkField = 'url' | 'description' | 'alias';

export function useCreateLinkForm() {
	const [longUrl, setLongUrl] = useState('');
	const [description, setDescription] = useState('');
	const [customAlias, setCustomAlias] = useState('');
	const [submitting, { off: unsetSubmit, on: setSubmit }] = useBoolean(false);

	async function submit() {
		setSubmit();
		const msg = await axios
			.post('/api/links/create', {
				url: longUrl,
				alias: customAlias,
				description: description.length > 0 ? description : undefined
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
			reset();
		}

		if (msg.success) {
			return toast.success('¡Enlace creado correctamente!');
		} else {
			return toast.error(msg.error);
		}
	}

	function reset() {
		setLongUrl('');
		setDescription('');
		setCustomAlias('');
	}

	function set(field: LinkField, value: string) {
		switch (field) {
			case 'url': {
				setLongUrl(value);
				break;
			}
			case 'description': {
				setDescription(value.slice(0, 250));
				break;
			}
			case 'alias': {
				setCustomAlias(convertToValidAlias(value));
				break;
			}
		}
	}

	return {
		longUrl,
		description,
		customAlias,
		set,
		submit,
		reset,
		submitting
	};
}
