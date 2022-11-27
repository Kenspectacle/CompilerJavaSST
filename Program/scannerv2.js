/*
Scanner implementation for JavaSST
Datastructure used: Array
Type of export: Scanner Function
*/

let Scanner = (text) => {
    //initialize
    n = 0 //index search n
    str = "" //current string

    //keywords and identifiers within text
    let result = []; 

    //base cases, ignore whitespace and newline at the end
    text.trim();
    console.log('testsss')
    console.log(text);
    while(text.length > 0) {
        //base cases ignore whitespace and newline
        if(text[0] === " " || text[0] === "\n") {
            text = text.slice(1);
        }
        n = 0
        str = ""
        console.log('qwewqeqe')
        //look for words
        while(text[n] !== " " && text[n] !== "\n" && text[n] !== undefined) {
            str += text[n]
            n++;
        }
        result.push(str);
        text = text.slice(n);
    }
    return result
}

module.exports.Scanner;
