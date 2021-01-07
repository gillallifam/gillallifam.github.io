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
