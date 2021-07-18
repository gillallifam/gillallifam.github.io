
function simpleMask(options) {

    const regexSpecialCharacters = options.specialChars || [
        "\\", ".", "+", "*", "?",
        "[", "^", "]", "$", "(",
        ")", "{", "}", "=", "!",
        "<", ">", "|", ":", "-"
    ];

    function extractSymbols(s) {
        return s.replace(/\w/g, '').split("").filter(function (x, n, s) {
            return s.indexOf(x) == n
        }).join("")
    }

    function replacer(str) {
        regexSpecialCharacters.forEach(rgxSpecChar =>
            str = str.replace(new RegExp("\\" + rgxSpecChar, "gm"), "\\" +
                rgxSpecChar))
        return str
    }

    function selectPattern(mask) {
        let atualPattern = ""
        if (mask.includes("A")) return "[A-Za-z0-9]+"
        if (mask.includes("n") && mask.includes("N")) return "[A-Za-z0-9]+"
        if (mask.includes("N") && !mask.includes("n")) return "[A-Z0-9]+"
        if (mask.includes("n") && !mask.includes("N")) return "[a-z0-9]+"
        if (mask.includes("C") && !mask.includes("P") && !mask.includes("D")) return "[A-Za-z]+"
        if (mask.includes("L") && mask.includes("U")) atualPattern = "a-zA-Z"
        if (mask.includes("L") && !mask.includes("U")) atualPattern = "a-z"
        if (mask.includes("U") && !mask.includes("L")) atualPattern = "A-Z"
        if (mask.includes("D")) atualPattern += "0-9"
        if (mask.includes("P") && !mask.includes("D")) atualPattern += "1-9"
        return `[${atualPattern}]+`
    }

    let hdr = {
        "P": (s) => /^[1-9]+$/.test(s),
        "D": (s) => /^[0-9]+$/.test(s),
        "L": (s) => /^[a-z]+$/.test(s),
        "U": (s) => /^[A-Z]+$/.test(s),
        "C": (s) => /^[a-zA-Z]+$/.test(s),
        "N": (s) => /^[0-9A-Z]+$/.test(s),
        "n": (s) => /^[0-9a-z]+$/.test(s),
        "A": (s) => /^[A-Za-z0-9]+$/.test(s)
    }
    let Ks = Object.keys(hdr)
    let unMask = (s) => s.replace(/[^\w\s]/gi, '').replaceAll(" ", "")
    let maskString = (s, mask) => {
        let raw = unMask(s)
        if (!raw) return ""
        let pos = -1, r = ""
        for (let simb of mask) {
            if (Ks.includes(simb)) {
                pos++
                if (!raw[pos]) break
                if (hdr[simb](raw[pos])) r += raw[pos];
            } else r += simb;
        }

        if (/[\w\d]+/.test(r)) return r
        else return ""
    }
    let maskInput = function (input, mask, usePattern = true) {
        if (usePattern) {
            let p0 = selectPattern(mask)
            let p1 = p0.substr(0, p0.length - 2)
            let p2 = replacer(extractSymbols(mask))
            input.setAttribute("pattern", `${p1 + p2}]{${mask.length},}`)
            input.required = true
        }

        input.addEventListener('keyup', function (e) {
            if (!(e.keyCode === 8)) {
                e.target.value = maskString(e.target.value, mask)
            }
        });
    }
    return {
        maskString: maskString,
        maskInput: maskInput,
        unMask: unMask
    }
}