

class TT {
    constructor() {
        this.index = 0
        this.originTargets = null
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
    * genID() {
        while (true)
            yield "gnrtID" + ++this.index;
    }
    resetToDefaults() { for (const [id, txt] of Object.entries(this.originTargets)) document.getElementById(id).innerText = txt }
    testLangs() {
        let arrLangs = Object.keys(this.allLangs)
        let pass = true
        if (arrLangs.length > 1) {
            let stop = false
            for (let i = 1; i < arrLangs.length; i++) {
                for (const k of Object.keys(this.allLangs[arrLangs[0]])) {
                    if (!Object.keys(this.allLangs[arrLangs[i]]).includes(k)) {
                        console.error(`Lang ${arrLangs[i]} dont match the needed translations types.`);
                        stop = true
                        pass = false
                        break
                    }
                }
                if (stop) break
                if (this.allLangs[arrLangs[i]].D.length !== this.allLangs[arrLangs[0]].D.length) {
                    pass = false
                    console.error(`Lang ${arrLangs[i]} dont match direct translations.`);
                }
                for (const k of Object.keys(this.allLangs[arrLangs[0]].R)) {
                    if (!Object.keys(this.allLangs[arrLangs[i]].R).includes(k)) {
                        pass = false
                        console.error(`Lang ${arrLangs[i]} dont match relative translactions.`);
                        break
                    }
                }
                for (const k of Object.keys(this.allLangs[arrLangs[0]].F)) {
                    if (!Object.keys(this.allLangs[arrLangs[i]].F).includes(k)) {
                        pass = false
                        console.error(`Lang ${arrLangs[i]} dont have the needed functions.`);
                        break
                    }
                }
            }
        }
        return pass
    }
    buildLanguage(lang) {
        if (!Object.keys(this.allLangs).includes(lang)) lang = "EN"
        let target = this.allLangs.EN.D.reduce((a, v, i) => { a[v] = this.allLangs[lang].D[i]; return a }, {})
        target = { ...target, ...this.allLangs[lang].R }
        target = { ...target, ...this.allLangs[lang].F }
        return target
    }
    getTargets() {
        if(this.originTargets!== null) this.resetToDefaults()
        let targets = {}
        for (const e of document.body.querySelectorAll(".trans")) {
            let txt = e.innerText
            if (e.id) targets[e.id] = txt
            else { e.id = this.genID().next().value; targets[e.id] = txt }
        }
        if (this.originTargets === null) this.originTargets = targets
        return targets
    }

    translateTargets(lang, targets) {
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
}

var tt = new TT();