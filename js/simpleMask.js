function simpleMask() {
    let holder = {
        "D": (str) => /^\d+$/.test(str),
        "A": (str) => /^[A-Za-z0-9]+$/.test(str),
        "L": (str) => /^[A-Za-z]+$/.test(str),
    }
    let symbols = Object.keys(holder)
    let unMask = (str) => str.replace(/[^\w\s]/gi, '')
    let maskString = (str, mask) => {
        let raw = unMask(str)
        let pos = -1, res = ""
        for (const simb of mask) {
            if (symbols.includes(simb)) {
                pos++
                if (holder[simb](raw[pos])) res += raw[pos]; else break
            } else res += simb;
        }
        return res
    }
    let maskInput = function (input, mask) {
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