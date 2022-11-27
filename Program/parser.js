/*

Used to parse through the output of the scanner, see if the syntax are valid.
Will be using the symbol table to check for keywords

*/

const fs = require('fs') //read file
const path = require('path');
const Scanner = require(path.resolve(__dirname, "./scannerv2.js")); // scanner

let text = fs.readFileSync('./input.txt').toString()

console.log(Scanner(text));