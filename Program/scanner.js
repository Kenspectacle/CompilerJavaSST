/*
JavaSST Scanner
Checks the token by scanning the characters one by one
outputs an array

List of keywords in JavaSST:
class, public, void, if, int, final, return, else

To Do List
-Refactor the code
-Implement ignore feature for comments
-Add keywords entry for the special keyword
*/


const fs = require('fs') //read file

const path = require('path');
let text = fs.readFileSync(path.resolve(__dirname, "./input.txt")).toString();

console.log(text);

//initialize variables
let start = "";
let identifier = "";//for each identifiers
let identifierGroup = []; //group up identifer later on
let sym = new Map(); //set symbol as hashmap
let token = []; //make a list of tokens
let tokenType = []; //this describes, what kind of token it is

//initialize hashmap
sym.set('if', 0);
sym.set('(', 0);
sym.set(')', 0);
sym.set('+', 0);
sym.set('*', 0);
sym.set('{', 0);
sym.set('}', 0);
sym.set('[', 0);
sym.set(']', 0);
sym.set('class', 0);
sym.set('public', 0);
sym.set('void', 0);
sym.set('==', 0);
sym.set('<', 0);
sym.set('<=', 0);
sym.set('>', 0);
sym.set('>=', 0);
sym.set('variable', 0);
sym.set('int', 0);

//single symbol list
let singleSymbols = ['(', ')', '+', '*', '{', '}', '[', ']', ';', '-', ',', '/'];

//iterate through the text
let scanner = (text) => {
    while (text.length > 0) {
        identifier = ""; //reinitialize the identifier
        //find starting symbol
        start = text[0]; //initialize start
        // console.log(sym);
        switch (true) {
            //basic cases, single symbols
            case singleSymbols.includes(start):
                sym.set(start, sym.get(start) + 1); //increase by one
                token.push(start);
                tokenType.push(start);
                text = text.slice(1); //take out current index and move to next one
                break;
            //empty space
            case start === " ":
                text = text.slice(1);
                break;
            //new lines
            case start === "\n":
                text = text.slice(1);
                break;
            //tabs
            case start === "\t":
                text = text.slice(1);
                break;
            //comparison or equal
            case start === "<" || start === "=" || start ===">":
                if(text[0] + text[1] === "<=") {
                    //less than equal
                    token.push('<=');
                    tokenType.push('<=');
                    text = text.slice(2);
                    break;
                } else if(text[0] + text[1] === ">=") {
                    //more than equal
                    token.push('>=');
                    tokenType.push('>=');
                    text = text.slice(2);
                    break;
                } else if(text[0] + text[1] === "==") {
                    //equal equal
                    token.push('==');
                    tokenType.push('==');
                    text = text.slice(2);
                    break;
                } else if(text[0] === "=" && (text[1] === undefined || text[1] === " ")) {
                    //single equal
                    token.push('=');
                    tokenType.push('=');
                    text = text.slice(1);
                    break;
                } else if(text[0] === "<" && (text[1] === undefined || text[1] === " ")) {
                    //less than
                    token.push('<');
                    tokenType.push('<');
                    text = text.slice(1);
                    break;
                } else if(text[0] === ">" && (text[1] === undefined || text[1] === " ")) {
                    //more than
                    token.push('>');
                    tokenType.push('>');
                    text = text.slice(1);
                    break;
                }
            //numbers
            case /^[0-9]/.test(start):
                sym.set('int', sym.get('int') + 1) //increment number by 1
                let n = 0;
                //while its still number look for the rest of the number
                while (/^[0-9]/.test(text[n])) {
                    identifier += text[n]
                    n += 1;
                }
                text = text.slice(n)
                token.push(identifier);
                tokenType.push('number');
                break;
            //alphabet
            case /^[a-zA-z]/.test(start):
                //base case end of line
                // console.log('test');
                if (text[1] === undefined || text[1] === " ") {
                    //end of string
                    sym.set('variable', sym.get('variable') + 1); //increment number of variable
                    token.push(start);
                    tokenType.push('identifier');
                    text = text.slice(1);
                    break;
                }
                //check for special keywords, if not found, pass the variable into variable symbol(in default)
                switch (start) {
                    case ('c'):
                        //class keyword
                        if ((text[1] + text[2] + text[3] + text[4]) === "lass" && (text[5] === undefined || text[5]) === " ") {
                            sym.set('class', sym.get('class') + 1); //increment by one
                            text = text.slice(5);
                            token.push('class');
                            tokenType.push('class');
                            break;
                        }
                        continue;
                    case ('p'):
                        //public keyword
                        if ((text[1] + text[2] + text[3] + text[4] + text[5]) === "ublic" && text[6] === undefined || text[6] === " ") {
                            sym.set('public', sym.get('public') + 1);
                            text = text.slice(6);
                            token.push('public');
                            tokenType.push('public');
                            break;
                        }
                        continue;
                    case ('v'):
                        //void keyword
                        if ((text[1] + text[2] + text[3] === "oid") && (text[4] === undefined || text[4] === " ")) {
                            sym.set('void', sym.get('void') + 1);
                            text = text.slice(4);
                            token.push('void');
                            tokenType.push('void');
                            break;
                        }
                    case ('i'):
                        //if keyword
                        if (text[1] === "f" && (text[2] === undefined || text[2] === " " || text[2] === "(")) {
                            sym.set('if', sym.get('if') + 1);
                            text = text.slice(2);
                            token.push('if');
                            tokenType.push('if');
                            break;
                        } else if (text[1] + text[2] === "nt" && (text[3] === undefined || text[3] === " ")) {
                            //int keyword
                            token.push('int');
                            tokenType.push('int');
                            text = text.slice(3);
                            break;
                        }
                    case ('f'):
                        if (text[1] + text[2] + text[3] + text[4] === "inal" && (text[5] === undefined || text[5] === " ")) {
                            token.push('final');
                            tokenType.push('final');
                            text = text.slice(5);
                            break;
                        }
                    case ('r'):
                        if (text[1] + text[2] + text[3] + text[4] + text[5] === "eturn" && (text[6] === undefined || text[6] === " ")) {
                            token.push('return');
                            tokenType.push('return');
                            text = text.slice(6);
                            break;
                        }
                    case ('e'):
                        if (text[1] + text[2] + text[3] === "lse" && (text[4] === undefined || text[4] === " ")) {
                            token.push('else');
                            tokenType.push('else');
                            text = text.slice(4);
                            break;
                        }
                    default:
                        //identifiers
                        let n = 0;
                        while (/^[0-9a-zA-Z]/.test(text[n])) {
                            identifier += text[n]
                            n++;
                        }
                        text = text.slice(n);
                        token.push(identifier);
                        tokenType.push("identifier");
                        break;
                }
        }
    }
    return token, tokenType;
}

module.exports = scanner;
token, tokenType = scanner(text);
console.log(token, tokenType);



// class Scanner {
//     constructor(input, char, )
// }











// let text = ""
// let start = ""



// let next = () => {
//     return;
// }

// let error = () => {
//     console.error("Invalid First Character")
// }

// let first = (ch) => {
//     //check what kind of character is it
//     switch(c) {
//         case 'i':
//             break; //possibility of if
//         default:
//             error();
//     }
// }

// let scanner = (text) => {

// }
