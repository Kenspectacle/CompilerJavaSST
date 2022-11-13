const fs = require('fs') //read file

const fileContents = fs.readFileSync('./input.txt').toString()

console.log(fileContents);

//initialize variables
let start = "";
let identifier = "";//for each identifiers
let identifierGroup = []; //group up identifer later on
let sym = new Map(); //set symbol as hashmap





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
