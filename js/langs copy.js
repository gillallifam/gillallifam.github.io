let objDirects = {
    EN: ["test", "house", "window", "sky", "team", "start"],
    PT: ["teste", "casa", "janela", "céu", "time", "iniciar"],
    ES: ["prueba", "casa", "ventana", "cielo", "equipo", "comienzo"]
}

let choosedLang = "es"
choosedLang = choosedLang.toUpperCase()
let browserLang = choosedLang || window.navigator.language.split("-")[0].toUpperCase()
let target = objDirects.EN.reduce((a, v, i) => { a[v] = objDirects[browserLang][i]; return a }, {})


let objRelatives = {
    EN: {
        timeMsg: "Good day!",
        defMessage: "Hello!"
    },
    PT: {
        timeMsg: "Bom dia!",
        defMessage: "Olá!"
    },
    ES: {
        timeMsg: "Buenos dias!",
        defMessage: "ola!"
    }
}

let objFuncs = {
    EN: {
        langName: () => "English",
        funcMsg2: () => { return "dsddsd" }
    },
    PT: {
        langName: () => "Português",
        funcMsg2: () => { return "dsddsd" }
    },
    ES: {
        langName: () => "Español",
        funcMsg2: () => { return "dsddsd" }
    }
}

//console.log(objRelatives[choosedLang]);

target = { ...target, ...objRelatives[choosedLang] }
target = { ...target, ...objFuncs[choosedLang] }
console.log("result", target);

let langBank = {

}

for (const lang of Object.keys(objDirects)) {
    langBank[lang] = objDirects.EN.reduce((a, v, i) => { a[v] = objDirects[lang][i]; return a }, {})
    langBank[lang] = { ...langBank[lang], ...objRelatives[lang] }
    langBank[lang] = { ...langBank[lang], ...objFuncs[lang] }
}

console.log(langBank);
$Ld = langBank["EN"]

/* let $L = {}


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

} */

function matchCase(word1, word2) {
    //   1) Words starting with two capital letters are assumed to be all caps.
    //   2) Words starting with two lower case letters are assumed to be all lower case.
    //   3) Words starting with an upper case followed by a lowercase letter are
    //      all lower case except the first letter.

    return word1[0] === word1[0].toLowerCase() ? word2.toLowerCase() :
        word1[1] === word1[1].toLowerCase() ? word2[0].toUpperCase() + word2.slice(1).toLowerCase() :
            word2.toUpperCase();
}


