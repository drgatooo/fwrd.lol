import NProgress from 'nprogress';
import Router from 'next/router';

let timer: NodeJS.Timeout;
let state: 'loading' | 'stop' = 'stop';
const delay = 250;

function load() {
	if (state === 'loading') {
		return;
	}

	state = 'loading';

	timer = setTimeout(() => {
		NProgress.start();
	}, delay); // only show progress bar if it takes longer than the delay
}

function stop() {
	state = 'stop';

	clearTimeout(timer);
	NProgress.done();
}

Router.events.on('routeChangeStart', load);
Router.events.on('routeChangeComplete', stop);
Router.events.on('routeChangeError', stop);

export default function Progress() {
	return <></>;
}
