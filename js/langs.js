let allLangs = {
    EN: {
        D: ["test", "House", "Window", "Sky", "Team", "start", "star"],
        R: {
            welcomeMsg: "Welcome!",
            defMessage: "Hello!"
        },
        F: {
            langCode: () => window.navigator.language,
            timeMessage: () => {
                let hour = new Date().getHours()
                if (hour >= 18) return "Good day!";
                if (hour >= 12 && hour < 18) return "Good afternoon!";
                if (hour < 12) return "Good night!";
            }
        }
    },
    PT: {
        D: ["teste", "Casa", "janela", "céu", "time", "iniciar", "estrela"],
        R: {
            welcomeMsg: "Seja bem vindo!",
            defMessage: "Olá!"
        },
        F: {
            langCode: () => window.navigator.language,
            timeMessage: () => {
                let hour = new Date().getHours()
                if (hour >= 18) return "Boa noite!";
                if (hour >= 12 && hour < 18) return "Boa tarde!";
                if (hour < 12) return "Bom dia!";
            }
        }
    },
    ES: {
        D: ["prueba", "casa", "ventana", "cielo", "equipo", "comienzo", "estrella"],
        R: {
            welcomeMsg: "Bienvenidos!",
            defMessage: "ola!"
        },
        F: {
            langCode: () => window.navigator.language,
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

let arrLangs = Object.keys(allLangs)
if (arrLangs.length > 1) {
    let stop = false
    for (let i = 1; i < arrLangs.length; i++) {
        for (const k of Object.keys(allLangs[arrLangs[0]])) {
            if (!Object.keys(allLangs[arrLangs[i]]).includes(k)) {
                console.log(`Lang ${arrLangs[i]} dont match the needed sections.`);
                stop = true
                break
            }
        }
        if (stop) break
        if (allLangs[arrLangs[i]].D.length !== allLangs[arrLangs[0]].D.length) {
            console.log(`Lang ${arrLangs[i]} dont match direct translations.`);
        }
        for (const k of Object.keys(allLangs[arrLangs[0]].R)) {
            if (!Object.keys(allLangs[arrLangs[i]].R).includes(k)) {
                console.log(`Lang ${arrLangs[i]} dont match relative translactions.`);
                break
            }
        }
        for (const k of Object.keys(allLangs[arrLangs[0]].F)) {
            if (!Object.keys(allLangs[arrLangs[i]].F).includes(k)) {
                console.log(`Lang ${arrLangs[i]} dont have the needed functions.`);
                break
            }
        }
    }
}

function prepLanguage(lang) {
    lang = lang.toUpperCase()
    if (!Object.keys(allLangs).includes(lang)) lang = "EN"
    let target = allLangs.EN.D.reduce((a, v, i) => { a[v.toLowerCase()] = allLangs[lang].D[i]; return a }, {})
    target = { ...target, ...allLangs[lang].R }
    target = { ...target, ...allLangs[lang].F }
    return target
}

$Lc = prepLanguage("pt")
console.log($Lc);


console.log("==========================================");


function matchCase(word1, word2) {
    return word1[0] === word1[0].toLowerCase() ? word2.toLowerCase() :
        word1[1] === word1[1].toLowerCase() ? word2[0].toUpperCase() + word2.slice(1).toLowerCase() :
            word2.toUpperCase();
}


