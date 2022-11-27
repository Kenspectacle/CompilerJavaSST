/*
Symbol table for JavaSST
Here, symbols are defined and exported in a form of an Array
*/

let Symbols = [
    '(', 
    ')', 
    '+', 
    '*', 
    '{',
    '}', 
    '[', 
    ']',
    "<",
    ">",
    "<=",
    ">=",
    "=",
    "+",
    "-",
    "*",
    "/",
    ".",
    ";",
    ","
]; //basic symbols

//keywords
Symbol.push('if');
Symbol.push('else');
Symbol.push('class');
Symbol.push('final');
Symbol.push('void');
Symbol.push('int');
Symbol.push('while');
Symbol.push('public');
Symbol.push('return');
Symbol.push('IDENTIFIER')
Symbol.push('NUMBER')
Symbol.push('OTHER')

module.exports = Symbols;