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
const {tokens} = require(path.resolve(__dirname, "./scanner.js")); // scanner
// const symbolTable = require(path.resolve(__dirname, "./symboltable.js")); //symbol table

//util
// const parserPreprocessor = require(path.resolve(__dirname, "Util/ParserPreprocessor.js"));

let text = fs.readFileSync('./input.txt').toString()
// preprocessedScannedText = parserPreprocessor(scanner(text));

//Subroutines for parsing

////////////////////////////////////////////////////////////Identifiers and Numbers////////////////////////////////////////////////////////////

//identifier
function isValidIdentifier() {
    if (tokens[pointer].contentType === "identifier") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//number
function isValidNumber() {
    if (tokens[pointer].contentType === "number") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//semicolon
function isValidSemiColon() {
    if (tokens[pointer].contentType === ";") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//comma
function isValidComma() {
    if (tokens[pointer].contentType === ",") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Comparison////////////////////////////////////////////////////////////

function isValidLess() {
    if (tokens[pointer].contentType === "<") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidMore() {
    if (tokens[pointer].contentType === ">") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidLessEqual() {
    if (tokens[pointer].contentType === "<=") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidEqualEqual() {
    if (tokens[pointer].contentType === "==") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidMoreEqual() {
    if (tokens[pointer].contentType === ">=") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Arithmetic Expressions////////////////////////////////////////////////////////////

function isValidPlus() {
    if (tokens[pointer].contentType === "+") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidMinus() {
    if (tokens[pointer].contentType === "-") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidTimes() {
    if (tokens[pointer].contentType === "*") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidDivision() {
    if (tokens[pointer].contentType === "/") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidEqual() {
    if (tokens[pointer].contentType === "=") {
        pointer++;
        return true;
    } else {
        return false;
    }
}
////////////////////////////////////////////////////////////Curly Brackets////////////////////////////////////////////////////////////

//left curly bracket
function isValidLeftCurlyBracket() {
    if (tokens[pointer].contentType === "{") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//right curly bracket
function isValidRightCurlyBracket() {
    if (tokens[pointer].contentType === "}") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Square Brackets////////////////////////////////////////////////////////////

//left square bracket
function isValidLeftSquareBracket() {
    if (tokens[pointer].contentType === "[") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//right square bracket
function isValidRightSquareBracket() {
    if (tokens[pointer].contentType === "]") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Parenthesis////////////////////////////////////////////////////////////

//left parenthesis
function isValidLeftParenthesis() {
    if (tokens[pointer].contentType === "(") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

//right parenthesis
function isValidRightParenthesis() {
    if (tokens[pointer].contentType === ")") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Datatype////////////////////////////////////////////////////////////

function isValidInteger() {
    if (tokens[pointer].contentType === "int") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////Special Keywords////////////////////////////////////////////////////////////

function isValidFinal() {
    if (tokens[pointer].contentType === "final") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidPublic() {
    if (tokens[pointer].contentType === "public") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidVoid() {
    if (tokens[pointer].contentType === "void") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidIf() {
    if (tokens[pointer].contentType === "if") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidElse() {
    if (tokens[pointer].contentType === "else") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidWhile() {
    if (tokens[pointer].contentType === "while") {
        pointer++;
        return true;
    } else {
        return false;
    }
}

function isValidReturn() {
    if (tokens[pointer].contentType === "return") {
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

function isValidLocalDeclaration() {
    if (isValidInteger()
        && isValidIdentifier()
        && isValidSemiColon()) {
        classLL.insertLast(tokens[pointer - 2]); //get the identifier
        return true;
    }
    return false;
}

//formal parameters section
function isValidFormalParametersSection() {
    if (isValidInteger()
        && isValidIdentifier()) {
        return true;
    } else {
        return false;
    }
}

//formal parameters
function isValidFormalParameters() {
    if (isValidLeftParenthesis()) {
        if (isValidFormalParametersSection()) {
            //optional additional valid formal parameters
            while (tokens[pointer].contentType === ",") {
                if (isValidComma()
                    && isValidFormalParametersSection()) {
                    if (isValidRightParenthesis()) { //check ending bracket
                        return true;
                    }
                }
                //not valid formal parameters
                return false;

            }

        }
        if (isValidRightParenthesis()) {
            return true;
        }
    }
}

//assignment
function isValidAssignment() {
    if (isValidIdentifier()
        && isValidEqual()
        && isValidExpression()
        && isValidSemiColon()) {
        return true;
    }
    return false;
}

//factor
function isValidFactor() {
    let tempPointer = pointer;
    //lots of OR statement in the EBNF
    if (isValidLeftParenthesis() && isValidExpression() && isValidRightParenthesis()) {
        return true;
    } else {
        pointer = tempPointer;
    }
    if (isValidInternProcedureCall()) { //check for intern procedure call first, since identifier is a subset of it
        return true;
    } else {
        pointer = tempPointer;
    }
    if (isValidNumber()) {
        return true;
    } else {
        pointer = tempPointer;
    }
    if (isValidIdentifier()) {
        return true;
    } else {
        pointer = tempPointer;
    }
    return false;
}

//term
function isValidTerm() {
    if (isValidFactor()) {
        //optional additional factors
        while (tokens[pointer].contentType === "*" || tokens[pointer].contentType === "/") {
            if ((isValidTimes()
                || isValidDivision())
                && isValidFactor()) {
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}

//simple expression
function isValidSimpleExpression() {
    if (isValidTerm()) {
        //optional repeating additional terms
        while (tokens[pointer].contentType === "+" || tokens[pointer].contentType === "-") {
            if ((isValidPlus()
                || isValidMinus())
                && isValidTerm()) {
                return true;
            }
            return false; //only a plus/minus at the end with no additional term, false
        }
        return true;
    }
    return false;
}

//expression
function isValidExpression() {
    if (isValidSimpleExpression()) {
        //optional compared simple expressions
        if ((isValidLess()
            || isValidMore()
            || isValidEqualEqual()
            || isValidMoreEqual()
            || isValidLessEqual())
            && isValidSimpleExpression()) {
            return true;
        }
        return true;
    }
    return false;
}

//actual parameter
function isValidActualParameters() {
    if (isValidLeftParenthesis()) {
        //optional expression
        if (isValidExpression()) {
            while (tokens[pointer].contentType === ",") {
                if (isValidComma()
                    && isValidExpression()
                    && isValidRightParenthesis()) {
                    return true;
                }
            }
        }
        if (isValidRightParenthesis()) {
            return true;
        }
        return false;
    }
    return false;
}

//intern procedure call
function isValidInternProcedureCall() {
    if (isValidIdentifier() && isValidActualParameters()) {
        return true;
    }
    return false;
}

//procedure call
function isValidProcedureCall() {
    if (isValidInternProcedureCall()
        && isValidSemiColon()) {
        return true;
    }
    return false;
}

// if statement
function isValidIfStatement() {
    if (isValidIf()
        && isValidLeftParenthesis()
        && isValidExpression()
        && isValidRightParenthesis()
        && isValidLeftCurlyBracket()
        && isValidStatementSequence()
        && isValidRightCurlyBracket()
        && isValidElse()
        && isValidLeftCurlyBracket()
        && isValidStatementSequence()
        && isValidRightCurlyBracket()) {
        return true;
    }
    return false;
}

//while statement
function isValidWhileStatement() {
    if (isValidWhile()
        && isValidLeftParenthesis()
        && isValidExpression()
        && isValidRightParenthesis()
        && isValidLeftCurlyBracket()
        && isValidStatementSequence()
        && isValidRightCurlyBracket()) {
        return true;
    }
    return false;
}

//return statement
function isValidReturnStatement() {
    if (isValidReturn()) {
        if (isValidSimpleExpression() && isValidSemiColon()) {
            return true;
        } else if (isValidSemiColon()) {
            return true;
        }
        return false;
    }
    return false;
}

//statement
function isValidStatement() {
    let tempPointer = pointer;
    if (isValidAssignment()) {
        return true;
    } else {
        pointer = tempPointer;
    }
    if (isValidProcedureCall()) return true;
    if (isValidIfStatement()) return true;
    if (isValidWhileStatement()) return true;
    if (isValidReturnStatement()) return true;
    return false;
}

//statement sequence

function isValidStatementSequence() {
    if (isValidStatement()) {
        while (tokens[pointer].contentType === "identifier" //check for Assignment and Procedure Call
            || tokens[pointer].contentType === "if" //check for if
            || tokens[pointer].contentType === "while" //check for while
            || tokens[pointer].contentType === "return" // check for return
        ) {
            if (isValidStatement()) {
                continue;
            }
        }
        return true;
    }
    return false;
}

//method type

function isValidMethodType() {
    if (isValidVoid()) {
        classLL.insertLast(tokens[pointer])
        return true;
    }
    if (isValidInteger()) { 
        classLL.insertLast(tokens[pointer])
        return true;
    }
    return false;

}

//method body

function isValidMethodBody() {
    if (isValidLeftCurlyBracket()) {
        while (tokens[pointer].contentType === "int") {
            if (isValidLocalDeclaration()) {
                continue; //check for local declaration, and then repeat the if to continue the pointer
            }
        }
        //breaks as soon as there are no longer any local declarations
        if (isValidStatementSequence()
            && isValidRightCurlyBracket()) {
            return true;
        }
        return false;
    }
    return false;
}

//method head

function isValidMethodHead() {
    if (isValidPublic()
        && isValidMethodType()
        && isValidIdentifier()
        && isValidFormalParameters()) {
        return true;
    }
    return false;
}

//method declaration
function isValidMethodDeclaration() {
    if (isValidMethodHead()
        && isValidMethodBody()) {
        return true;
    }
    return false;
}


//declarations
function isValidDeclaration() {
    let validityFlag = false; //gets switch to true as soon as it enters at least one loop to see if its not an empty class!
    while (tokens[pointer].contentType === "final" || tokens[pointer].contentType === "int" || tokens[pointer].contentType === "public") {
        validityFlag = true;
        switch (tokens[pointer].contentType) {
            case ("final"):
                if (isValidFinal()
                    && isValidInteger()
                    && isValidIdentifier()
                    && isValidEqual()
                    && isValidExpression()
                    && isValidSemiColon()) {
                    classLL.insertLast(tokens[pointer - 4]) //get the Identifier
                    continue;
                }
            case ("int"):
                if (isValidInteger()
                    && isValidIdentifier()
                    && isValidSemiColon()) {
                    classLL.insertLast(tokens[pointer - 2]) //get the Identifier
                    continue;
                }
            case ("public"):
                if (isValidMethodDeclaration()) {
                    continue;
                }
        }
    }
    return validityFlag;
}

//class body

function isValidClassBody() {
    if (isValidLeftCurlyBracket()
        && isValidDeclaration()
        && isValidRightCurlyBracket()) {
        return true;
    }
    return false;
}

//class
function isValidClass() {
    if (tokens[pointer].contentType === "class") {
        pointer++;
        if (isValidIdentifier()
            && isValidClassBody()) {
            return true;
        }
    }
    return false;
}



let pointer = 0;

function parser() {
    while (pointer < tokens.length) {
        switch (true) {
            //possible starting symbols
            case (tokens[pointer].contentType === 'class'):
                if (isValidClass()) {
                    return true; //Parser run successfully
                }
                continue;
        }
    }
}
const classLL = new LinkedList();
console.log(parser(tokens))
classLL.printListData()