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
const scanner = require(path.resolve(__dirname, "./scannerv2.js")); // scanner
const symbolTable = require(path.resolve(__dirname, "./symboltable.js")); //symbol table

//util
const parserPreprocessor = require(path.resolve(__dirname, "Util/ParserPreprocessor.js"));

let text = fs.readFileSync('./input.txt').toString()

preprocessedScannedText = parserPreprocessor(scanner(text));
let parser = (preprocessedScannedText, symboltable) => {
    let p1 = 0; //first pointer
    let p2 = 0; //second pointer
    let p3 = 0; //third pointer
    let p4 = 0; //fourth pointer
    let p5 = 0; //fifth pointer
    //check for if, parenthesis () after key word, and optionally {} afterward
    while (true) {
        if (preprocessedScannedText[p1] === "if") {
            //base case
            if (p2 < p1) p2 = p1 + 1; //used to find (, has to be 1 symbol next to if
            if (preprocessedScannedText[p2] === "(") {
                if (p3 < p2) p3 = p2 + 1; //used to find )
                if (preprocessedScannedText[p3] === ")") {
                    if (p4 < p3) p4 = p3 + 1; //used to find {, optional
                    if (preprocessedScannedText[p4] === "{") {
                        if (p5 < p4) p5 = p4 + 1; //used to find }, mandatory again
                        if (preprocessedScannedText[p5] === "}") {
                            console.log("valid if");
                            p1 = p5 + 1;
                            continue;
                        } else if (p5 === preprocessedScannedText.length - 1) {
                            console.error("error, expected '}' at line X");
                        } else {
                            p5++;
                            continue;
                        }
                    } else {
                        console.log("valid if"); //because no { is found
                        p1 = p3 + 1;
                        continue;
                    }
                } else if (p3 === preprocessedScannedText.length - 1 && p3 !== ")") {
                    console.error("error, expected ')' at line X");
                } else {
                    p3++; //increment p3
                    continue;
                }

            } else if (p2 === preprocessedScannedText.length - 1 && p2 !== "(") {
                console.error("error, expected '(' at line X")
            }
        } else if(p1 === preprocessedScannedText.length - 1) {
            break;
        } else {
            p1++;
            continue;
        }
    }

}

parser(preprocessedScannedText, 0);