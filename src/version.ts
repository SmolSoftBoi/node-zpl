import { readFileSync } from 'fs';
import { default as path } from 'path';

/**
 * Load package JSON.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadPackageJson(): Record<string, any> {
    const packageJsonPath = path.join(__dirname, '../package.json');
    return JSON.parse(readFileSync(packageJsonPath, {
        encoding: 'utf8'
    }));
}

/**
 * Get version.
 */
export default function getVersion(): string {
    return loadPackageJson().version;
}