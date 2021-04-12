import fs from 'fs';

export default async function getVersion() {
    const result = await fs.promises.readFile('package.json', 'utf8');
    return JSON.parse(result).version;
}
