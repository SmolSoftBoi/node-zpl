import Zpl from '.';
import getVersion from './version';

import { default as commander } from 'commander';

/**
 * Command line interface.
 */
export = async function cli(): Promise<string> {
    let imagePath: string | null = null;

    commander
        .version(getVersion())
        .option('-I, --image [path]', 'Add image.', path => imagePath = path)
        .parse(process.argv);
    
    const zpl = new Zpl();

    if (imagePath) {
        await zpl.addImage(imagePath);
    }

    return zpl.getZpl();
}