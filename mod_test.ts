/*
ShangShield.ts by Alyx Shang.
Licensed under the FSL v1.
*/

// Importing the "SecurityInfo"
// JSON interface for explicit typing.
import { SecurityInfo } from "./mod.ts";

// Importing all functions to test them.
import * as shangshield from './mod.ts';

// Importing the "assertEquals" function
// to run tests.
import { assertEquals } from "@std/assert";

// Defining variables that will not be changed
// and are needed for running testing.
const pwd: string = "1456HoglinSteak_@@";
const letterWeight: number = 15;
const specialCharWeight: number = 16;
const falseScore: number = 6;
const trueScore: number = 1213;
const cutOff: number = 100;
const testResult: SecurityInfo = {
    password: pwd,
    score: trueScore,
    cutOff: 100,
    isSecure: true
};

// Testing the \"isDigit\" function. (true case).
Deno.test(
    "Testing the \"isDigit\" function. (true case)",
    () => assertEquals(shangshield.isDigit("3"),(true))
)

// Testing the \"isDigit\" function. (false case)
Deno.test(
    "Testing the \"isDigit\" function. (false case)",
    () => assertEquals(shangshield.isDigit("A"),(false))
)

// Testing the \"isLetter\" function. (true case)
Deno.test(
    "Testing the \"isLetter\" function. (true case)",
    () => assertEquals(shangshield.isLetter("A"),(true))
)

// Testing the \"isLetter\" function. (false case)
Deno.test(
    "Testing the \"isLetter\" function. (false case)",
    () => assertEquals(shangshield.isLetter("3"),(false))
)

// Testing the \"stringType\" function. (letter)
Deno.test(
    "Testing the \"stringType\" function. (letter)",
    () => assertEquals(shangshield.stringType("A"), "letter")
)

// Testing the \"stringType\" function. (digit)
Deno.test(
    "Testing the \"stringType\" function. (digit)",
    () => assertEquals(shangshield.stringType("3"), "digit")
)

// Testing the \"stringType\" function. (special)
Deno.test(
    "Testing the \"stringType\" function. (special)",
    () => assertEquals(shangshield.stringType("@"), "special")
)

// Testing the \"getPositionFromChar\" function.
Deno.test(
    "Testing the \"getPositionFromChar\" function.",
    () => assertEquals(shangshield.getPositionFromChar("D"), 4)
)

// Testing the \"digitDistance\" function. (normal case)
Deno.test(
    "Testing the \"digitDistance\" function. (normal case)",
    () => assertEquals(shangshield.digitDistance(4, 24), 20)
)

// Testing the \"digitDistance\" function. (special case)
Deno.test(
    "Testing the \"digitDistance\" function. (special case)",
    () => assertEquals(shangshield.digitDistance(24, 4), 20)
)

// Testing the \"isSecure\" function. (true case)
Deno.test(
    "Testing the \"isSecure\" function. (true case)",
    () => assertEquals(shangshield.isSecure(pwd,letterWeight,specialCharWeight,100), true)
) 

// Testing the \"isSecure\" function. (false case)
Deno.test(
    "Testing the \"isSecure\" function. (false case)",
    () => assertEquals(shangshield.isSecure("123456",letterWeight,specialCharWeight,100), false)
)

// Testing the \"securityScore\" function.
Deno.test(
    "Testing the \"securityScore\" function.",
    () => assertEquals(shangshield.securityScore("123456",letterWeight,specialCharWeight), falseScore)
)

// Testing the \"shieldSummary\" function.
Deno.test(
    "Testing the \"shieldSummary\" function.",
    () => assertEquals(shangshield.shieldSummary(pwd,letterWeight,specialCharWeight,cutOff), testResult)
)