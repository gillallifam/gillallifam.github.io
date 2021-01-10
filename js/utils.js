function entries(obj) { return Object.entries(obj) }

let genTemplate = (function () {
    let cache = {};
    function gen(template) {
        let fn = cache[template];
        if (!fn) {
            let sanitized = template
                .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function (_, match) {
                    return `\$\{map.${match.trim()}\}`;
                })
                .replace(/(\$\{(?!map\.)[^}]+\})/g, '');

            fn = Function('map', `return \`${sanitized}\``);
            cache[template] = fn
        }
        return fn;
    }
    return gen;
})();


async function tst1() {
    const [handle] = await window.showOpenFilePicker()
    console.log(handle);
    const file = await handle.getFile()
    console.log(file);
}

async function tst2() {
    const textFile = new File(["hello file"], null, { type: "text/plain" })
    const handle = await window.showSaveFilePicker()
    const writable = await handle.createWritable()
    await writable.write(textFile)
    await writable.close()
}