const fs = require('fs') //read file

const fileContents = fs.readFileSync('./input.txt').toString()

console.log(fileContents);

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





// sym.set('(', sym.get('(') + 1);
// console.log(sym.get('('));




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
