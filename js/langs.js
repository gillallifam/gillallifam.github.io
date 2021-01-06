

class TT {
    constructor() {
        this.index = 0
        this.targets = null
        this.Commoms = {
            AppName: () => "Tiny Translator"
        }
        this.allLangs = {
            EN: {
                D: ["Test", "House", "house", "Window", "Sky", "team", "start", "star", "fish", "Report","help",
                    "Good day!", "Good afternoon!", "Good night!"],
                R: {
                    $langName: "EN",
                    welcomeMsg: "Welcome!",
                    defMessage: "Hello!",
                    premiumMsg: "Dear premium user"
                },
                F: {
                    timeMessage: () => {
                        let hour = new Date().getHours()
                        if (hour >= 18) return this.cl.D[12];
                        if (hour >= 12 && hour < 18) return this.cl.D[11];
                        if (hour < 12) return this.cl.D[10];
                    }
                }
            },
            PT: {
                D: ["Teste", "Casa", "casa", "janela", "Céu", "time", "Iniciar", "estrela", "peixe", "Relatório","ajuda",
                    "Bom dia!", "Boa tarde!", "Boa noite!"],
                R: {
                    $langName: "PT",
                    welcomeMsg: "Seja bem vindo!",
                    defMessage: "Olá!",
                    premiumMsg: "Querido usuário premium"
                },
                F: {
                    timeMessage: () => {
                        let hour = new Date().getHours()
                        if (hour >= 18) return this.cl.D[12];
                        if (hour >= 12 && hour < 18) return this.cl.D[11];
                        if (hour < 12) return this.cl.D[10];
                    }
                }
            },
            ES: {
                D: ["Prueba", "Casa", "casa", "ventana", "cielo", "equipo", "comienzo", "estrella", "pez", "Reporte","ayuda",
                    "Buenos dias!", "Buenas tardes!", "Buenas noches!"],
                R: {
                    $langName: "ES",
                    welcomeMsg: "Bienvenidos!",
                    defMessage: "Ola!",
                    premiumMsg: "Estimado usuario premium"
                },
                F: {
                    timeMessage: () => {
                        let hour = new Date().getHours()
                        if (hour >= 18) return this.cl.D[12];
                        if (hour >= 12 && hour < 18) return this.cl.D[11];
                        if (hour < 12) return this.cl.D[10];
                    }
                }
            },
            IT: {
                D: ["Test", "Casa", "casa", "finestra", "cielo", "squadra", "inizio", "stella", "pesce", "Rapporto","aiuto",
                    "Buongiorno!", "Buon pomeriggio!", "Buona notte!"],
                R: {
                    $langName: "IT",
                    welcomeMsg: "Benvenuto!",
                    defMessage: "Ciao!",
                    premiumMsg: "Gentile utente premium"
                },
                F: {
                    timeMessage: () => {
                        let hour = new Date().getHours()
                        if (hour >= 18) return this.cl.D[12];
                        if (hour >= 12 && hour < 18) return this.cl.D[11];
                        if (hour < 12) return this.cl.D[10];
                    }
                }
            }
        }
        this.cl = this.allLangs.EN
    }
    listStrings() {
        console.log(this.cl.D.toString() + "#" + Object.values(this.cl.R).toString());
    }
    * genID() {
        while (true)
            yield "gnrtID" + ++this.index;
    }
    resetToDefaults() { for (const [id, txt] of Object.entries(this.targets)) document.getElementById(id).innerText = txt }
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
    buildLanguage(langName) {
        if (!Object.keys(this.allLangs).includes(langName)) langName = "EN"
        let lang = this.allLangs.EN.D.reduce((a, v, i) => { a[v] = this.allLangs[langName].D[i]; return a }, {})
        lang = { ...lang, ...this.allLangs[langName].R }
        lang = { ...lang, ...this.allLangs[langName].F }
        lang = { ...lang, ...this.Commoms }
        return lang
    }
    getTargets() {
        if (this.targets !== null) this.resetToDefaults()
        let targets = {}
        for (const e of document.body.querySelectorAll(".trans")) {
            let txt = e.innerText
            if (e.id) targets[e.id] = txt
            else { e.id = this.genID().next().value; targets[e.id] = txt }
        }
        if (this.targets === null) this.targets = targets
        return targets
    }
    translateTargets(lang) {
        this.cl = this.allLangs[lang.$langName]
        for (const [id, txt] of Object.entries(this.targets)) {
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
