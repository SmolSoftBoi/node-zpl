import * as Params from './commandParams';

/**
 * The ^BC command creates the Code 128 bar code, a high-density, variable length, continuous, alphanumeric symbology.
 * It was designed for complexly encoded product identification.
 * Code 128 has three subsets of characters.
 * There are 106 encoded printing characters in each set,
 * and each character can have up to three different meanings, depending on the character subset being used.
 * Each Code 128 character consists of six elements: three bars and three spaces.
 */
export const CODE_128_BAR_CODE = '^BC';

/**
 * The ^BY command is used to change the default values for the module width (in dots),
 * the wide bar to narrow bar width ratio and the bar code height (in dots).
 * It can be used as often as necessary within a label format.
 */
export const BAR_CODE_FIELD_DEFAULT = '^BY';

/**
 * The ^CF command sets the default font used in your printer.
 * You can use the ^CF command to simplify your programs.
 */
export const CHANGE_ALPHANUMERIC_DEFAULT_FONT = '^CF';

/**
 * The ^FD command defines the data string for a field.
 * The field data can be any printable character except those used as command prefixes (^ and ~).
 */
export const FIELD_DATA = '^FD';

/**
 * The ^FO command sets a field origin, relative to the label home (^LH) position.
 * ^FO sets the upper-left corner of the field area by defining points along the x-axis and y-axis independent of the rotation.
 */
export const FIELD_ORIGIN = '^FO';

/**
 * The ^FR command allows a field to appear as white over black or black over white.
 * When printing a field and the ^FR command has been used, the color of the output is the reverse of its background.
 */
export const FIELD_REVERSE_PRINT = '^FR';

/**
 * The ^FS command denotes the end of the field definition.
 */
export const FIELD_SEPARATOR = '^FS';

/**
 * The ^FX command is useful when you want to add non-printing informational comments or statements within a label format.
 * Any data after the ^FX command up to the next caret (^) or tilde (~) command does not have any effect on the label format.
 * Therefore, you should avoid using the caret (^) or tilde (~) commands within the ^FX statement.
 */
export const COMMENT = '^FX';

/**
 * The ^GB command is used to draw boxes and lines as part of a label format.
 * Boxes and lines are used to highlight important information, divide labels into distinct areas, or to improve the appearance of a label.
 * The same format command is used for drawing either boxes or lines.
 */
export const GRAPHIC_BOX = '^GB';

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
 * The ^BY command is used to change the default values for the module width (in dots),
 * the wide bar to narrow bar width ratio and the bar code height (in dots).
 * It can be used as often as necessary within a label format.
 * @param w Module width (in dots).
 * @param r Wide bar to narrow bar width ratio.
 * @param h Bar code height (in dots).
 */
export function barCodeFieldDefault(w = 2, r = 3.0, h = 10): string {
    return `${BAR_CODE_FIELD_DEFAULT}${w},${r},${h}`;
}

/**
 * The ^CF command sets the default font used in your printer.
 * You can use the ^CF command to simplify your programs.
 * @param f Specified default font.
 * @param h Individual character height (in dots).
 * @param w Individual character width (in dots).
 */
export function changeAlphanumericDefaultFont(f: string | number = 'A', h = 9, w = 5): string {
    return `${CHANGE_ALPHANUMERIC_DEFAULT_FONT}${f},${h},${w}`;
}

/**
 * The ^BC command creates the Code 128 bar code, a high-density, variable length, continuous, alphanumeric symbology.
 * It was designed for complexly encoded product identification.
 * Code 128 has three subsets of characters.
 * There are 106 encoded printing characters in each set,
 * and each character can have up to three different meanings, depending on the character subset being used.
 * Each Code 128 character consists of six elements: three bars and three spaces.
 * @param o Orientation.
 * @param h Bar code height (in dots).
 * @param f Print interpretation line.
 * @param g Print interpretation line above code.
 * @param e UCC check digit.
 */
export function code128BarCode(o?: Params.Code128BarCode.Orientation, h?: number, f = true, g = false, e = false): string {
    let zpl = CODE_128_BAR_CODE;

    if (o) {
        zpl += `,${o}`;
    }

    if (h) {
        zpl += `,${h},${f ? 'Y' : 'N'},${g ? 'Y' : 'N'},${e ? 'Y' : 'N'}`;
    }

    return zpl;
}

/**
 * The ^FX command is useful when you want to add non-printing informational comments or statements within a label format.
 * Any data after the ^FX command up to the next caret (^) or tilde (~) command does not have any effect on the label format.
 * Therefore, you should avoid using the caret (^) or tilde (~) commands within the ^FX statement.
 * @param c Non printing comment.
 */
export function comment(c: string): string {
    return `${COMMENT} ${c}`;
}

/**
 * The ^FD command defines the data string for a field.
 * The field data can be any printable character except those used as command prefixes (^ and ~).
 * @param a Data to be printed.
 */
export function fieldData(a: string): string {
    return `${FIELD_DATA}${a}`;
}

/**
 * The ^FO command sets a field origin, relative to the label home (^LH) position.
 * ^FO sets the upper-left corner of the field area by defining points along the x-axis and y-axis independent of the rotation.
 * @param x X-axis location (in dots).
 * @param y Y-axis location (in dots).
 * @param z Justification.
 */
export function fieldOrigin(x = 0, y = 0, z?: Params.FieldOrigin.Justification): string {
    let zpl = `${FIELD_ORIGIN}${x},${y}`;
    
    if (z) {
        zpl += `,${z}`;
    }

    return zpl;
}

/**
 * The ^GB command is used to draw boxes and lines as part of a label format.
 * Boxes and lines are used to highlight important information, divide labels into distinct areas, or to improve the appearance of a label.
 * The same format command is used for drawing either boxes or lines.
 * @param w Box width (in dots).
 * @param h Box height (in dots).
 * @param t Border thickness (in dots).
 * @param c Line color.
 * @param r Degree of corner- rounding.
 */
export function graphicBox(
    w?: number,
    h?: number,
    t = 1,
    c: Params.GraphicBox.LineColor = Params.GraphicBox.LineColor.BLACK,
    r = 0
): string {
    if (!w) w = t;
    if (!h) h = t;

    return `${GRAPHIC_BOX}${w},${h},${t},${c},${r}`;
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
export function graphicField(a: Params.GraphicField.CompressionType, b: number, c: number, d: number, data: string): string {
    return `${GRAPHIC_FIELD}${a},${b},${c},${d},${data}`;
}