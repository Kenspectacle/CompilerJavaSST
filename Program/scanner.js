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
    start = text[0]; //initialize start
    // console.log(sym);
    switch (true) {
        //basic cases, single symbols
        case singleSymbols.includes(start):
            sym.set(start, sym.get(start) + 1); //increase by one
            text = text.slice(1); //take out current index and move to next one
            break;
        //empty space
        case start === " ":
            text = text.slice(1);
            break;
        //numbers
        case /^[0-9]/.test(start):
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
        case /^[a-zA-z]/.test(start):

            //base case end of line
            // console.log('test');
            if (text[1] === undefined) {
                //end of string
                sym.set('variable', sym.get('variable') + 1); //increment number of variable
                text = text.slice(1);
                break;
            } else if (text[1] === " ") {
                //base case 1 character word
                sym.set('variable', sym.get('variable') + 1); //increment number of variable
                text = text.slice(1);
                break;
            }
            //check for special keywords, if not found, pass the variable into variable symbol(in default)
            switch(start) {
                case('c'):
                    if((text[1] + text[2] + text[3] + text[4]) === "lass" && text[5] === undefined || text[5] === " ") {
                        //class keyword
                        sym.set('class', sym.get('class') + 1); //increment by one
                        text = text.slice(5);
                        break;
                    }
                    continue;
                case('p'):
                    if((text[1] + text[2] + text[3] + text[4] + text[5]) === "ublic"  && text[6] === undefined || text[6] === " " ) {
                        sym.set('public', sym.get('public') + 1);
                        text = text.slice(6);
                    }
                continue;
                case('v'):
                continue;
                case('n'):
                continue;
                case('i'):
                    if(text[1] === "f" && text[2] === undefined || text[2] === " " || text[2] === "(") {
                        sym.set('if', sym.get('if') + 1);
                        text = text.slice(2);
                        break;
                    }
                default:
                    break;
            }
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
