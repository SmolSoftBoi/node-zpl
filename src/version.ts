import { readFileSync } from 'fs';
import { default as path } from 'path';

/**
 * Package.
 */
function getPackage(): Record<string, any> {
    const packagePath = path.join(__dirname, '../package.json');
    return JSON.parse(readFileSync(packagePath, {
        encoding: 'utf8'
    }));
}

/**
 * Get version.
 */
export default function getVersion(): string {
    return getPackage().version;
}