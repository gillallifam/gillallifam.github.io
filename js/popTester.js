//seekbug
class PopTester {
    constructor(root) {
        this.root = root
        this.styles = document.createElement("style")
        this.styles.id = "popTstStyles"
        this.styles.textContent = `.popTstpass{color:#006400}.popTstnotpass{color:#cd5c5c}#popTstBlockLayer{backdrop-filter:blur(3px);user-select:none;visibility:hidden;position:absolute;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0)}#popTstResults{position:absolute;left:50%;top:20%;padding:10px;background-color:ivory;border-radius:3%;width:50%;transform:translateX(-50%);box-shadow:-1px 0 25px 0 rgba(0,0,0,.68)}.popTstToRight{float:right}#popTstClosePopup{border-radius:25%;float:right}.popTstRepLine{width:100%;background-color:#dcdcdc}`
        document.head.appendChild(this.styles)
    }
    comparator(name, spec, comparator, result) {
        let s = "f", msg = { name, type: "comparator", spec, comparator, result, status: "f" }
        switch (comparator) {
            case "==": if (spec == result) s = "s"; break;
            case "===": if (spec === result) s = "s"; break;
            case "!==": if (spec !== result) s = "s"; break;
            case ">=": if (spec >= result) s = "s"; break;
            case ">": if (spec >= result) s = "s"; break;
            case "<=": if (spec >= result) s = "s"; break;
        }
        msg.status = s
        return msg
    }
    genReport(rd, d) { rd.push(d) }
    entries(obj) { return Object.entries(obj) }
    create(type) { return document.createElement(type) }
    gid(id) { return document.getElementById(id) }
    bulkChilds(e, childs) { for (const c of childs) { e.appendChild(c) } }
    quickE(type, id, txt, actions) {
        let e = this.create(type)
        e.id = id || null
        e.innerText = txt || ""
        if (actions) { for (const action of this.entries(actions)) { let [a, f] = action; e[a] = f } }
        return e
    }

    popUpReport(name, data) {
        let report = ""
        let popTstRoot = this.gid("popTstRoot") || this.quickE("div", "popTstRoot")
        document.body.appendChild(popTstRoot)
        popTstRoot.innerHTML = ""
        let popTstBlockLayer = this.quickE("div", "popTstBlockLayer"), popTstResults = this.quickE("div", "popTstResults")
        let closeBt = this.quickE("button", "popTstClosePopup", "X", { onclick: () => { popTstBlockLayer.style.visibility = "hidden"; popTstRoot.innerHTML = "" } })
        let popTstHeader = this.quickE("h1", "popTstHeader", `Test results ${name}`)
        let popTstData = this.quickE("div", "testData")
        this.bulkChilds(popTstResults, [closeBt, popTstHeader, popTstData])
        popTstBlockLayer.appendChild(popTstResults)
        popTstRoot.appendChild(popTstBlockLayer)
        for (const v of data) {
            switch (v.type) {
                case "comparator":
                    report += `<div class="popTstRepLine"><span class=${v.status === 's' ? 'popTstpass' : 'popTstnotpass'}>${v.name}: ${v.spec} ${v.comparator} ${v.result}</span> 
                <span class="popTstToRight ${v.status === 's' ? 'popTstpass' : 'popTstnotpass'}">${v.status === 's' ? '✅' : '❎'}</span></div>`
                    break;
                case "func":
                    report += `<div class="popTstRepLine"><span class=${v.status === 's' ? 'popTstpass' : 'popTstnotpass'}>${v.name}: ${v.spec} </span> 
                <span class="popTstToRight ${v.status === 's' ? 'popTstpass' : 'popTstnotpass'}">${v.status === 's' ? '✅' : '❎'}</span></div>`
                    break
                default:
                    break;
            }
        }
        report += "<br>"
        report += new Date().toLocaleString()
        testData.innerHTML = report
        //console.log(report);
        popTstBlockLayer.style.visibility = "visible"
    }
    sendErrorReport(data) {
        console.log("Send error report", data);
    }

    appendTest(n, test) {
        this[n] = test
    }
}