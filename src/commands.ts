import * as CommandParams from './commandParams';

/**
 * The ^FO command sets a field origin, relative to the label home (^LH) position.
 * ^FO sets the upper-left corner of the field area by defining points along the x-axis and y-axis independent of the rotation.
 */
export const FIELD_ORIGIN = '^FO';

/**
 * The ^FS command denotes the end of the field definition.
 */
export const FIELD_SEPARATOR = '^FS';

/**
 * The ^GF command allows you to download graphic field data directly into the printer’s bitmap storage area.
 * This command follows the conventions for any other field, meaning a field orientation is included.
 * The graphic field data can be placed at any location within the bitmap space.
 */
export const GRAPHIC_FIELD = '^GF';

/**
 * The ^XA command is used at the beginning of ZPL code.
 * It is the opening bracket and indicates the start of a new label format.
 */
export const START_COMMAND = '^XA';

/**
 * The ^XZ command is the ending (closing) bracket.
 * It indicates the end of a label format.
 * When this command is received, a label prints.
 */
export const END_FORMAT = '^XZ';

/**
 * The ^FO command sets a field origin, relative to the label home (^LH) position.
 * ^FO sets the upper-left corner of the field area by defining points along the x-axis and y-axis independent of the rotation.
 * @param x X-axis location (in dots).
 * @param y Y-axis location (in dots).
 * @param z Justification.
 */
export function fieldOrigin(x: number, y: number, z?: CommandParams.FieldOriginJustification): string {
    let zpl = `${FIELD_ORIGIN}${x},${y}`;
    
    if (z) {
        zpl += `,${z}`;
    }

    return zpl;
}

/**
 * The ^GF command allows you to download graphic field data directly into the printer’s bitmap storage area.
 * This command follows the conventions for any other field, meaning a field orientation is included.
 * The graphic field data can be placed at any location within the bitmap space.
 * @param a Compression type.
 * @param b Binary byte count.
 * @param c Graphic field count.
 * @param d Bytes per row.
 * @param data Data.
 */
export function graphicField(a: CommandParams.GraphicFieldCompressionTypee, b: number, c: number, d: number, data: string): string {
    return `${GRAPHIC_FIELD}${a},${b},${c},${d},${data}`;
}