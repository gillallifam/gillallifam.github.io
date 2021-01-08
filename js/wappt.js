class WappT {
    constructor() {
        this.defLang = "EN"
        this.tst = "rootTst"
        this.info = "About info"
        this.index = 0
        this.targets = null
        this.Commoms = {
            AppName: () => "wapp translator",
            ["${a} x ${b}"]: (str) => { return genTemplate(str)({ a: "aaa", b: "bbb" }); }
        }
        this.buildedLangs = {}
        this.allLangs = {
            EN: {
                D: ["Test", "House", "house", "Window", "Sky", "team", "start", "star", "fish", "Report", "help",
                    "Good day!", "Good afternoon!", "Good night!", "${tst} ${data}"],
                R: {
                    $langName: "EN",
                    welcomeMsg: "Welcome!",
                    defMessage: "Hello!",
                    premiumMsg: "Dear premium user"
                },
                F: {
                    timeMessage: () => {
                        let t = this.buildedLangs[this.ln], hour = new Date().getHours()
                        if (hour >= 18) return t["Good night!"];
                        if (hour >= 12 && hour < 18) return t["Good afternoon!"];
                        if (hour < 12) return t["Good day!"];
                    },
                    relativeMsg: () => {
                        return this.buildedLangs[this.ln].premiumMsg
                    },
                    ["${tst} ${data}"]: (str) => { return genTemplate(str)({ tst: this.tst, data: this.info }); },
                    title: () => {
                        let gender = "F"
                        switch (gender) {
                            case "F": return "Lady"
                            case "O": return "Lard"
                            default: return "Lord"
                        }
                    }
                }
            },
            PT: {
                D: ["Teste", "Casa", "casa", "janela", "Céu", "time", "Iniciar", "estrela", "peixe", "Relatório", "ajuda",
                    "Bom dia!", "Boa tarde!", "Boa noite!", "${tst} ${data}"],
                R: {
                    $langName: "PT",
                    welcomeMsg: "Seja bem vindo!",
                    defMessage: "Olá!",
                    premiumMsg: "Querido usuário premium",
                },
                F: {
                    timeMessage: () => {
                        let t = this.buildedLangs[this.ln], hour = new Date().getHours()
                        if (hour >= 18) return t["Good night!"];
                        if (hour >= 12 && hour < 18) return t["Good afternoon!"];
                        if (hour < 12) return t["Good day!"];
                    },
                    relativeMsg: () => {
                        return this.buildedLangs[this.ln].premiumMsg
                    },
                    ["${tst} ${data}"]: (str) => { return genTemplate(str)({ tst: "tst2", data: "PTData" }); },
                    title: () => {
                        let gender = "F"
                        switch (gender) {
                            case "F": return "Lady"
                            case "O": return "Lard"
                            default: return "Lord"
                        }
                    }
                }
            },
            ES: {
                D: ["Prueba", "Casa", "casa", "ventana", "cielo", "equipo", "comienzo", "estrella", "pez", "Reporte", "ayuda",
                    "Buenos dias!", "Buenas tardes!", "Buenas noches!", "${tst} ${data}"],
                R: {
                    $langName: "ES",
                    welcomeMsg: "Bienvenidos!",
                    defMessage: "Ola!",
                    premiumMsg: "Estimado usuário premium"
                },
                F: {
                    timeMessage: () => {
                        let t = this.buildedLangs[this.ln], hour = new Date().getHours()
                        if (hour >= 18) return t["Good night!"];
                        if (hour >= 12 && hour < 18) return t["Good afternoon!"];
                        if (hour < 12) return t["Good day!"];
                    }
                    ,
                    relativeMsg: () => {
                        return this.buildedLangs[this.ln].premiumMsg
                    },
                    ["${tst} ${data}"]: (str) => { return genTemplate(str)({ tst: "tst3", data: "ESData" }); },
                    title: () => {
                        let gender = "F"
                        switch (gender) {
                            case "F": return "Lady"
                            case "O": return "Lard"
                            default: return "Lord"
                        }
                    }
                }
            },
            IT: {
                D: ["Test", "Casa", "casa", "finestra", "cielo", "squadra", "inizio", "stella", "pesce", "Rapporto", "aiuto",
                    "Buongiorno!", "Buon pomeriggio!", "Buona notte!", "${tst} ${data}"],
                R: {
                    $langName: "IT",
                    welcomeMsg: "Benvenuto!",
                    defMessage: "Ciao!",
                    premiumMsg: "Gentile utente premium"
                },
                F: {
                    timeMessage: () => {
                        let t = this.buildedLangs[this.ln], hour = new Date().getHours()
                        if (hour >= 18) return t["Good night!"];
                        if (hour >= 12 && hour < 18) return t["Good afternoon!"];
                        if (hour < 12) return t["Good day!"];
                    },
                    relativeMsg: () => {
                        return this.buildedLangs[this.ln].premiumMsg
                    },
                    ["${tst} ${data}"]: (str) => { return genTemplate(str)({ tst: "tst4", data: "ITData" }); },
                    title: () => {
                        let gender = "F"
                        switch (gender) {
                            case "F": return "Lady"
                            case "O": return "Lard"
                            default: return "Lord"
                        }
                    }
                }
            }
        }
        this.cl = this.allLangs.EN
        this.ln = this.cl.R.$langName
    }
    qAll(s) { return document.body.querySelectorAll(s) }
    entries(obj) { return Object.entries(obj) }
    keys(obj) { return Object.keys(obj) }
    gid(id) { return document.getElementById(id) }
    listStrings() { console.log(this.cl.D.toString() + "#" + Object.values(this.cl.R).toString()); }
    * genID() { while (true) yield "gnrtID" + ++this.index; }
    resetToDefaults() { for (const [id, txt] of this.entries(this.targets)) this.gid(id).innerText = txt }
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
        if (this.buildedLangs[langName]) return this.buildedLangs[langName]
        if (!this.keys(this.allLangs).includes(langName)) langName = this.defLang
        let lang = this.allLangs[this.defLang].D.reduce((a, v, i) => { a[v] = this.allLangs[langName].D[i]; return a }, {})
        lang = { ...lang, ...this.allLangs[langName].R }
        lang = { ...lang, ...this.allLangs[langName].F }
        lang = { ...lang, ...this.Commoms }
        this.buildedLangs[langName] = lang
        //console.log(this.buildedLangs);
        return lang
    }
    getTargets() {
        if (this.targets !== null) this.resetToDefaults();
        let targets = {}, txt
        for (const e of this.qAll(".trans")) {
            txt = e.innerText
            if (e.id) targets[e.id] = txt
            else { e.id = this.genID().next().value; targets[e.id] = txt }
        }
        if (this.targets === null) this.targets = targets
        return targets
    }
    translateTargets(lang) {
        if(lang.$langName === this.ln) return
        this.cl = this.allLangs[lang.$langName], this.ln = lang.$langName
        for (const [id, txt] of Object.entries(this.targets)) {
            let e = this.gid(id)
            if (e && lang[txt]) {
                if (typeof lang[txt] === "function") {
                    e.innerText = lang[txt](txt)
                } else {
                    e.innerText = lang[txt]
                }
            }
        }
    }
}

var wappt = new WappT();
