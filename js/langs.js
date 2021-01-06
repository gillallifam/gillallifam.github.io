var JSONStr = (obj) => {
    return JSON.stringify(obj, function (key, val) {
        if (typeof val === 'function') {
            return val + '';
        }
        return val;
    });
}

var JSONPrs = (str) => {
    return JSON.parse(str, function (key, value) {//^\(.+\) =>
        if (typeof value === "string" && (value.startsWith("function") || (/^\((\w+), ?(\w+)\)/).test(value))) {
            return (0, eval)("(" + value + ")");
        }
        return value;
    });
}

function* idMaker() {
    let index = 0;
    while (true)
        yield "gnrtID" + ++index;
}
var genID = idMaker();

class TTranslator {
    constructor() {
        this.targets = []
        this.allLangs = {
            EN: {
                D: ["Test", "House", "house", "Window", "Sky", "team", "start", "star", "fish", "Report"],
                R: {
                    langName: "EN",
                    welcomeMsg: "Welcome!",
                    defMessage: "Hello!"
                },
                F: {
                    timeMessage: () => {
                        let hour = new Date().getHours()
                        if (hour >= 18) return "Good day!";
                        if (hour >= 12 && hour < 18) return "Good afternoon!";
                        if (hour < 12) return "Good night!";
                    }
                }
            },
            PT: {
                D: ["Teste", "Casa", "casa", "janela", "Céu", "time", "Iniciar", "estrela", "peixe", "Relatório"],
                R: {
                    langName: "PT",
                    welcomeMsg: "Seja bem vindo!",
                    defMessage: "Olá!"
                },
                F: {
                    timeMessage: () => {
                        let hour = new Date().getHours()
                        if (hour >= 18) return "Boa noite!";
                        if (hour >= 12 && hour < 18) return "Boa tarde!";
                        if (hour < 12) return "Bom dia!";
                    }
                }
            },
            ES: {
                D: ["Prueba", "Casa", "casa", "ventana", "cielo", "equipo", "comienzo", "estrella", "pez", "Reporte"],
                R: {
                    langName: "ES",
                    welcomeMsg: "Bienvenidos!",
                    defMessage: "ola!"
                },
                F: {
                    timeMessage: () => {
                        let hour = new Date().getHours()
                        if (hour >= 18) return "Buenas noches!";
                        if (hour >= 12 && hour < 18) return "Buenas tardes!";
                        if (hour < 12) return "Buenos dias!";
                    }
                }
            }
        }
    }
    resetToDefaults(targets) { for (const [id, txt] of Object.entries(originalTargets)) document.getElementById(id).innerText = txt }
}

console.log(new TTranslator());

function resetToDefaults(targets) { for (const [id, txt] of Object.entries(originalTargets)) document.getElementById(id).innerText = txt }

let allLangs = {
    EN: {
        D: ["Test", "House", "house", "Window", "Sky", "team", "start", "star", "fish", "Report"],
        R: {
            langName: "EN",
            welcomeMsg: "Welcome!",
            defMessage: "Hello!"
        },
        F: {
            timeMessage: () => {
                let hour = new Date().getHours()
                if (hour >= 18) return "Good day!";
                if (hour >= 12 && hour < 18) return "Good afternoon!";
                if (hour < 12) return "Good night!";
            }
        }
    },
    PT: {
        D: ["Teste", "Casa", "casa", "janela", "Céu", "time", "Iniciar", "estrela", "peixe", "Relatório"],
        R: {
            langName: "PT",
            welcomeMsg: "Seja bem vindo!",
            defMessage: "Olá!"
        },
        F: {
            timeMessage: () => {
                let hour = new Date().getHours()
                if (hour >= 18) return "Boa noite!";
                if (hour >= 12 && hour < 18) return "Boa tarde!";
                if (hour < 12) return "Bom dia!";
            }
        }
    },
    ES: {
        D: ["Prueba", "Casa", "casa", "ventana", "cielo", "equipo", "comienzo", "estrella", "pez", "Reporte"],
        R: {
            langName: "ES",
            welcomeMsg: "Bienvenidos!",
            defMessage: "ola!"
        },
        F: {
            timeMessage: () => {
                let hour = new Date().getHours()
                if (hour >= 18) return "Buenas noches!";
                if (hour >= 12 && hour < 18) return "Buenas tardes!";
                if (hour < 12) return "Buenos dias!";
            }
        }
    }
}
console.log(allLangs);
//let allStr = JSONStr(allLangs)
//console.log(allStr);
//console.log(JSONPrs(allStr));

function testLangs(allLangs) {
    let arrLangs = Object.keys(allLangs)
    let pass = true
    if (arrLangs.length > 1) {
        let stop = false
        for (let i = 1; i < arrLangs.length; i++) {
            for (const k of Object.keys(allLangs[arrLangs[0]])) {
                if (!Object.keys(allLangs[arrLangs[i]]).includes(k)) {
                    console.error(`Lang ${arrLangs[i]} dont match the needed translations types.`);
                    stop = true
                    pass = false
                    break
                }
            }
            if (stop) break
            if (allLangs[arrLangs[i]].D.length !== allLangs[arrLangs[0]].D.length) {
                pass = false
                console.error(`Lang ${arrLangs[i]} dont match direct translations.`);
            }
            for (const k of Object.keys(allLangs[arrLangs[0]].R)) {
                if (!Object.keys(allLangs[arrLangs[i]].R).includes(k)) {
                    pass = false
                    console.error(`Lang ${arrLangs[i]} dont match relative translactions.`);
                    break
                }
            }
            for (const k of Object.keys(allLangs[arrLangs[0]].F)) {
                if (!Object.keys(allLangs[arrLangs[i]].F).includes(k)) {
                    pass = false
                    console.error(`Lang ${arrLangs[i]} dont have the needed functions.`);
                    break
                }
            }
        }
    }
    return pass
}

testLangs(allLangs)

function buildLanguage(lang) {
    if (!Object.keys(allLangs).includes(lang)) lang = "EN"
    let target = allLangs.EN.D.reduce((a, v, i) => { a[v] = allLangs[lang].D[i]; return a }, {})
    target = { ...target, ...allLangs[lang].R }
    target = { ...target, ...allLangs[lang].F }
    return target
}

function getTargets() {
    let targets = {}
    for (const e of document.body.querySelectorAll(".trans")) {
        let txt = e.innerText
        if (e.id) targets[e.id] = txt
        else { e.id = genID.next().value; targets[e.id] = txt }
    }
    return targets
}

function translateTargets(lang, targets) {
    for (const [id, txt] of Object.entries(targets)) {
        let e = document.getElementById(id)
        if (lang[txt]) {
            if (typeof lang[txt] === "function") {
                e.innerText = lang[txt]()
            } else {
                e.innerText = lang[txt]
            }
        }
    }
}

console.log("==========================================");


function matchCase(word1, word2) {
    return word1[0] === word1[0].toLowerCase() ? word2.toLowerCase() :
        word1[1] === word1[1].toLowerCase() ? word2[0].toUpperCase() + word2.slice(1).toLowerCase() :
            word2.toUpperCase();
}






