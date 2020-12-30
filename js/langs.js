let $L = {}
$Ld = {
    test: "test",
    house: "house",
    window: "window",
    sky: "sky",
    team: "team",
    start: "start",
    Start: "Start",
    timeMsg: "Good day!",
    defMessage: "Hello!",
    funcMsg: () => "origin"
}

$L.BR = {
    test: "teste",
    house: "casa",
    window: "janela",
    sky: "céu",
    team: "time",
    start: "iniciar",
    Start: "Iniciar",
    timeMsg: "Bom dia!",
    defMessage: "Olá!",
    funcMsg: () => { return "translated" }
}
$Lc = {

}

function matchCase (word1, word2) {
    //   1) Words starting with two capital letters are assumed to be all caps.
    //   2) Words starting with two lower case letters are assumed to be all lower case.
    //   3) Words starting with an upper case followed by a lowercase letter are
    //      all lower case except the first letter.
  
     return word1[0] === word1[0].toLowerCase () ? word2.toLowerCase () :
            word1[1] === word1[1].toLowerCase () ? word2[0].toUpperCase () + word2.slice (1).toLowerCase () :
              word2.toUpperCase ();  
  }
  
 
