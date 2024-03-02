import axios from 'axios';
import toast from 'react-hot-toast';
import { useBoolean } from '.';
import { useRouter } from 'next/router';
import { useState } from 'react';

type LinkField = 'url' | 'description' | 'inBio' | 'asSocial' | 'libLabel';

export function useEditLinkForm(
	linkId: string,
	initial: {
		url: string;
		description?: string | null;
		inBio?: boolean;
		asSocial?: boolean;
		libLabel?: string | null;
	}
) {
	const [longUrl, setLongUrl] = useState(initial.url);
	const [description, setDescription] = useState(initial.description ?? '');
	const [inBio, { toggle }] = useBoolean(initial.inBio ?? false);
	const [asSocial, { toggle: toggleAsSocial }] = useBoolean(initial.asSocial ?? false);
	const [libLabel, setLibLabel] = useState(initial.libLabel ?? '');

	const [submitting, { off: unsetSubmit, on: setSubmit }] = useBoolean(false);

	const router = useRouter();

	async function submit() {
		setSubmit();
		const msg = await axios
			.patch(`/api/links/${linkId}`, {
				url: longUrl,
				description: description.length > 0 ? description : undefined,
				inBio,
				asSocial,
				label: libLabel
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
			void router.push('/dashboard');
			return toast.success('¡Se modificó el enlace!');
		} else {
			return toast.error(msg.error);
		}
	}

	async function deleteLink() {
		setSubmit();
		const msg = await axios
			.delete(`/api/links/${linkId}`)
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
			void router.push('/dashboard');
			return toast.success('Se eliminó el enlace.');
		} else {
			return toast.error(msg.error);
		}
	}

	function reset() {
		setLongUrl('');
		setDescription('');
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

			case 'inBio': {
				toggle();
				break;
			}

			case 'asSocial': {
				toggleAsSocial();
				break;
			}

			case 'libLabel': {
				setLibLabel(value);
				break;
			}
		}
	}

	return {
		longUrl,
		description,
		inBio,
		asSocial,
		libLabel,
		set,
		submit,
		reset,
		submitting,
		deleteLink
	};
}
