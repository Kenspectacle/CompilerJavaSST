/*

Middleware for the parser
it takes the input of the scanner, and output the result that ignores the comments found in the scanner

*/


const fs = require('fs') //read file
const path = require('path');
const scanner = require(path.resolve(__dirname, "../scannerv2.js")); // scanner

let text = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString();
scannedText = scanner(text)
console.log("scanned Text:", scannedText);
let parserPreprocessor = (scannedText) => {
    //Removing Comments

    //Comments using two pointers
    let p1 = 0 //search index pointer 1
    let p2 = 0 //search index pointer 2
    while(p1 != text.length - 1) {
        //remove comments with "//"
        if(scannedText[p1] === "//") {
            p2 = p1 + 1;
            if(scannedText[p2] === "\n" || scannedText[p2] === undefined) {
                scannedText.splice(p1, 1); //removes the "//"
                continue;
            }
            scannedText.splice(p2, 1); //remove one element next to it
            continue;
        }
        //remove comments with /* */ terminals
        if(scannedText[p1] === "/*") {
            //intiialize
            if(p1 > p2) {
                p2 = p1 + 1;
            }
            //skip nextlines, important for debugging
            if(scannedText[p2] === "\n") {
                p2++;
                continue;
            }
            //base case p2 is the same as "*/"
            if(scannedText[p2] === "*/") {
                scannedText.splice(p2, 1); //remove ending */
                scannedText.splice(p1, 1); //remove starting /*
                continue;
            }
            //remove the rest
            scannedText.splice(p2, 1); //remove element at p2
            continue;
        }
        p1++;
        
    }
    let preprocessedScannedText = scannedText;
    console.log("preprocessed scanned text:", preprocessedScannedText);
    return preprocessedScannedText;
};

parserPreprocessor(scannedText);
module.exports = parserPreprocessor;