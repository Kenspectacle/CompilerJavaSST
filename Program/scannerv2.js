/*
Scanner implementation for JavaSST
Datastructure used: Array
Type of export: Scanner Function
*/

let scanner = (text) => {
    //initialize
    n = 0 //index search n
    str = "" //current string

    //keywords and identifiers within text
    let result = []; 

    //base cases, ignore whitespace and newline at the end
    text.trim();
    while(text.length > 0) {
        //base cases ignore whitespace and newline
        if(text[0] === " ") {
            text = text.slice(1);
            continue;
        }
        //look for newlines
        if(text[0] === "\n") {
            result.push("\n");
            text = text.slice(1);
            continue;
        } 
        n = 0
        str = ""
        //look for words
        while(text[n] !== " " && text[n] !== "\n" && text[n] !== undefined) {
            str += text[n]
            n++;
        }
        result.push(str);
        text = text.slice(n);
        //look for newlines
        if(text[0] === "\n") {
            result.push("\n");
            text = text.slice(1);
        }
    }
    return result
}

module.exports = scanner;
