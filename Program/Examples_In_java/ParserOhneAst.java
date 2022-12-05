class Parser{
	Scanner s;

	public Parser(Scanner s){
		this.s = s;
		s.getSym();
	}
	static void error(String message){	
		System.out.println(message);
	}
	
	void klass(){
	      	if(s.sym == s.classsym)
			s.getSym();
		else
		   error(" No keyword class");
		if(s.sym == s.ident)
		   s.getSym();
		
		else
		   error(" No name for class");
		klassbody();
	}

	void klassbody(){
		if(s.sym == s.lbracket)
			s.getSym();
		else
		   error("Missing left bracket");	

		declarations();
		
		if(s.sym == s.rbracket)
			s.getSym();
		else
		   error("Missing right bracket");
		
	}

	void declarations(){
		while(s.sym == s.finalsym){
			s.getSym();
			if(s.sym == s.intsym)
				s.getSym();
			else
			        error("Missing type name");
			if(s.sym == s.ident)
				s.getSym();
			else
			        error("Missing name of constant");
			if(s.sym == s.assign)
				s.getSym();
			else
			        error("Missing assignment for constant definition");	
			expression();
			if(s.sym == s.semicolon)
				s.getSym();
			else
			        error("Missing end of constant definition");	

		}
		while(s.sym == s.intsym){
			s.getSym();
			if(s.sym == s.ident)
			   s.getSym();
			else
			        error("Missing name of identifier");			
			if(s.sym == s.semicolon)
				s.getSym();
			else
			        error("Missing end of identifier definition");
		}
		while(s.sym == s.publicsym){	
			s.getSym();
			method_declaration();
		}
		
	}

	void method_declaration(){
		method_head();	
		method_body();
	}
	
	void method_head(){
	    if(s.sym == s.voidsym || s.sym == s.intsym)
		s.getSym();
	    else
		error("return type is wrong");

	    if(s.sym == s.ident)
		s.getSym();
	    else
		error("Missing name of method definition");
	    formal_parameters();
	}

	void formal_parameters(){
		if(s.sym == s.lparent)
			s.getSym();
		else
			error("Missing left paranthese in method definition");
		if(s.sym ==  s.intsym){
			s.getSym();
			if(s.sym == s.ident)
			    s.getSym();
			else
			    error("Missing name for formal parameter definition");
			while(s.sym == s.comma){
				s.getSym();
				if(s.sym == s.intsym)
					s.getSym();
				else
				   	error("Missing type for formal parameter definition");
				if(s.sym == s.ident)	
				    s.getSym();
				else
				    error("Missing name for formal parameter definition");
			}

		}
		if(s.sym == s.rparent)
		    s.getSym();
		else
		    error("Missing right paranthese in method definition");
		
	}

	void method_body(){
	        if(s.sym == s.lbracket)
			s.getSym();
		else
		   error("Missing left bracket");	

		while(s.sym ==  s.intsym){
			s.getSym();
			if(s.sym == s.ident)
			    s.getSym();
			else
			    error("Missing name of local variable definition");
			if(s.sym == s.semicolon)
			    s.getSym();
			else
			    error("Missing end of local variable definition");

		}
		statement_sequence();		
		if(s.sym == s.rbracket)
		    s.getSym();
		else
		    error("Missing right bracket");
	}	

	void statement_sequence(){
		statement();
		while(s.sym == s.ident || s.sym == s.whilesym || s.sym == s.ifsym || s.sym == s.returnsym)
		    statement();		     	       
	}

	void statement(){
		switch (s.sym){
		        case ScannerSymbols.ident:	
			    s.getSym();    
		    	    	if(s.sym == s.lparent){
					actual_parameters();
					if(s.sym == s.semicolon)
					    s.getSym();
					else
					    error("Missing end of method call");
				}
				else if(s.sym == s.assign)
				  	assignment();   
				else
				  	error(" No assigment or method call");
				break;
			case ScannerSymbols.ifsym:
				if_statement();
				break;
			case ScannerSymbols.whilesym:
				while_statement();
				break;
			case ScannerSymbols.returnsym:
				return_statement();
				break;
			default: 
				error("No Statement");

		} 
		
	}

	void actual_parameters(){
		s.getSym();
		if(s.sym == s.ident || s.sym == s.number || s.sym == s.lparent){
			expression();
			while(s.sym == s.comma){
				s.getSym();
				expression();
			}
		}
		if(s.sym == s.rparent)
			s.getSym();
		else
			error("Missing right parenthese in method call");
	}
	void assignment(){
		s.getSym();
		expression();
		if(s.sym == s.semicolon)
			s.getSym();
		else
			error("Missing end of assignment");

	}

	void if_statement(){
		s.getSym();
		if(s.sym == s.lparent)
			s.getSym();
		else
			error("Missing left parenthese in if statement");
		expression();
		if(s.sym == s.rparent)
			s.getSym();
		else
			error("Missing right parenthese in if statement");
		if(s.sym == s.lbracket)
			s.getSym();
		else
			error("Missing left bracket in if statement");
		statement_sequence();
		if(s.sym == s.rbracket)
			s.getSym();
		else
			error("Missing right bracket in if statement");

		if(s.sym == s.elsesym)
			s.getSym();
		else
			error("Missing else in if statement");
		if(s.sym == s.lbracket)
			s.getSym();
		else
			error("Missing left bracket in if statement");
		statement_sequence();
		if(s.sym == s.rbracket)
			s.getSym();
		else
			error("Missing right bracket in if statement");

	}

	void while_statement(){
		s.getSym();
		if(s.sym == s.lparent)
			s.getSym();
		else
			error("Missing left parenthese in while statement");

		expression();
		if(s.sym == s.rparent)
			s.getSym();
		else
			error("Missing right parenthese in while statement");
		if(s.sym == s.lbracket)
			s.getSym();
		else
			error("Missing left bracket in while statement");
	        statement_sequence();
		if(s.sym == s.rbracket)
			s.getSym();
		else
			error("Missing right bracket in while statement");

	}

        void return_statement(){
	        s.getSym();
		if(s.sym == s.returnsym){
		    s.getSym();
		    if(s.sym == s.ident || s.sym == s.number || s.sym == s.lparent)
			simple_expression();

		    if(s.sym == s.semicolon)
			s.getSym();
		    else
			error("Missing end of assignment");
		    
		} else
		    error("Missing return statement");

        }

	void expression(){
		simple_expression();
		if(s.sym == s.equal || s.sym == s.lessequal || s.sym == s.greaterequal || 
		   s.sym == s.less || s.sym == s.greater){
			s.getSym();	
			simple_expression();
		}
	}

	void simple_expression(){
		term();
		while(s.sym == s.plus || s.sym == s.minus ){
			s.getSym();	
			term();	
		}
	}

	void term(){
	        factor();
		while(s.sym == s.times || s.sym == s.div ){
			s.getSym();	
			factor();	
		}
	}

	void factor(){
		if(s.sym == s.ident){
			s.getSym();
			if(s.sym == s.lparent){
				actual_parameters();
			   
			}
		}
		else if (s.sym == s.number)
			s.getSym();
		else if (s.sym == s.lparent){
			s.getSym();
		        expression();
			if (s.sym == s.rparent)
				s.getSym();
			else
			     error("Missing right parenthese");	
		} else
		     error("Missing factor");
	}

	public static void main(String args[]){
		Parser p = new Parser(new Scanner(new Input(args[0])));
		p.klass();
		if(!(p.s.sym == p.s.eof))
			error("Not End of File");
	}
}
