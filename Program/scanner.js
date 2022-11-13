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
sym.set('variable', 0);
sym.set('numbers', 0);

//single symbol list
let singleSymbols = ['(', ')', '+', '*', '{', '}', '[', ']']

//iterate through the text
while (text.length > 0) {
    //find starting symbol
    start = ""; //initialize start
    switch (true) {
        //basic cases, single symbols
        case singleSymbols.includes(text[0]):
            sym.set(text[0], sym.get(text[0]) + 1); //increase by one
            text = text.slice(1); //take out current index and move to next one
            break;
        //empty space
        case text[0] === " ":
            text = text.slice(1);
            break;
        //numbers
        case /^[0-9]/.test(text[0]):
            sym.set('numbers', sym.get('numbers') + 1) //increment number by 1
            let n = 0;
            //while its still number look for the rest of the number
            while(/^[0-9]/.test(text[n])) {
                n += 1;
                if(/^[0-9]/.test(text[n]) === false) {
                    text = text.slice(n)
                    break;
                } 
            }
        //alphabet
        case /^[a-zA-z]/.test(text[0]):
            //check for special keywords
            // console.log('test');
            if (text[1] !== undefined) {
                //end of string
                break;
            } else if (text[1] === " ") {
                //empty space
                sym.set('variable', sym.get('variable') + 1); //increment number of variable
                text = text.slice(1);
            } else if (text[1])
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
