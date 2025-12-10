import * as Commands from './commands';
import * as CommandParams from './commandParams';

import { Jimp } from 'jimp';
import { padStart } from 'lodash';

type JimpImage = Awaited<ReturnType<typeof Jimp.read>>;
type ImageInput = string | Buffer | JimpImage;
const isJimpImage = (input: ImageInput): input is JimpImage => input instanceof Jimp;

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
        if (zpl) {
            if (Array.isArray(zpl)) {
                this.zpl = zpl;
            } else {
                this.zpl = [zpl];
            }
        }
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
    async addImage(image: ImageInput, fieldOriginX = 0, fieldOriginY = 0): Promise<void> {
        const graphics = await this.graphics(image);

        const fieldOrigin = Commands.fieldOrigin(fieldOriginX, fieldOriginY);
        const graphicField = Commands.graphicField(
            CommandParams.GraphicField.CompressionType.ASCII_HEX,
            graphics.totalBytes,
            graphics.totalBytes,
            graphics.rowBytes,
            graphics.data.toString()
        );
        this.zpl.push(fieldOrigin, graphicField, Commands.FIELD_SEPARATOR);
    }

    /**
     * Add label.
     */
    addLabel(): void {
        this.zpl.push(Commands.END_FORMAT, Commands.START_COMMAND);
    }

    /**
     * Graphics.
     * @param file File.
     */
    private async graphics(file: ImageInput): Promise<Graphics> {
        let image: JimpImage;
        if (isJimpImage(file)) {
            image = file;
        } else {
            image = await Jimp.read(file);
        }
        
        const cropX = Math.floor((image.bitmap.width % 8) / 2);
        const cropWidth = Math.floor(image.bitmap.width / 8) * 8;
        const cropHeight = image.bitmap.height;
        image
            .crop({ x: cropX, y: 0, w: cropWidth, h: cropHeight })
            .greyscale()
            .contrast(1)
            .invert();

        const graphics: Graphics = {
            data: '\n',
            totalBytes: Math.floor(image.bitmap.width / 8) * image.bitmap.height,
            rowBytes: Math.floor(image.bitmap.width / 8)
        };

        let comma = false;
        for (let y = 0; y < image.bitmap.height; y++) {
            let byte = '';
            let bytes = '';
            for (let x = 0; x < image.bitmap.width; x++) {
                const idx = (image.bitmap.width * y + x) << 2;
                const k = (image.bitmap.data[idx] + image.bitmap.data[idx + 1] + image.bitmap.data[idx + 2]) / 3;

                byte += k < 128 ? '0' : '1';

                if (byte.length === 8) {
                    bytes += padStart(parseInt(byte, 2).toString(16), 2, '0');
                    byte = '';
                }
            }

            if (parseInt(bytes, 16) === 0) {
                graphics.data += ',';
                comma = true;
            } else {
                if (comma) graphics.data += '\n';
                graphics.data += `${bytes.toUpperCase()}\n`;
                comma = false;
            }

            byte = '';
            bytes = '';
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