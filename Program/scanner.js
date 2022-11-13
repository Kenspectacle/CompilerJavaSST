const fs = require('fs') //read file

let text = fs.readFileSync('./input.txt').toString()

console.log(text);

//initialize variables
let start = "";
let identifier = "";//for each identifiers
let identifierGroup = []; //group up identifer later on
let sym = new Map(); //set symbol as hashmap

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

//single symbol list
let singleSymbols = ['(', ')', '+', '*', '{', '}', '[', ']']

//iterate through the text
while (text.length > 0) {
    //find starting symbol
    start = ""; //initialize start
    switch(true) {
        //basic cases, parentheses
        case singleSymbols.includes(text[0]):
            sym.set(text[0], sym.get(text[0]) + 1); //increase by one
            text = text.slice(1); //take out current index and move to next one
            break;
        case '=':
            break;
    }
}

console.log(sym);




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
