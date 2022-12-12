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
function isValidIdentifier(tokenType) {
    if (tokenType[pointer] === "identifier") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//number
function isValidNumber(tokenType) {
    if (tokenType[pointer] === "number") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//semicolon
function isValidSemiColon(tokenType) {
    if (tokenType[pointer] === ";") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//comma
function isValidComma(tokenType) {
    if (tokenType[pointer] === ",") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Comparison////////////////////////////////////////////////////////////

function isValidLess(tokenType) {
    if (tokenType[pointer] === "<") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidMore(tokenType) {
    if (tokenType[pointer] === ">") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Arithmetic Expressions////////////////////////////////////////////////////////////

function isValidPlus(tokenType) {
    if (tokenType[pointer] === "+") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidMinus(tokenType) {
    if (tokenType[pointer] === "-") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidTimes(tokenType) {
    if (tokenType[pointer] === "*") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidDivision(tokenType) {
    if (tokenType[pointer] === "/") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Curly Brackets////////////////////////////////////////////////////////////

//left curly bracket
function isValidLeftCurlyBracket(tokenType) {
    if (tokenType[pointer] === "{") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//right curly bracket
function isValidRightCurlyBracket(tokenType) {
    if (tokenType[pointer] === "}") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Square Brackets////////////////////////////////////////////////////////////

//left square bracket
function isValidLeftSquareBracket(tokenType) {
    if (tokenType[pointer] === "[") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//right square bracket
function isValidRightSquareBracket(tokenType) {
    if (tokenType[pointer] === "]") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Parenthesis////////////////////////////////////////////////////////////

//left parenthesis
function isValidLeftParenthesis(tokenType) {
    if (tokenType[pointer] === "(") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//right parenthesis
function isValidRightParenthesis(tokenType) {
    if (tokenType[pointer] === ")") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Datatype////////////////////////////////////////////////////////////

function isValidInteger(tokenType) {
    if (tokenType[pointer] === "int") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Special Keywords////////////////////////////////////////////////////////////

function isValidFinal(tokenType) {
    if (tokenType[pointer] === "Final") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidPublic(tokenType) {
    if (tokenType[pointer] === "public") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidVoid(tokenType) {
    if (tokenType[pointer] === "void") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidIf(tokenType) {
    if (tokenType[pointer] === "if") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidElse(tokenType) {
    if (tokenType[pointer] === "else") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidWhile(tokenType) {
    if (tokenType[pointer] === "while") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidReturn(tokenType) {
    if (tokenType[pointer] === "return") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Complex Term////////////////////////////////////////////////////////////

//assignment
function isValidAssignment(tokenType) {
    if (isValidIdentifier(tokenType)
        && isValidEqual(tokenType)
        && isValidExpression(tokenType)
        && isValidSemiColon(tokenType)) {
        return true;
    }
    return false;
}

//factor
function isValidFactor(tokenType) {
    if (isValidIdentifier(tokenType)
        || isValidNumber(tokenType)
        || (isValidLeftParenthesis(tokenType) && isValidExpression(tokenType) && isValidRightParenthesis(tokenType))
        || isValidInternProcedureCall(tokenType)) {
        return true;
    }
    return false;
}

//term
function isValidTerm(tokenType) {
    if (isValidFactor(tokenType)) {
        //optional additional factors
        while (tokenType[pointer] === "*" || tokenType[pointer] === "/") {
            if (isValidTimes(tokenType)
                || isValidDivision(tokenType)
                && isValidFactor(tokenType)) {
                return true;
            }
            return false;
        }
    }
    return false;
}

//simple expression
function isValidSimpleExpression(tokenType) {
    if (isValidTerm(tokenType)) {
        //optional repeating additional terms
        while (tokenType[pointer] === "+" || tokenType[pointer] === "-") {
            if (isValidPlus(tokenType)
                || isValidMinus(tokenType)
                && isValidTerm(tokenType)) {
                return true;
            }
            return false; //only a plus/minus at the end with no additional term, false
        }
        return true;
    }
    return false;
}

//expression
function isValidExpression(tokenType) {
    if (isValidSimpleExpression(tokenType)) {
        //optional compared simple expressions
        if (isValidLess(tokenType)
            || isValidMore(tokenType)
            && isValidSimpleExpression(tokenType)) {
            return true;
        }
        return true;
    }
    return false;
}

//actual parameter
function isValidActualParameters(tokenType) {
    if (isValidLeftParenthesis(tokenType)) {
        //optional expression
        if (isValidExpression(tokenType)) {
            while (tokenType[pointer] === ",") {
                if (isValidComma(tokenType)
                    && isValidExpression(tokenType)) {
                    return true;
                }
            }
        }
        if (isValidRightParenthesis(tokenType)) {
            return true;
        }
    }
    return false;
}

//intern procedure call
function isValidInternProcedureCall(tokenType) {
    if (isValidIdentifier(tokenType) && isValidActualParameters(tokenType)) {
        return true;
    }
    return false;
}

//procedure call
function isValidProcedureCall(tokenType) {
    if (isValidInternProcedureCall(tokenType)
        && isValidSemiColon(tokenType)) {
        return true;
    }
    return false;
}

// if statement
function isValidIfStatement(tokenType) {
    if (isValidIf(tokenType)
        && isValidLeftParenthesis(tokenType)
        && isValidExpression(tokenType)
        && isValidRightParenthesis(tokenType)
        && isValidLeftCurlyBracket(tokenType)
        && isValidStatementSequence(tokenType)
        && isValidRightCurlyBracket(tokenType)
        && isValidElse(tokenType)
        && isValidLeftCurlyBracket(tokenType)
        && isValidStatementSequence(tokenType)
        && isValidRightCurlyBracket(tokenType)) {
        return true;
    }
    return false;
}

//while statement
function isValidWhileStatement(tokenType) {
    if (isValidWhile(tokenType)
        && isValidLeftParenthesis(tokenType)
        && isValidExpression(tokenType)
        && isValidRightParenthesis(tokenType)
        && isValidLeftCurlyBracket(tokenType)
        && isValidStatementSequence(tokenType)
        && isValidRightCurlyBracket(tokenType)) {
        return true;
    }
    return false;
}

//return statement
function isValidReturnStatement(tokenType) {
    if (isValidReturn(tokenType)) {
        if (isValidSimpleExpression(tokenType) && isValidSemiColon(tokenType)) {
            return true;
        } else if (isValidSemiColon(tokenType)) {
            return true;
        }
        return false;
    }
    return false;
}

//statement
function isValidStatement(tokenType) {
    if (isValidAssignment(tokenType)) return true;
    if (isValidProcedureCall(tokenType)) return true;
    if (isValidIfStatement(tokenType)) return true;
    if (isValidWhileStatement(tokenType)) return true;
    if (isValidReturnStatement(tokenType)) return true;
    return false;
}

//statement sequence

function isValidStatementSequence(tokenType) {
    if (isValidStatement(tokenType)) {
        if (isValidStatement(tokenType)) {
            return true;
        }
        return true;
    }
    return false;
}

//method type

function isValidMethodType(tokenType) {
    if (isValidVoid(tokenType)) return true;
    if (isValidInteger(tokenType)) return true;
    return false;

}

//method body

function isValidMethodBody(tokenType) {
    if (isValidLeftCurlyBracket(tokenType)
        && isValidLocalDeclaration(tokenType)
        && isValidStatementSequence(tokenType)) {
        return true;
    }
    if (isValidStatementSequence(tokenType)) {
        return true;
    }
    return false;
}

//method head

function isValidMethodHead(tokenType) {
    if (isValidPublic(tokenType)
        && isValidMethodType(tokenType)
        && isValidIdentifier(tokenType)
        && isValidFormalParameters(tokenType)) {
        return true;
    }
    return false;
}

//method declaration
function isValidMethodDeclaration(tokenType) {
    if (isValidMethodHead(tokenType)
        && isValidMethodBody(tokenType)) {
        return true;
    }
    return false;
}


//declarations
function isValidDeclaration(tokenType) {
    let validityFlag = false; //gets switch to true as soon as it enters at least one loop to see if its not an empty class!
    while (tokenType[pointer] === "final" || tokenType[pointer] === "int" || tokenType[pointer] === "public") {
        validityFlag = true;
        switch (true) {
            case (tokenType[pointer] === "final"):
                if (isValidFinal(tokenType)
                    && isValidInteger(tokenType)
                    && isValidIdentifier(tokenType)
                    && isValidEqual(TokenType)
                    && isValidExpression(TokenType)
                    && isValidSemiColon(TokenType)) {
                    continue;
                }
            case (tokenType[pointer] === "int"):
                if (isValidInteger(tokenType)
                    && isValidIdentifier(tokenType)
                    && isValidSemiColon(tokenType)) {
                    continue;
                }
            case (tokenType[pointer] === "public"):
                if (isValidMethodDeclaration(tokenType)) {
                    continue;
                }
        }
    }
    return validityFlag;
}

//class body

function isValidClassBody(tokenType) {
    if (isValidLeftCurlyBracket(tokenType)
        && isValidDeclaration(tokenType)
        && isValidRightCurlyBracket(tokenType)) {
        return true;
    }
    return false;
}

//class
function isValidClass(tokenType) {
    if (tokenType[pointer] === "class") {
        pointer++;
        if (isValidIdentifier(tokenType)
            && isValidClassBody(tokenType)) {
            return true;
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

