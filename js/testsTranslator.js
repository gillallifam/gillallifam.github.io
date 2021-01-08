function customFunc(name, spec) {
    let type = "func"
    let result = spec.includes("gnrt")
    let msg = { name, type, spec, result, status: "f" }
    if (result === true) msg.status = 's'
    return msg
}

function tstsTranslator() {
    let reportData = []
    let pt = popTester
    let anId = wappt.genID().next().value
    pt.genReport(reportData, customFunc("ID contains gnrt", anId))
    pt.genReport(reportData, pt.comparator("Generate ID", anId, "!==", undefined))
    pt.genReport(reportData, pt.comparator("Generate multiple IDs", anId, "!==", wappt.genID().next().value))
    pt.genReport(reportData, pt.comparator("Have langs", Object.keys(wappt.allLangs).length, ">=", 1))
    pt.genReport(reportData, pt.comparator("Have targets", Object.keys(wappt.targets).length, ">", 0))
    pt.genReport(reportData, pt.comparator("All langs ok", true, "===", wappt.testLangs(wappt.allLangs)))
    let langEN = wappt.buildLanguage("xyz")
    pt.genReport(reportData, pt.comparator("Use default language", "EN", "===", langEN.$langName))
    pt.genReport(reportData, pt.comparator("Test language", "Hello!", "===", langEN.defMessage))
    pt.genReport(reportData, pt.comparator("Build a language", "PT", "===", wappt.buildLanguage("PT").$langName))
    wappt.translateTargets(wappt.buildLanguage("PT"))
    let tstTarget = document.getElementById("testTarget")
    pt.genReport(reportData, pt.comparator("Translate a target", "Casa", "===", tstTarget.innerText))
    wappt.translateTargets(wappt.buildLanguage("EN"))
    pt.genReport(reportData, pt.comparator("Back to default lang", "House", "===", tstTarget.innerText))
    for (const d of reportData) if (d.status === 'f') { pt.sendErrorReport(reportData) }
    return reportData
}