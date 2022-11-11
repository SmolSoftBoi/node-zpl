import Zpl from '.';
import getVersion from './version';

import { Command } from 'commander';

/**
 * Command line interface.
 */
export = async function cli(): Promise<string> {
    const commander = new Command();

    let imagePath: string | null = null;

    commander
        .version(getVersion())
        .option('-I, --image [path]', 'Add image.', path => imagePath = path)
        .parse(process.argv);
    
    const zpl = new Zpl();

    if (imagePath) {
        await zpl.addImage(imagePath);
    }

    const out = zpl.getZpl();
    console.log(out);
    return out;
}