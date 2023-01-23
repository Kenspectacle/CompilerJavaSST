/*
JavaSST Scanner
Checks the content by scanning the characters one by one
outputs an array

List of keywords in JavaSST:
class, public, void, if, int, final, return, else

To Do List
-Refactor the code -> done
-Implement ignore feature for comments
-Add keywords entry for the special keyword
-Fix column location to give it proper feedback
*/


const fs = require('fs') //read file

const path = require('path');
let text = fs.readFileSync(path.resolve(__dirname, "./input.txt")).toString();

console.log(text);



//single symbol list
let singleSymbols = ['(', ')', '+', '*', '{', '}', '[', ']', ';', '-', ',', '/'];

//iterate through the text
let scanner = (text) => {
    //initialize variables
    let start = "";
    let identifier = "";//for each identifiers
    let identifierGroup = []; //group up identifer later on
    let content = []; //make a list of contents
    let contentType = []; //this describes, what kind of content it is
    let tokens = [];
    let locColumn = 0;
    let locLine = 0;
    while (text.length > 0) {
        identifier = ""; //reinitialize the identifier
        //find starting symbol
        start = text[0]; //initialize start
        // console.log(sym);
        switch (true) {
            //basic cases, single symbols
            case singleSymbols.includes(start):
                locColumn++;
                tokens.push(new Object({ content: start, contentType: start, locColumn: locColumn, locLine: locLine }));
                text = text.slice(1); //take out current index and move to next one
                break;
            //empty space
            case start === " ":
                text = text.slice(1);
                locColumn++;
                break;
            //new lines
            case start === "\n":
                text = text.slice(1);
                locLine++;
                locColumn = 0;
                break;
            //tabs
            case start === "\t":
                text = text.slice(1);
                locColumn += 4; //assumption, 1 tab = 4 columns
                break;
            //comparison or equal
            case start === "<" || start === "=" || start === ">":
                if (text[0] + text[1] === "<=") {
                    //less than equal
                    locColumn += 2;
                    tokens.push({ content: '<=', contentType: '<=', locColumn: locColumn, locLine: locLine });
                    text = text.slice(2);
                    break;
                } else if (text[0] + text[1] === ">=") {
                    //more than equal
                    locColumn += 2;
                    tokens.push({ content: '<=', contentType: '<=', locColumn: locColumn, locLine: locLine });
                    text = text.slice(2);
                    break;
                } else if (text[0] + text[1] === "==") {
                    //equal equal
                    locColumn += 2;
                    tokens.push({ content: '==', contentType: '==', locColumn: locColumn, locLine: locLine });
                    text = text.slice(2);
                    break;
                } else if (text[0] === "=" && (text[1] === undefined || text[1] === " ")) {
                    //single equal
                    locColumn++;
                    tokens.push({ content: '=', contentType: '=', locColumn: locColumn, locLine: locLine });
                    text = text.slice(1);
                    break;
                } else if (text[0] === "<" && (text[1] === undefined || text[1] === " ")) {
                    //less than
                    locColumn++;
                    tokens.push({ content: '<', contentType: '<', locColumn: locColumn, locLine: locLine });
                    text = text.slice(1);
                    break;
                } else if (text[0] === ">" && (text[1] === undefined || text[1] === " ")) {
                    //more than
                    locColumn++;
                    tokens.push({ content: '>', contentType: '>', locColumn: locColumn, locLine: locLine });
                    text = text.slice(1);
                    break;
                }
            //numbers
            case /^[0-9]/.test(start):
                let n = 0;
                //while its still number look for the rest of the number
                while (/^[0-9]/.test(text[n])) {
                    identifier += text[n]
                    n += 1;
                }
                locColumn += n;
                text = text.slice(n)
                tokens.push({ content: identifier, contentType: 'number', locColumn: locColumn, locLine: locLine });
                break;
            //alphabet
            case /^[a-zA-z]/.test(start):
                //base case end of line
                // console.log('test');
                if (text[1] === undefined || text[1] === " ") {
                    //end of string
                    locColumn++;
                    tokens.push({ content: start, contentType: 'identifier', locColumn: locColumn, locLine: locLine });
                    text = text.slice(1);
                    break;
                }
                //check for special keywords, if not found, pass the variable into variable symbol(in default)
                switch (start) {
                    case ('c'):
                        //class keyword
                        if ((text[1] + text[2] + text[3] + text[4]) === "lass" && (text[5] === undefined || text[5]) === " ") {
                            locColumn += 5;
                            tokens.push({ content: 'class', contentType: 'class', locColumn: locColumn, locLine: locLine });
                            text = text.slice(5);
                            break;
                        }
                        continue;
                    case ('p'):
                        //public keyword
                        if ((text[1] + text[2] + text[3] + text[4] + text[5]) === "ublic" && text[6] === undefined || text[6] === " ") {
                            locColumn += 6;
                            text = text.slice(6);
                            tokens.push({ content: 'public', contentType: 'public', locColumn: locColumn, locLine: locLine });
                            break;
                        }
                        continue;
                    case ('v'):
                        //void keyword
                        if ((text[1] + text[2] + text[3] === "oid") && (text[4] === undefined || text[4] === " ")) {
                            text = text.slice(4);
                            locColumn += 4;
                            tokens.push({ content: 'void', contentType: 'void', locColumn: locColumn, locLine: locLine });
                            content.push('void');
                            contentType.push('void');
                            break;
                        }
                    case ('i'):
                        //if keyword
                        if (text[1] === "f" && (text[2] === undefined || text[2] === " " || text[2] === "(")) {
                            locColumn += 2;
                            text = text.slice(2);
                            tokens.push({ content: 'if', contentType: 'if', locColumn: locColumn, locLine: locLine });
                            break;
                        } else if (text[1] + text[2] === "nt" && (text[3] === undefined || text[3] === " ")) {
                            //int keyword
                            locColumn += 3;
                            tokens.push({ content: 'int', contentType: 'int', locColumn: locColumn, locLine: locLine });
                            text = text.slice(3);
                            break;
                        }
                    case ('f'):
                        //final keyword
                        if (text[1] + text[2] + text[3] + text[4] === "inal" && (text[5] === undefined || text[5] === " ")) {
                            locColumn += 5;
                            tokens.push({ content: 'final', contentType: 'final', locColumn: locColumn, locLine: locLine });
                            text = text.slice(5);
                            break;
                        }
                    case ('r'):
                        if (text[1] + text[2] + text[3] + text[4] + text[5] === "eturn" && (text[6] === undefined || text[6] === " " || text[6] === ";")) {
                            locColumn += 6;
                            tokens.push({ content: 'return', contentType: 'return', locColumn: locColumn, locLine: locLine });
                            text = text.slice(6);
                            break;
                        }
                    case ('e'):
                        //else keyword
                        if (text[1] + text[2] + text[3] === "lse" && (text[4] === undefined || text[4] === " ")) {
                            locColumn += 4;
                            tokens.push({ content: 'else', contentType: 'else', locColumn: locColumn, locLine: locLine });
                            text = text.slice(4);
                            break;
                        }
                    case ('w'):
                        //while keyword
                        if (text[1] + text[2] + text[3] + text[4] === "hile" && (text[5] === undefined || text[5] === " " || text[5]) === "(") {
                            locColumn += 5;
                            tokens.push({ content: 'while', contentType: 'while', locColumn: locColumn, locLine: locLine });
                            text = text.slice(5);
                            break;
                        }
                    default:
                        //identifiers
                        let n = 0;
                        while (/^[0-9a-zA-Z]/.test(text[n])) {
                            identifier += text[n]
                            n++;
                        }
                        locColumn += n;
                        text = text.slice(n);
                        tokens.push({ content: identifier, contentType: 'identifier', locColumn: locColumn, locLine: locLine });
                        break;
                }
        }
    }
    return tokens;
}

tokens = scanner(text);
console.dir(tokens, { 'maxArrayLength': null });
module.exports = { tokens };
