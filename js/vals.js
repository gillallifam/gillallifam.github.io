class Vals {
    constructor(form, options) {
        this.options = options
        if (form) {
            this.form = form
            form.onsubmit = (e) => {
                console.log("Submiting");
                e.preventDefault();
                let data = Object.fromEntries(new FormData(e.target))
                for (const box of form.querySelectorAll('input[type="checkbox"]')) { data[box.name] = box.checked }
                for (const radio of form.querySelectorAll('input[type="radio"]')) { if (radio.checked) data[radio.name] = radio.value }
                for (const sel of document.querySelectorAll('select')) {
                    if (sel.multiple) data[sel.name] = Array.from(sel.querySelectorAll('option:checked')).map(el => el.value);
                    else data[sel.name] = sel.value
                }
                this.validate(data);
            }
        }
        this.schema = {}
        this.rgx = {
            onlyNumbers: /^\d+$/
        }
        this.errors = {}
        this.avaliators = {}
    }
    validate(obj) {
        console.log("Validate");
        let result = { pass: true }
        for (const [oe, ov] of Object.entries(obj)) {
            let fs = this.schema[oe]
            let el = this.form.querySelector(`*[name=${oe}]`)
            if (fs) {
                for (const [r, v] of Object.entries(fs)) {
                    if (!this.avaliators[r]) result.pass = false; //must be warning
                    if (!this.avaliators[r](ov, v)) {
                        result.pass = false;
                        result.error = this.errors[oe] ? `${this.errors[oe](oe, r, v)}` : `${oe} ${r} ${v}`;
                        el.style.backgroundColor = this.options.colorError
                        let cv = "An error here!"//?
                        if (this.errors[oe]) cv = this.errors[oe]()
                        el.setCustomValidity(cv);
                        el.reportValidity()
                        el.oninput = () => el.setCustomValidity("");
                        return result//not pass
                    } else {
                        el.style.backgroundColor = this.options.colorSuccess
                    }
                }
            }
        }
        if (result.pass) this.toast(result.pass)
        return result
    }
    validateAll(objs) {
        for (const obj of objs) {
            if (!this.validate(obj)) return false
        }
        return true
    }
    toast(success, msg) {
        let bar = document.getElementById("snackbar");
        if (success) {
            bar.innerHTML = this.options.msgSuccess
            bar.style.backgroundColor = this.options.colorSuccess
        } else {
            bar.style.backgroundColor = this.options.colorError
            bar.innerHTML = msg
        }
        bar.className = "show"
        setTimeout(function () { bar.className = bar.className.replace("show", ""); }, 3000);
    }
}

function isObj(x) {
    return typeof x === 'object' && x !== null && !Array.isArray(x)
}

const allAvaliators = {//the boring part
    isArray: (o, f) => Array.isArray(o) === f,
    minElems: (a, n) => Array.isArray(a) && a.length >= n,
    empty: (s, f) => (s === "") === f,
    notEqual: (s1, s2) => s1 !== s2,
    mustContains: (s, v) => s.toLowerCase().includes(v.toLowerCase()),
    mustNotContains: (s, v) => !s.toLowerCase().includes(v.toLowerCase()),
    maxLen: (s, v) => s.length <= v,
    minLen: (s, v) => s.length >= v,
    max: (n, v) => n <= v,
    min: (n, v) => n >= v,
    onlyNumbers: (s, b) => (this.rgx.onlyNumbers).test(s) === b,
    minLen: (s, v) => s.length >= v,
    isPositive: (n, b) => Number.isInteger(n) & n > 0,
    isEmail: (m, b) => {
        let p = m.split("@");
        if (p.length != 2) return false;
        return (this.rgx.emailUser.test(p[0]) && this.rgx.emailDomain.test(p[1]));
    }
}