import fs from 'fs';
export default async function getCurrentVersion() {
    const packageJson = await fs.promises.readFile('./package.json', 'utf8');
    return JSON.parse(packageJson).version;
}
