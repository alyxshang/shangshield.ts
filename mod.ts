/*
ShangShield.ts by Alyx Shang.
Licensed under the FSL v1.
*/

// Re-exporting the "SecurityInfo" JSON interface.
export type { SecurityInfo } from './src/shangshield.ts';

// Re-exporting the functions this module contains.
export {
    isDigit,
    isLetter,
    isSecure,
    stringType,
    shieldSummary,
    securityScore,
    digitDistance,
    getPositionFromChar
} from './src/shangshield.ts';