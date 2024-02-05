const config = require('@drgatoxd/config');

module.exports = {
	...config,
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'next/core-web-vitals']
};
