/**
 * Compression type.
 */
export const enum CompressionType {

    /**
     * ASCII hexadecimal (follows the format for other download commands).
     */
    ASCII_HEX = 'A',

    /**
     * Binary.
     * (Data sent after the C parameter is strictly binary.)
     */
    BINARY = 'B',

    /**
     * Compressed binary.
     * (Data sent after the C parameter is in compressed binary format.
     * The data is compressed on the host side using Zebra’s compression algorithm.
     * The data is then decompressed and placed directly into the bitmap.)
     */
    COMPRESSED_BINARY = 'C'
}