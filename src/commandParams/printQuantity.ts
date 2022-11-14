/**
 * Override pause count.
 */
export const enum OverridePauseCount {

    /**
     * No.
     */
    NO = 'N',

    /**
     * Yes.
     */
    YES = 'Y'
}

/**
 * Cut on error label.
 */
export const enum CutOnErrorLabel {

    /**
     * No.
     * If a cutter is installed,
     * a cut will be made after a voided RIFD label ONLY if a cut would be made after the non-voided label and this was the last retry.
     */
     NO = 'N',

     /**
      * Yes.
      * If a cutter is installed,
      * a cut will be made after ANY voided RFID label.
      */
     YES = 'Y'
}