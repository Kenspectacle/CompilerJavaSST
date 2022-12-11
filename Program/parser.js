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

//Subroutines for parsing

////////////////////////////////////////////////////////////Identifiers and Numbers////////////////////////////////////////////////////////////

//identifier
let isValidIdentifier = (tokenType) => {
    if (tokenType[pointer] === "identifier") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//number
let isValidNumber = (tokenType) => {
    if (tokenType[pointer] === "number") {
        pointer++;
        return true;
    } else {
        return false;
    }
}


////////////////////////////////////////////////////////////Comparison////////////////////////////////////////////////////////////

let isValidLess = (tokenType) => {
    if (tokenType[pointer] === "<") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

let isValidMore = (tokenType) => {
    if (tokenType[pointer] === ">") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Arithmetic Expressions////////////////////////////////////////////////////////////

let isValidPlus = (tokenType) => {
    if (tokenType[pointer] === "+") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

let isValidMinus = (tokenType) => {
    if (tokenType[pointer] === "-") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

let isValidTimes = (tokenType) => {
    if (tokenType[pointer] === "*") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

let isValidDivision = (tokenType) => {
    if (tokenType[pointer] === "/") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Curly Brackets////////////////////////////////////////////////////////////

//left curly bracket
let isValidLeftCurlyBracket = (tokenType) => {
    if (tokenType[pointer] === "{") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//right curly bracket
let isValidRightCurlyBracket = (tokenType) => {
    if (tokenType[pointer] === "}") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Square Brackets////////////////////////////////////////////////////////////

//left square bracket
let isValidLeftSquareBracket = (tokenType) => {
    if (tokenType[pointer] === "[") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//right square bracket
let isValidRightSquareBracket = (tokenType) => {
    if (tokenType[pointer] === "]") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Parenthesis////////////////////////////////////////////////////////////

//left parenthesis
let isValidLeftParenthesis = (tokenType) => {
    if (tokenType[pointer] === "(") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//right parenthesis
let isValidRightParenthesis = (tokenType) => {
    if (tokenType[pointer] === ")") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Datatype////////////////////////////////////////////////////////////

let isValidInteger = (tokenType) => {
    if (tokenType[pointer] === "int") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Special Keywords////////////////////////////////////////////////////////////

let isValidFinal = (tokenType) => {
    if (tokenType[pointer] === "Final") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

let isValidPublic = (tokenType) => {
    if (tokenType[pointer] === "public") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

let isValidVoid = (tokenType) => {
    if (tokenType[pointer] === "void") {
        pointer++;
        return true;
    } else {
        return false;
    }
}


////////////////////////////////////////////////////////////Complex Term////////////////////////////////////////////////////////////

//declarations
let isValidDeclaration = (tokenType) => {
    let validityFlag = false; //gets switch to true as soon as it enters at least one loop to see if its not an empty class!
    while (tokenType[pointer] === "final" || tokenType[pointer] === "int" || tokenType[pointer] === "public") {
        validityFlag = true;
        switch (true) {
            case (tokenType[pointer] === "final"):
                if (isValidFinal(tokenType)) {
                    if (isValidInteger(tokenType)) {
                        if (isValidIdentifier(tokenType)) {
                            if (isValidEqual(TokenType)) {
                                if (isValidExpression(TokenType)) {
                                    if (isValidSemiColon(TokenType)) {
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            case (tokenType[pointer] === "int"):
                if (isValidInteger(tokenType)) {
                    if (isValidIdentifier(tokenType)) {
                        if (isValidSemiColon(tokenType)) {
                            continue;
                        }
                    }
                }
            case (tokenType[pointer] === "public"):
                if (isValidMethodDeclaration (tokenType)) {
                    continue;
                }
        }
    }
    return validityFlag;
}

//class body

let isValidClassBody = (tokenType) => {
    if (isValidLeftCurlyBracket(tokenType)) {
        if (isValidDeclaration(tokenType)) {
            if (isValidRightCurlyBracket(tokenType)) {
                return true;
            }
        }
    }
    return false;
}

//class
let isValidClass = (tokenType) => {
    if (tokenType[pointer] === "class") {
        pointer++;
        if (isValidIdentifier(tokenType)) {
            if (isValidClassBody(tokenType)) {
                return true;
            }
        }
    }
    return false;
}



let pointer = 0;
let token, tokenType = scanner(text);
let parser = (tokenType, symbolTable) => {
    while (pointer < tokenType.length) {
        switch (true) {
            //possible starting symbols
            case (tokenType[pointer] === 'class'):
                // console.log("before if", pointer);
                if (isValidClass(tokenType, pointer)) {
                    pointer++;
                }
                continue;
        }
        console.log('test');
        console.log(pointer);
    }
}

// console.log(tokenType, "tokentype");
parser(tokenType, symbolTable);

