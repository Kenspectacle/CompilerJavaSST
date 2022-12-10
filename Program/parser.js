/*

Used to parse through the output of the scanner, see if the syntax are valid.
Will be using the symbol table to check for keywords

TO-BE-IMPLEMENTED
Line number finder
if - else condition
valid arithmetics
while loop
for loop


*/

const fs = require('fs') //read file
const path = require('path');
const scanner = require(path.resolve(__dirname, "./scanner.js")); // scanner
const symbolTable = require(path.resolve(__dirname, "./symboltable.js")); //symbol table

//util
// const parserPreprocessor = require(path.resolve(__dirname, "Util/ParserPreprocessor.js"));

let text = fs.readFileSync('./input.txt').toString()

// preprocessedScannedText = parserPreprocessor(scanner(text));
let token, tokenType = scanner(text);
let parser = (tokenType, symbolTable) => {
    let pointer = 0;
    while(pointer < tokenType.length) {
        switch(true) {
            //possible starting symbols
            case(tokenType[pointer] === 'class'):
                console.log('test');
                continue;
        }
    }

}

console.log(tokenType, "tokentype");
parser(tokenType, symbolTable);