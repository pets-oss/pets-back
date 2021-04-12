import fs from 'fs';

export default async function getAppVersion() {
    const packageJson = await fs.promises.readFile('./package.json', 'utf8');
    const { version } = JSON.parse(packageJson);
    return version;
}
