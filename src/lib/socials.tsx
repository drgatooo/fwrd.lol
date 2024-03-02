import {
	Discord,
	Facebook,
	GitHub,
	Gitlab,
	Instagram,
	Linkedin,
	Spotify,
	Tiktok,
	X,
	YouTube
} from '@/components/icons';
import { FaLink } from 'react-icons/fa';

const domains = {
	discord: ['discord.com', 'discord.gg', 'discordapp.com'],
	facebook: ['facebook.com', 'fb.com'],
	github: ['github.com'],
	gitlab: ['gitlab.com'],
	instagram: ['instagram.com'],
	linkedin: ['linkedin.com'],
	spotify: ['spotify.com', 'open.spotify.com', 'spoti.fi'],
	tiktok: ['tiktok.com', 'vm.tiktok.com'],
	x: ['x.com', 'twitter.com'],
	youtube: ['youtube.com', 'youtu.be']
};

const icons = {
	discord: <Discord />,
	facebook: <Facebook />,
	github: <GitHub />,
	gitlab: <Gitlab />,
	instagram: <Instagram />,
	linkedin: <Linkedin />,
	spotify: <Spotify />,
	tiktok: <Tiktok />,
	x: <X />,
	youtube: <YouTube />
};

export function socialIcon({ url }: { url: string }) {
	const domain = new URL(url).hostname;
	for (const [key, value] of Object.entries(domains)) {
		if (value.some(v => domain.includes(v))) {
			return icons[key as keyof typeof icons];
		}
	}
	return <FaLink />;
}
