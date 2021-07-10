function simpleMask() {
    let hdr = {
        "D": (s) => /^\d+$/.test(s),
        "A": (s) => /^[A-Za-z0-9]+$/.test(s),
        "L": (s) => /^[A-Za-z]+$/.test(s),
    }
    let Ks = Object.keys(hdr)
    let unMask = (s) => s.replace(/[^\w\s]/gi, '')
    let maskString = (s, mask) => {
        let raw = unMask(s)
        let pos = -1, res = ""
        for (const simb of mask) {
            if (Ks.includes(simb)) {
                pos++
                if (!raw[pos]) break
                if (hdr[simb](raw[pos])) res += raw[pos];
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