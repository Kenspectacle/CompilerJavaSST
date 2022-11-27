/*

Used to parse through the output of the scanner, see if the syntax are valid.
Will be using the symbol table to check for keywords

*/

const fs = require('fs') //read file

let text = fs.readFileSync('./input.txt').toString()