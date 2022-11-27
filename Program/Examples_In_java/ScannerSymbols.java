 public interface ScannerSymbols{

     final static char EOF = (char)-1;

     public int

		lparent = 0,
		rparent = 1,
		lbracket = 2,
		rbracket = 3,

		equal = 4,
		less = 5,
		greater = 6,
		lessequal = 7,
		greaterequal = 8,
		assign = 9,

		plus = 10,
		minus = 11,
		times = 12,
		div = 13,

		dot = 14,
		semicolon = 15,
		comma = 16,

        ifsym = 17,
        elsesym = 18,
        classsym = 19,
        finalsym = 20,
        voidsym = 21,
        intsym = 22,
        whilesym = 23,
        publicsym = 24,
        returnsym = 25,
        ident = 26 ,
        number = 27,
        other = 28,
        eof = 29;


    String [] Symbols = {"(",")","{","}","==","<",">","<=",">=","=","+","-","*","/",
      ".",";",",","if","else","class","final","void","int","while","public", "return","IDENTIFIER",
    "NUMBER", "OTHER", "EOF"};

}

