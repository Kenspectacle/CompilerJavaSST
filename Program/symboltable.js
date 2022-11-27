/*
Symbol table for JavaSST
Here, symbols are defined and exported in a form of an Array
*/

let symbols = [
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
symbols.push('if');
symbols.push('else');
symbols.push('class');
symbols.push('final');
symbols.push('void');
symbols.push('int');
symbols.push('while');
symbols.push('public');
symbols.push('return');
symbols.push('IDENTIFIER')
symbols.push('NUMBER')
symbols.push('OTHER')

module.exports = symbols;