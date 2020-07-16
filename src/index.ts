import * as Commands from './commands';
import * as CommandParams from './commandParams';

import Jimp from 'jimp';
import { padStart } from 'lodash';

/**
 * ZPL.
 */
export default class Zpl {

    private zpl: string[] = [];

    /**
     * ZPL constructor.
     * @param zpl ZPL.
     */
    constructor(zpl?: string) {
        if (zpl) this.zpl.push(zpl);
    }

    /**
     * Get ZPL.
     */
    getZpl(): string {
        return [
            Commands.START_COMMAND,
            ...this.zpl,
            Commands.END_FORMAT
        ].join('\n');
    }

    /**
     * Set ZPL.
     * @param zpl ZPL.
     */
    setZpl(zpl: string | string[]): void {
        if (Array.isArray(zpl)) {
            this.zpl = zpl;
        } else {
            this.zpl = [zpl];
        }
    }

    /**
     * Add ZPL.
     * @param zpl ZPL.
     */
    addZpl(zpl: string | string[]): void {
        if (Array.isArray(zpl)) {
            this.zpl.push(...zpl);
        } else {
            this.zpl.push(zpl);
        }
    }

    /**
     * Add image.
     * @param image Image.
     */
    async addImage(image: string & Buffer & Jimp, fieldOriginX = 0, fieldOriginY = 0): Promise<void> {
        const graphics = await this.graphics(image);

        const fieldOrigin = Commands.fieldOrigin(fieldOriginX, fieldOriginY);
        const graphicField = Commands.graphicField(
            CommandParams.GraphicFieldCompressionTypee.ASCII_HEX,
            graphics.totalBytes,
            graphics.totalBytes,
            graphics.rowBytes,
            graphics.data.toString()
        );
        const fieldSeparator = Commands.FIELD_SEPARATOR;

        this.zpl.push(fieldOrigin, graphicField, fieldSeparator);
    }

    /**
     * Graphics.
     * @param file File.
     */
    private async graphics(file: string & Buffer & Jimp): Promise<Graphics> {
        const image = await Jimp.read(file);
        const graphics: Graphics = {
            data: '',
            totalBytes: image.bitmap.width * image.bitmap.height * 2,
            rowBytes: image.bitmap.width * 2
        };

        for (const { idx } of image.scanIterator(0, 0, image.bitmap.width, image.bitmap.height)) {
            graphics.data += padStart(image.bitmap.data[idx].toString(16), 2, '0');
        }

        return graphics;
    }
}

/**
 * Graphics.
 */
interface Graphics {

    /**
     * Data.
     */
    data: string;

    /**
     * Total bytes.
     */
    totalBytes: number;

    /**
     * Row bytes.
     */
    rowBytes: number;
}