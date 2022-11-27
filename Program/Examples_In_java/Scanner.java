import java.io.IOException;
import java.util.Hashtable;

public class Scanner implements ScannerSymbols {

    private Input in;

    private char ch;  //Aktuell gelesenes Zeichen
    public int sym;   // Gefundenes Symbol
    Integer keyword;  // Schluesselwort-Typen
	public String id; //Aktuell gelesener Identifier
	public String num; // Aktuell gelesene Number

    Hashtable<String, Integer> table = new Hashtable<String, Integer>();
	// Tabelle fuer Schluesselwoerter

    public Scanner(Input in){
        this.in = in;
        // Anlegen der Tabelle fuer Schluesselwoerter
        table.put("if",new Integer(ifsym));
        table.put("else",new Integer(elsesym));
        table.put("class",new Integer(classsym));
        table.put("final",new Integer(finalsym));
        table.put("void",new Integer(voidsym));
        table.put("int",new Integer(intsym));
        table.put("while",new Integer(whilesym));
	table.put("public", new Integer(publicsym));
	table.put("return", new Integer(returnsym));
    }

	void getSym(){
		while(ch <= ' ')
			ch=in.next();
	
	
		//Identifier
        if(ch >= 'a' && ch <= 'z' || ch >='A' && ch <= 'Z'){
            sym = ident;
            id = "";
            do{
                id = id + ch;
                ch = in.next();
            } while(ch>='a' && ch<='z' || ch >= 'A' && ch<='Z' || ch>= '0' && ch<='9');

            keyword=(Integer)table.get(id); // Ist id ein Schluesselwort ?
            if(keyword != null){
                sym = keyword.intValue();
                System.out.println("KeyWord: " + Symbols[sym]);
            }
            else{
                System.out.println("Identifier: " + id);
            }
        }
        //Number
        else if(ch>='0' && ch<='9'){
            sym = number;
            num ="";
            do{
                num += ch;
                ch = in.next();
            }while(ch >='0' && ch <='9');
            System.out.println("Number: " + num);
        }
        else {
            switch(ch){
                case '(': sym = lparent; ch = in.next(); break;
                case ')': sym = rparent; ch = in.next(); break;
                case '{': sym = lbracket; ch = in.next(); break;
                case '}': sym = rbracket; ch = in.next(); break;
                case '+': sym = plus; ch = in.next(); break;
                case '-': sym = minus; ch = in.next(); break;
                case '*': sym = times; ch = in.next(); break;
                case '/': sym = div; ch = in.next(); 
		    //Kommentar = "/" "*" {Char\{"*"}|"*" {"*"}Char\{"/","*"}}"*""/"
		    if(ch == '*')  // Kommentar beginnt
			ch = in.next(); 
            	    else // Kein Kommentar
			break;
		    while(ch != EOF) { 
			if(ch != '*') 
			    ch =in.next();
			if(ch == '*'){ 
			    ch =in.next();
			    while(ch =='*') 
				ch= in.next();
			    if(ch=='/') {
				ch = in.next(); 
				getSym();
				break;
			    }else
				ch = in.next(); 		
			} 
		    }
		    // Kommentar zu Ende
		    if(ch == EOF) {             		
			System.out.println("Fehler im Kommentar: endet nicht ");		
			sym = eof;
		    }
		    break;
                case '=': sym = assign; ch = in.next();
                    if(ch == '='){ sym = equal; ch = in.next();}
                    break;
                case '<': sym = less; ch = in.next();
                    if(ch =='='){sym=lessequal; ch=in.next();}
                    break;
                 case '>': sym = greater; ch = in.next();
                    if(ch =='='){ sym=greaterequal; ch=in.next();}
                    break;
                case ';':sym = semicolon; ch = in.next(); break;
                case ',':sym = comma; ch = in.next(); break;
                case EOF: sym = eof;break;
                default: sym = other;  ch=in.next();break;

            }
            System.out.println("Symbol: " + Symbols[sym]);
        }
     }

    // Nur zum Testen des Scanners
    public static void main(String[] args) {
        Scanner scanner = new Scanner(new Input(args[0]));
        while(true){
            try{
                if(scanner.sym == eof)
                    break;
             scanner.getSym();
            }catch(Exception e){break;}
        }

    }
}




