//seekbug
class LocTest {
    constructor(root) {
        this.root = root
        this.styles = document.createElement("style")
        this.styles.id = "testStyles"
        this.styles.textContent = `.tstpass{color:#006400}.tstnotpass{color:#cd5c5c}#testBlockLayer{backdrop-filter:blur(3px);user-select:none;visibility:hidden;position:absolute;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0)}#testResults{position:absolute;left:50%;top:20%;padding:10px;background-color:ivory;border-radius:3%;width:50%;transform:translateX(-50%);box-shadow:-1px 0 25px 0 rgba(0,0,0,.68)}.tstToRight{float:right}#testClosePopup{border-radius:25%;float:right}.testRepLine{width:100%;background-color:#dcdcdc}`
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
    appendChilds(e, childs) { for (const c of childs) { e.appendChild(c) } }
    quickE(type, id, txt, actions) {
        let e = this.create(type)
        if (id) e.id = id
        if (txt) e.innerText = txt
        if (actions) { for (const action of this.entries(actions)) { let [a, f] = action; e[a] = f } }
        return e
    }

    popUpReport(name, data) {
        let report = ""
        let testRoot
        if (!this.gid("testRoot")) testRoot = this.quickE("div", "testRoot")
        else testRoot = this.gid("testRoot")
        document.body.appendChild(testRoot)
        testRoot.innerHTML = ""
        let testBlockLayer = this.quickE("div", "testBlockLayer")
        let testResults = this.quickE("div", "testResults")
        let closeBt = this.quickE("button", "testClosePopup", "X", { onclick: () => { testBlockLayer.style.visibility = "hidden"; testRoot.innerHTML = "" } })
        let testHeader = this.quickE("h1", "testHeader", `Test results ${name}`)
        let testData = this.quickE("div", "testData")
        this.appendChilds(testResults, [closeBt, testHeader, testData])
        testBlockLayer.appendChild(testResults)
        testRoot.appendChild(testBlockLayer)
        for (const v of data) {
            switch (v.type) {
                case "comparator":
                    report += `<div class="testRepLine"><span class=${v.status === 's' ? 'tstpass' : 'tstnotpass'}>${v.name}: ${v.spec} ${v.comparator} ${v.result}</span> 
                <span class="tstToRight ${v.status === 's' ? 'tstpass' : 'tstnotpass'}">${v.status === 's' ? '✅' : '❎'}</span></div>`
                    break;
                case "func":
                    report += `<div class="testRepLine"><span class=${v.status === 's' ? 'tstpass' : 'tstnotpass'}>${v.name}: ${v.spec} </span> 
                <span class="tstToRight ${v.status === 's' ? 'tstpass' : 'tstnotpass'}">${v.status === 's' ? '✅' : '❎'}</span></div>`
                    break
                default:
                    break;
            }
        }
        report += "<br>"
        report += new Date().toLocaleString()
        testData.innerHTML = report
        testBlockLayer.style.visibility = "visible"
    }
    sendErrorReport(data) {
        console.log("Send error report", data);
    }

    appendTest(n, test) {
        this[n] = test
    }
}