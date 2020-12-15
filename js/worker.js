var obd = {
    "§tables": ["people", "addr", "hobbies"],
    addr: {},
    //search(f) { return Object.values },
    addAddres(adr) {
        this.addr[adr.id] = adr
    },
    addUser(p) {
        this.user[p.id] = p
    },
    user: {},
    addHobbie(h) {
        this.hobbie[h.id] = h
    },
    hobbie: {}
}
console.log(obd);

var JSONPrs = (str) => {
    return JSON.parse(str, function (key, value) {
        if (typeof value === "string" && (value.startsWith("function"))) {
            if (value.startsWith("function")) return (0, eval)("(" + value + ")");
        }
        return value;
    });
}

console.time("Filling")
for (let i = 1; i <= 10000; i++) {
    let id = makeid(10) + i
    obd.addAddres({ id: id, rua: makeid(5), n: makeid(5) })
    obd.addHobbie({ id: id, h1: makeid(5), h2: makeid(5) })
    obd.addUser({ id: id, name: makeid(5), age: 0.1 * i })
}
console.timeEnd("Filling")


function bdSearch(defs) {
    let result = {}
    result[defs.table] = Object.values(obd[defs.table])[defs.type](defs.job)
    defs.joins.forEach((j) => {
        joinAny(result[defs.table], j)
    })
    //console.log(result);
    return result
}

function joinerAny(obj, table) {
    for (p in obj) obj[table] = obd[table][obj.id] || null
}

function joinAny(grp, table) { for (p in grp) joinerAny(grp[p], table) }

function joinerAll(obj) {
    for (p in obj) if (obj[p] === "§") obj[p] = obd[p][obj.id] || null
}

function joinAll(grp) { for (p in grp) joinerAll(grp[p]) }

function tcomparer(x, s, y) {
    switch (s) {
        case ">":
            return (y > x) ? true : false
        case ">=":
            return (y >= x) ? true : false
        case "<=":
            return (y <= x) ? true : false
    }
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

onmessage = function (e) {
    let { action, opt } = e.data
    switch (action) {
        case "search":
            console.time("search")
            let res = bdSearch(JSONPrs(opt))
            console.timeEnd("search")
            this.postMessage({ type: "search", data: res })
            break;

        default:
            break;
    }

}