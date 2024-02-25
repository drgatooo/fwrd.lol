import { useState } from 'react';

export function useLIBConfig() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [palette, setPalette] = useState([]);
	const [buttonRound, setButtonRound] = useState();
	const [buttonStyle, setButtonStyle] = useState();
}
