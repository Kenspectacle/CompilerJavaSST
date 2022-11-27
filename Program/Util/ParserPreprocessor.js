/*

Middleware for the parser
it takes the input of the scanner, and output the result that ignores the comments found in the scanner

*/


const fs = require('fs') //read file
const path = require('path');
const scanner = require(path.resolve(__dirname, "../scannerv2.js")); // scanner

let text = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString();
scannedText = scanner(text)
console.log(scannedText);
let parserPreprocessor = (scannedText) => {
    //Removing Comments

    //Comments with //
    let p1 = 0 //search index pointer 1
    let p2 = 0 //search index pointer 2
    while(p1 != text.length - 1) {
        
        if(scannedText[p1] === "//") {
            p2 = p1 + 1
            console.log(p1);
            if(scannedText[p2] === "\n" || scannedText[p2] === undefined) {
                scannedText.splice(p1, 1); //removes the "//"
                continue;
            }
            scannedText.splice(p2, 1); //remove one element next to it
            continue;
        }
        p1++;
    }
    console.log(scannedText);
    return scannedText;
};

parserPreprocessor(scannedText);
