/*
ShangShield.ts by Alyx Shang.
Licensed under the FSL v1.
*/

'use strict';

/**
 * A JSON interface to save information
 * about the analysis of the strength of
 * a password.
 */
interface SecurityInfo {
    password: string,
    score: number,
    cutOff: number,
    isSecure: boolean
}

/**
 * Subtracts two numbers from each other, regardless of which 
 * one of the two is larger than the other.
 * @param {number} one The first number to conduct a subtraction on.
 * @param {number} two The first number to conduct a subtraction on.
 * @returns {number} Returns the result of the subtraction's result.
 */
export function digitDistance(
    one: number, 
    two: number
): number {
    let result: number;
    if (one < two) {
        result = (one -two)*(-1);
    }
    else {
        result = one-two;
    }
    return result;
}

/**
 * Retrieves the position of a letter in the alphabet.
 * @param {string} char The letter to retrieve the position of.
 * @returns {number} Returns the position of a letter in the alphabet.
 */
export function getPositionFromChar(
    char: string
): number {
    let result: number = 0;
    const character: string = char.toLowerCase();
    const alphabet: Array<string> = 'abcdefghijklmnopqrstuvwxyz'.split('');
    for (let i = 0; i < alphabet.length;i++){
        if (alphabet[i] == character){
            result = i + 1;
        }
        else {
            // Do nothing.
        }
    }
    return result;
}

/**
 * Checks whether the supplied character is a letter.
 * @param {string} char The character to check the type of.
 * @returns {boolean} Returns a boolean reflecting whether the 
 * supplied character is a letter or not.
 */
export function isLetter(char: string): boolean {
    let result: boolean = false;
    const alphabet: Array<string> = 'abcefghijklmnopqrstuvwxyz'.split('');
    for (let i = 0; i < alphabet.length;i++){
        if (alphabet[i] == char.toLowerCase()){
            result = true;
        }
        else {
            // Do nothing.
        }
    }
    return result;
}

/**
 * Checks whether the supplied character is a digit.
 * @param {string} char The character to check the type of.
 * @returns {boolean} Returns a boolean reflecting whether the 
 * supplied character is a digit or not.
 */
export function isDigit(char: string): boolean {
    let result: boolean = false;
    const alphabet: Array<string> = '1234567890'.split('');
    for (let i = 0; i < alphabet.length;i++){
        if (alphabet[i] == char){
            result = true;
        }
        else {
            // Do nothing.
        }
    }
    return result;
}

/**
 * Checks the type of the character supplied. 
 * @param {string} char The character to check the type of.
 * @returns {string} Returns either of these three strings: 
 * "letter", "digit" or "special".
 */
export function stringType(char: string): string {
    let charType: string;
    if (isLetter(char)){
        charType = "letter";
    }
    else if (isDigit(char)){
        charType = "digit";
    }
    else {
        charType = "special"
    }
    return charType;
}

/**
 * This function reduces a character down to a number that mathematical
 * operations can be conducted on.
 * @param {string} char The character to reduce to a number entity.
 * @param {number} letterWeight The weight assigned to normal alphabets. 
 * @param {number} specialCharWeight The weight assigned to special characters.
 * @returns {number} The number that the character has been reduced to is returned.
 */
export function reduceCharactersToNumber(
    char: string, 
    letterWeight: number, 
    specialCharWeight: number
): number {
    let result: number;
    const charType: string = stringType(char);
    if (charType === 'letter'){
        const pos: number = getPositionFromChar(char);
        result = pos * letterWeight;
    }
    else if (charType === 'digit'){
        result = parseInt(char);
    }
    else {
        result = specialCharWeight;
    }
    return result;
}

/**
 * This function calculates the security score of the supplied password
 * using the supplied weights.
 * @param {string} pwd The password to calculate the strength score of.
 * @param {number} letterWeight The weight assigned to normal alphabets. 
 * @param {number} specialCharWeight The weight assigned to special characters.
 * @returns {number} A number that reflects how secure a password is.
 */
export function securityScore(
    pwd: string, 
    letterWeight: number, 
    specialCharWeight: number,
): number {
    let score: number = 0;
    if (pwd === ''){
        // Do nothing.
    }
    else {
        const pwdChars: Array<string> = pwd.split('');
        const lastIndex: number = pwdChars.length - 1;
        for (let i = 0; i < pwdChars.length; i++){
            const currChar: string = pwdChars[i];
            let nextCharIdx: number;
            if (i === lastIndex){
                nextCharIdx = i - 1;
            }
            else {
                nextCharIdx = i + 1;
            }
            const nextChar: string = pwdChars[nextCharIdx];
            const currCharScore: number = reduceCharactersToNumber(
                currChar,
                letterWeight,
                specialCharWeight
            );
            const nextCharScore: number = reduceCharactersToNumber(
                nextChar,
                letterWeight,
                specialCharWeight
            );
            
            const distance: number = digitDistance(currCharScore, nextCharScore);
            score = score + distance;           
        }
    }
    return score;
}

/**
 * This function checks whether the security score of the supplied
 * password is larger or smaller than the supplied "cutOff" value.
 * @param {string} pwd The password to calculate the strength score of.
 * @param {number} letterWeight The weight assigned to normal alphabets. 
 * @param {number} specialCharWeight The weight assigned to special characters.
 * @param {number} cutOff The value that the calculated security score has to be
 * smaller or larger than.
 * @returns {boolean} Returns a boolean that reflects whether the calculated 
 * security score of the supplied password is larger or smaller than the
 * supplied "cutOff" value.
 */
export function isSecure(
    pwd: string, 
    letterWeight: number, 
    specialCharWeight: number,
    cutOff: number
): boolean {
    const score: number = securityScore(
        pwd,
        letterWeight,
        specialCharWeight
    );
    let result: boolean = false;
    if (score < cutOff){
        // Do nothing.
    }
    else {
        result = true;
    }
    return result;
}

/**
 * This function runs the analysis functions for password strength
 * analysis and adds the information to an instance of the "SecurityInfo"
 * JSON interface. This instance is then returned.
 * @param {string} pwd The password whose strength to analyze.
 * @param {number} letterWeight The weight assigned to letters of the alphabet.
 * @param {number} specialCharWeight The weight assigned to special characters.
 * @param {number} cutOff The value that the calculated security score has to be 
 * larger or greater than for the password to be deemed secure.
 * @returns {SecurityInfo} Returns an instance of the "SecurityInfo" JSON
 * interface providing a summary of the analysis results.
 */
export function shieldSummary(pwd: string, 
    letterWeight: number, 
    specialCharWeight: number,
    cutOff: number
): SecurityInfo{
    const score: number = securityScore(
        pwd,
        letterWeight,
        specialCharWeight
    );
    const securityStatus: boolean = isSecure(
        pwd,
        letterWeight,
        specialCharWeight,
        cutOff,
    );
    return {
        password: pwd,
        score: score,
        cutOff: cutOff,
        isSecure: securityStatus
    };
}

// Exporting the "SecurityInfo" JSON interface.
export type { SecurityInfo };

// Exporting the functions this module contains.
export default {
    isDigit,
    isLetter,
    isSecure,
    stringType,
    shieldSummary,
    securityScore,
    digitDistance,
    getPositionFromChar
};