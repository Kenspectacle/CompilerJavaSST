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

//Class Imports
const {LinkedList} = require('./linkedlist.cjs');

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

function isValidLessEqual(tokenType) {
    if (tokenType[pointer] === "<=") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidEqualEqual(tokenType) {
    if (tokenType[pointer] === "==") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidMoreEqual(tokenType) {
    if (tokenType[pointer] === ">=") {
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

function isValidEqual(tokenType) {
    if (tokenType[pointer] === "=") {
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
    if (tokenType[pointer] === "final") {
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
/*

Logic Guidelines For Implementing EBNF:
| = ||
[Optional] = check both if with and without
{repeating} = use while loop until its not true anymore
Serial = use && boolean logic, will shortcircuit at the part where it is wrong

*/

//local declaration

function isValidLocalDeclaration(tokenType) {
    if (isValidInteger(tokenType)
        && isValidIdentifier(tokenType)
        && isValidSemiColon(tokenType)) {
        return true;
    }
    return false;
}

//formal parameters section
function isValidFormalParametersSection(tokenType) {
    if (isValidInteger(tokenType)
        && isValidIdentifier(tokenType)) {
        return true;
    } else {
        return false;
    }
}

//formal parameters
function isValidFormalParameters(tokenType) {
    console.log('kg13')
    console.log('pointerkg13', pointer)
    if (isValidLeftParenthesis(tokenType)) {
        console.log('kg14')
        console.log('pointerkg14', pointer)
        if (isValidFormalParametersSection(tokenType)) {
            //optional additional valid formal parameters
            while (tokenType[pointer] === ",") {
                if (isValidComma(tokenType)
                    && isValidFormalParametersSection(tokenType)) {
                    if (isValidRightParenthesis(tokenType)) { //check ending bracket
                        console.log('kg15')
                        return true;
                    }
                }
                //not valid formal parameters
                console.log(kg)
                return false;

            }

        }
        if (isValidRightParenthesis(tokenType)) {
            return true;
        }
    }
}

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
    let tempPointer = pointer;
    //lots of OR statement in the EBNF
    if (isValidLeftParenthesis(tokenType) && isValidExpression(tokenType) && isValidRightParenthesis(tokenType)) {
        return true;
    } else {
        pointer = tempPointer;
    }
    if (isValidInternProcedureCall(tokenType)) { //check for intern procedure call first, since identifier is a subset of it
        return true;
    } else {
        pointer = tempPointer;
    }
    if (isValidNumber(tokenType)) {
        return true;
    } else {
        pointer = tempPointer;
    }
    if (isValidIdentifier(tokenType)) {
        return true;
    } else {
        pointer = tempPointer;
    }
    return false;
}

//term
function isValidTerm(tokenType) {
    if (isValidFactor(tokenType)) {
        //optional additional factors
        while (tokenType[pointer] === "*" || tokenType[pointer] === "/") {
            if ((isValidTimes(tokenType)
                || isValidDivision(tokenType))
                && isValidFactor(tokenType)) {
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}

//simple expression
function isValidSimpleExpression(tokenType) {
    if (isValidTerm(tokenType)) {
        //optional repeating additional terms
        while (tokenType[pointer] === "+" || tokenType[pointer] === "-") {
            if ((isValidPlus(tokenType)
                || isValidMinus(tokenType))
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
        if ((isValidLess(tokenType)
            || isValidMore(tokenType)
            || isValidEqualEqual(tokenType)
            || isValidMoreEqual(tokenType)
            || isValidLessEqual(tokenType))
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
                    && isValidExpression(tokenType)
                    && isValidRightParenthesis(tokenType)) {
                    return true;
                }
            }
        }
        if (isValidRightParenthesis(tokenType)) {
            return true;
        }
        return false;
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
    let tempPointer = pointer;
    if (isValidAssignment(tokenType)) {
        return true;
    } else {
        pointer = tempPointer;
    }
    if (isValidProcedureCall(tokenType)) return true;
    if (isValidIfStatement(tokenType)) return true;
    if (isValidWhileStatement(tokenType)) return true;
    if (isValidReturnStatement(tokenType)) return true;
    return false;
}

//statement sequence

function isValidStatementSequence(tokenType) {
    if (isValidStatement(tokenType)) {
        while (tokenType[pointer] === "identifier" //check for Assignment and Procedure Call
            || tokenType[pointer] === "if" //check for if
            || tokenType[pointer] === "while" //check for while
            || tokenType[pointer] === "return" // check for return
        ) {
            if (isValidStatement(tokenType)) {
                console.log('kg30')
                continue;
            }
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
    if (isValidLeftCurlyBracket(tokenType)) {
        while (tokenType[pointer] === "int") {
            if (isValidLocalDeclaration(tokenType)) {
                console.log('kg20')
                console.log('pointerkg20:', pointer)
                continue; //check for local declaration, and then repeat the if to continue the pointer
            }
        }
        //breaks as soon as there are no longer any local declarations
        if (isValidStatementSequence(tokenType)
            && isValidRightCurlyBracket(tokenType)) {
            return true;
        }
        return false;
    }
    return false;
}

//method head

function isValidMethodHead(tokenType) {
    console.log('kg11');
    console.log('pointer:', pointer);
    if (isValidPublic(tokenType)
        && isValidMethodType(tokenType)
        && isValidIdentifier(tokenType)
        && isValidFormalParameters(tokenType)) {
        console.log('kg12');
        return true;
    }
    return false;
}

//method declaration
function isValidMethodDeclaration(tokenType) {
    console.log('kg10');
    console.log('pointerkg10:', pointer);
    if (isValidMethodHead(tokenType)
        && isValidMethodBody(tokenType)) {
        console.log('kg12');
        return true;
    }
    return false;
}


//declarations
function isValidDeclaration(tokenType) {
    let validityFlag = false; //gets switch to true as soon as it enters at least one loop to see if its not an empty class!
    console.log(pointer);
    console.log(tokenType);
    while (tokenType[pointer] === "final" || tokenType[pointer] === "int" || tokenType[pointer] === "public") {
        validityFlag = true;
        console.log('kg2')
        console.log('tokentypesssss', tokenType[pointer])
        switch (tokenType[pointer]) {
            case ("final"):
                console.log('kg3')
                if (isValidFinal(tokenType)
                    && isValidInteger(tokenType)
                    && isValidIdentifier(tokenType)
                    && isValidEqual(tokenType)
                    && isValidExpression(tokenType)
                    && isValidSemiColon(tokenType)) {
                    console.log('kg4');
                    console.log(pointer);
                    continue;
                }
            case ("int"):
                console.log('kg5')
                if (isValidInteger(tokenType)
                    && isValidIdentifier(tokenType)
                    && isValidSemiColon(tokenType)) {
                    console.log(pointer)
                    continue;
                }
            case ("public"):
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

function parser(tokenType, symbolTable) {
    console.log('pointer:', pointer);
    console.log('tokentype.length', tokenType.length);
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
        // console.log('test');
        // console.log(pointer);
    }
}

const ll = new LinkedList();

ll.insertFirst(100);
ll.insertFirst(200);
ll.insertFirst(300);
ll.insertLast(400);

ll.insertAt(500, 2);
// ll.getAt(2);
ll.removeAt(3)


ll.printListData();

// console.log(tokenType, "tokentype");
parser(tokenType, symbolTable);

