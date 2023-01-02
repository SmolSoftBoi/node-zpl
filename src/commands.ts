import * as Params from './commandParams';

/**
 * The ^A command specifies the font to use in a text field.
 * ^A designates the font for the current ^FD statement or field.
 * The font specified by ^A is used only once for that ^FD entry.
 * If a value for ^A is not specified again, the default ^CF font is used for the next ^FD entry.
 */
export const FONT = '^A';

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
 * The ^FB command allows you to print text into a defined block type format.
 * This command formats an ^FD or ^SN string into a block of text using the origin, font, and rotation specified for the text string.
 * The ^FB command also contains an automatic word-wrap function.
 */
export const FIELD_BLOCK = '^FB';

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
 * The ^PQ command gives control over several printing operations.
 * It controls the number of labels to print,
 * the number of labels printed before printer pauses,
 * and the number of replications of each serial number.
 */
export const PRINT_QUANTITY = '^PQ';

/**
 * The ^SF command allows you to serialize a standard ^FD string.
 * The maximum size of the mask and increment string is 3K combined.
 */
export const SERIALIZATION_FIELD = '^SF';

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
export function changeAlphanumericDefaultFont(f: string | number = 'A', h = 9, w? : number): string {
    let zpl = `${CHANGE_ALPHANUMERIC_DEFAULT_FONT}${f},${h}`;
    if (w) {
        zpl += `,${w}`
    }
    return zpl
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
 * The ^FB command allows you to print text into a defined block type format.
 * This command formats an ^FD or ^SN string into a block of text using the origin, font, and rotation specified for the text string.
 * The ^FB command also contains an automatic word-wrap function.
 * @param a Width of text block line (in dots).
 * @param b Maximum number of lines in text block.
 * @param c Add or delete space between lines (in dots).
 * @param d Text justification.
 * @param e Hanging indent (in dots) of the second and remaining lines.
 */
export function fieldBlock(
    a = 0,
    b = 1,
    c = 0,
    d: Params.FieldBlock.TextJustification = Params.FieldBlock.TextJustification.LEFT,
    e = 0
): string {
    return `${FIELD_BLOCK}${a},${b},${c},${d},${e}`
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
 * The ^A command specifies the font to use in a text field.
 * ^A designates the font for the current ^FD statement or field.
 * The font specified by ^A is used only once for that ^FD entry.
 * If a value for ^A is not specified again, the default ^CF font is used for the next ^FD entry.
 * @param f Font name.
 *          Any font in the printer (downloaded, EPROM, stored fonts, fonts A through Z and 0 to 9).
 * @param o Field orientation.
 * @param h Character height (in dots).
 * @param w Width (in dots).
 */
export function font(f?, o?, h?, w?): string {
    let zpl = `${FONT}${f}${o}`;

    if (h) {
        zpl += `,${h}`;
    }

    if (w) {
        zpl += `,${w}`;
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

/**
 * The ^PQ command gives control over several printing operations.
 * It controls the number of labels to print,
 * the number of labels printed before printer pauses,
 * and the number of replications of each serial number.
 * @param q Total quantity of labels to print.
 * @param p Pause and cut value (labels between pauses).
 * @param r Replicates of each serial number.
 * @param o Override pause count.
 * @param e Cut on error label (RFID void is an error label).
 */
export function printQuantity(
    q = 1,
    p = 0,
    r = 0,
    o: Params.PrintQuantity.OverridePauseCount = Params.PrintQuantity.OverridePauseCount.NO,
    e: Params.PrintQuantity.CutOnErrorLabel = Params.PrintQuantity.CutOnErrorLabel.YES
): string {
    return `${PRINT_QUANTITY}${q},${p},${r},${o},${e}`
}

/**
 * The ^SF command allows you to serialize a standard ^FD string.
 * The maximum size of the mask and increment string is 3K combined.
 * @param a The mask string sets the serialization scheme.
 *          The length of the string mask defines the number of characters in the current ^FD string to be serialized.
 *          The mask is aligned to the characters in the ^FD string starting with the right-most in the backing store position.
 * @param b The increment string is the value to be added to the field on each label.
 *          The default value is equivalent to a decimal value of one.
 *          The string is composed of any characters defined in the serial string.
 *          Invalid characters are assumed to be equal to a value of zero in that characters position.
 *          The increment value for alphabetic strings start with `A` or `a` as the zero placeholder.
 *          This means to increment an alphabetic character by one, a value of `B` or `b` must be in the increment string.
 */
export function serializationField(a: string, b: string): string {
    return `${SERIALIZATION_FIELD}${a},${b}`
}
