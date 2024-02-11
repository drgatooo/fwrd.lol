const fs = require('node:fs/promises');
const readline = require('node:readline/promises');

async function exportToIndex() {
	// ask user for directory using process.stdin
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	const dir = await rl.question('Enter the directory: ');
	rl.close();

	// read the directory and create an index file

	const files = await fs.readdir(dir);
	const index = files
		.filter(file => (file.endsWith('.tsx') || file.endsWith('.ts')) && !file.startsWith('index'))
		.map(file => file.replace('.tsx', '').replace('.ts', ''))
		.map(file => `export { ${file} } from './${file}';`)
		.join('\n');

	await fs.writeFile(`${dir}/index.ts`, `${index}\n`);
	return console.log('Index file created');
}

exportToIndex();
