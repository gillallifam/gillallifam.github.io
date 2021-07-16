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


let isdev = localStorage.getItem("isdev") === "y"

let global= {
    name: "globalName"
}

function devlog() {
    if (isdev) console.log.apply(console, arguments);
}
devlog("App in Developing.");

const defaultOptions = {
    firstRun: true,
    scalePrint: "price", //weight
    bkpImages: false,
    installID: undefined,
    installDate: undefined,
    currSymbol: "R$ ",
    currSeparator: ".",
    currDecimal: ",",
    currPrecision: 2,
    shopName: "New shop"
}

const defaultProd = {
    cod: "",
    nameSho: "",
    nameLon: "",
    cost: "0,00",
    price: "",
    weight: 0,
    provider: "",
    qnt: 0,
    min: -1,
    category: "",
    numSales: 0,
    lastUpdate: "null",
    expiration: "",
    expAlert: 0,
    active: 1,
    notify: ""
}

const defaultUser = {
    name: "",
    email: "",
    hash: "",
    role: ""
}

const defaultClient = {
    cliName: "",//obg
    cliTel: "",//opt
    cliCPF: "",//opt
    cliAdd: "",//opt
    lastUpdate: "null"
}

const defaultProvider = {
    provName: "",//obg
    provTel: "",//opt
    provEmail: "",//opt
    provAdd: "",//opt
    lastUpdate: "null"
}

const sales = {//date is storeName
    user: "",
    consumer: "",//optional
    date: "",
    dst: "",
    products: "",//cartItems//arr or obj
    payType: ""
}

const defaultOrder = {
    num: -1,
    owner: "",
    items: {},
    status: "pending"
}

const defaultNotify = {
    destiny: "",
    orderNum: "",
    items: {}
}

function greet() {
    let h = new Date().getHours();
    if (h >= 18) return "Boa noite!";
    if (h >= 12) return "Boa tarde!";
    return "Bom dia!";
}

function resizeImage(sz) {
    var img = document.createElement("img");
    //img.src = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAIAAAAHjs1qAAAABmJLR0QA/wD/AP+gvaeTAAAD60lEQVR4nO3dQW4bMRAAwSjI/7+sfCALZwVSJLerzoIcyY05jBnu6/1+/4KG36v/AfA9cidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJ+bPwZ79er4U//f+NetLy1ee9ev9Rr9/NwidXm+6EyJ0QuRMid0LkTojcCZE7ISv37ldW7WVn761Xfa6nfp8fMN0JkTshcidE7oTInRC5EyJ3Qnbcu18Ztcc95fz67H35bt/nF5juhMidELkTIndC5E6I3AmROyEn7d13c3fffPf1d/f0/Mh0J0TuhMidELkTIndC5E6I3Amxdx/vqfeyP4DpTojcCZE7IXInRO6EyJ0QuRNy0t799HPed/frsz/v6d/nB0x3QuROiNwJkTshcidE7oTInZAd9+6nnP+efb/7qHtmTvk+v8B0J0TuhMidELkTIndC5E6I3AlZuXcPnre+Zfb98UGmOyFyJ0TuhMidELkTIndC5E7Iyr37qHPYT703ffb3c9cDnvNquhMid0LkTojcCZE7IXInRO6E7HjefdV+d9V+uvb6hUx3QuROiNwJkTshcidE7oTInZAdz7vPvr989vn4VfvmVf9/4KB9vOlOiNwJkTshcidE7oTInRC5E/La8FDyqP3uldP3+qt+7kH79SumOyFyJ0TuhMidELkTIndC5E7Iyr37Kfevz943z/47w5VVf39YyHQnRO6EyJ0QuRMid0LkTojcCdnxvPspdttDzz53vtvn/YDpTojcCZE7IXInRO6EyJ0QuRPivPvPVt2vcvr7b8h0J0TuhMidELkTIndC5E6I3AlZ+VzVK6c/l3TUPnv2fTXumYEnkzshcidE7oTInRC5EyJ3Qnbcu19Zda/5qvc/5bz7Qc9bNd0JkTshcidE7oTInRC5EyJ3Qk7au+9m1L659vqFTHdC5E6I3AmROyFyJ0TuhMidEHv3z+22b559X/4D9vGmOyFyJ0TuhMidELkTIndC5E7ISXv3Dc9P/9OoffOo+9Sv3mf2fe0b/r5Md0LkTojcCZE7IXInRO6EyJ2QHffus89tzzZq37xqj373/Z13hx3JnRC5EyJ3QuROiNwJkTshrw0PJcMkpjshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJ+QumISrt48ClgAAAAABJRU5ErkJggg==";

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    canvas.width = sz;
    canvas.height = sz;
    ctx.drawImage(img, 0, 0, sz, sz);

    var dataurl = canvas.toDataURL("image/webp");
    document.getElementById("imgR").src = dataurl
}

function imgUpload(params) {
    /* let formData = new FormData();
        formData.append('key', '2a60ea2cc5f3655b2cac34c944ce945d');
        formData.append('name', '16xx11xxxx16xxxx16xx16xxxx166');
        //formData.append('image', "iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAIAAAAHjs1qAAAABmJLR0QA/wD/AP+gvaeTAAAD9klEQVR4nO3dQW7bMBBA0bjo/a+cXqAqyoAyR/7vrQNHMD64mEyo1/f39xc0/Dr9APA+cidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJ+X3wd79er4O//f9dvWn51PNPe55VB99c7XQnRO6EyJ0QuRMid0LkTojcCTk5d79yai67OrdenX/v+vlVT/k+38DpTojcCZE7IXInRO6EyJ0QuRMyce5+Zdccd9ocetrzrDq4v77K6U6I3AmROyFyJ0TuhMidELkT8qS5+6eaNo//YE53QuROiNwJkTshcidE7oTInRBz9/2ecv9MkNOdELkTIndC5E6I3AmROyFyJ+RJc/enz5unvQ/16d/nDzjdCZE7IXInRO6EyJ0QuRMid0Imzt0Hvo/zr+7eX9/1PTzl+3wDpzshcidE7oTInRC5EyJ3QuROyCu49LyLPfXHcboTIndC5E6I3AmROyFyJ0TuhJzcd1+dW+/aC9+1j37qea5Muw9+2vN8Od1JkTshcidE7oTInRC5EyJ3QibeM3P3e0bvvh/mKfvowfe8Ot0JkTshcidE7oTInRC5EyJ3Qj7hnplT++6rz7Prqz61T7/6+QM53QmROyFyJ0TuhMidELkTIndCJu67X7n7vaS75uurTu3T3z2PH8jpTojcCZE7IXInRO6EyJ0QuRPypPvdV03b8z61B/+gffS7Od0JkTshcidE7oTInRC5EyJ3Qj7hnplT7t6/vzLtPvu7/69gI6c7IXInRO6EyJ0QuRMid0LkTsgn77vvMu2+l1P323wApzshcidE7oTInRC5EyJ3QuROyMT73U/NfU/9HeDuPfjVz9913/zAv6s43QmROyFyJ0TuhMidELkTIndCJs7dr5y6p+XKqX3xu+97Wd2zf9B+vNOdELkTIndC5E6I3AmROyFyJ+RJc3f+bde977sMnMc73QmROyFyJ0TuhMidELkTIndCzN1/btp7RnfdD7P6+d6rChPJnRC5EyJ3QuROiNwJkTshT5q7T9uffvp98LvujXG/O0wkd0LkTojcCZE7IXInRO6EvA4OswfOZf9qda48bQ9+1bR79DdyuhMid0LkTojcCZE7IXInRO6EnJy7w5s53QmROyFyJ0TuhMidELkTIndC5E6I3AmROyFyJ0TuhMidELkTIndC5E6I3AmROyFyJ0TuhMidELkTIndC5E6I3AmROyFyJ0TuhMidELkTIndC5E6I3AmROyFyJ0TuhMidELkTIndC5E7IHyZzBwXJF7VDAAAAAElFTkSuQmCC");
        formData.append('image', "iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAIAAAAHjs1qAAAABmJLR0QA/wD/AP+gvaeTAAAD60lEQVR4nO3dQW4bMRAAwSjI/7+sfCALZwVSJLerzoIcyY05jBnu6/1+/4KG36v/AfA9cidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJ+bPwZ79er4U//f+NetLy1ee9ev9Rr9/NwidXm+6EyJ0QuRMid0LkTojcCZE7ISv37ldW7WVn761Xfa6nfp8fMN0JkTshcidE7oTInRC5EyJ3Qnbcu18Ztcc95fz67H35bt/nF5juhMidELkTIndC5E6I3AmROyEn7d13c3fffPf1d/f0/Mh0J0TuhMidELkTIndC5E6I3Amxdx/vqfeyP4DpTojcCZE7IXInRO6EyJ0QuRNy0t799HPed/frsz/v6d/nB0x3QuROiNwJkTshcidE7oTInZAd9+6nnP+efb/7qHtmTvk+v8B0J0TuhMidELkTIndC5E6I3AlZuXcPnre+Zfb98UGmOyFyJ0TuhMidELkTIndC5E7Iyr37qHPYT703ffb3c9cDnvNquhMid0LkTojcCZE7IXInRO6E7HjefdV+d9V+uvb6hUx3QuROiNwJkTshcidE7oTInZAdz7vPvr989vn4VfvmVf9/4KB9vOlOiNwJkTshcidE7oTInRC5E/La8FDyqP3uldP3+qt+7kH79SumOyFyJ0TuhMidELkTIndC5E7Iyr37Kfevz943z/47w5VVf39YyHQnRO6EyJ0QuRMid0LkTojcCdnxvPspdttDzz53vtvn/YDpTojcCZE7IXInRO6EyJ0QuRPivPvPVt2vcvr7b8h0J0TuhMidELkTIndC5E6I3AlZ+VzVK6c/l3TUPnv2fTXumYEnkzshcidE7oTInRC5EyJ3Qnbcu19Zda/5qvc/5bz7Qc9bNd0JkTshcidE7oTInRC5EyJ3Qk7au+9m1L659vqFTHdC5E6I3AmROyFyJ0TuhMidEHv3z+22b559X/4D9vGmOyFyJ0TuhMidELkTIndC5E7ISXv3Dc9P/9OoffOo+9Sv3mf2fe0b/r5Md0LkTojcCZE7IXInRO6EyJ2QHffus89tzzZq37xqj373/Z13hx3JnRC5EyJ3QuROiNwJkTshrw0PJcMkpjshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJkTshcidE7oTInRC5EyJ3QuROiNwJ+QumISrt48ClgAAAAABJRU5ErkJggg==");

        fetch("https://api.imgbb.com/1/upload",
            {
                body: formData,
                method: "post"
            }).then(async (res) => {
                let data = await res.json()
                console.log(data.data);
            }); */
}

async function binarySearch(store, idx, key, val) {
    if (!idxCaches[store]) idxCaches[store] = await db.getAllKeysFromIndex(store, idx)
    //console.log(idxCaches[store].length);
    let start = 0, mid = 0, it = 0, end = idxCaches[store].length - 1;

    while (start <= end) {
        ++it;
        mid = Math.floor((start + end) / 2);
        let x = await db.get(store, idxCaches[store][mid])
        if (x[key] === val) { console.log(it); return x; }
        if (val < x[key]) end = mid - 1;
        else start = mid + 1;
    }
    console.log(it)
    return null;
}

async function relatsTest() {
    setTimeout(async () => {
        let all = await DBBase.getAll("Products")
        let a = ovals(all).filter((item) => {
            return parseInt(item.qnt) <= parseInt(item.min)
        })
        console.log("acabando", a);
        let v = ovals(all).filter((item) => {
            let diff = Infinity
            //console.log(item);
            if (item.expiration) {
                let d = item.expiration.split("/").reverse().join("/")
                let venc = new Date(d)
                let today = new Date()
                diff = dateDiffInDays(today, venc)
            }
            return diff <= parseInt(item.expAlert)
        })
        console.log("vencendo", v);
    }, 1000);

}

//relatsTest()

function addCss(fileName) {
    document.querySelector('#currTheme')?.remove()
    let head = document.head;
    let link = document.createElement("link");
    let id = "currTheme"
    link.id = id

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    try {
        head.appendChild(link);
    } catch (error) {
        console.error(error);
        addCss("/css/themes/amber.css")
    }
}

function getCSSRules(id) {
    for (const sheet of document.styleSheets) {
        if (sheet.ownerNode.id === id) {
            console.log(sheet);
            /* for (const rule of sheet.cssRules) {
                console.log(rule);
            } */
        }
    }
}

function disableF5(e) {
    if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82)
        e.preventDefault();
};

function getPWADisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
        return 'twa';
    } else if (navigator.standalone || isStandalone) {
        return 'standalone';
    }
    return 'browser';
}

function subSet(o1, props, o2 = {}) {
    props.forEach(p => o2[p] = o1[p]); return o2
}

var lastToast = null
function showToast(msg, color, time) {
    let e = document.getElementById("snackbar");
    e.style.backgroundColor = color || "black"
    e.querySelector(".tmsg").innerText = msg
    if (lastToast) clearTimeout(lastToast)
    e.classList.replace("thide", "tshow")
    lastToast = setTimeout(function () { e.classList.replace("tshow", "thide") }, time);
}

getHash("1596321");
async function getHash(str, algo = "SHA-256") {
    let strBuf = new TextEncoder('utf-8').encode(str);
    let result = '';
    if (crypto.subtle) {
        return crypto.subtle.digest(algo, strBuf)
            .then(hash => {
                const view = new DataView(hash);
                for (let i = 0; i < hash.byteLength; i += 4) {
                    result += view.getUint32(i).toString(36);
                }
                return result;
            });
    } else {
        await loadScript2("sha-256", "./js/sha256.js")
        let shaObj = new jsSHA(algo, "TEXT", { encoding: "UTF8" });
        shaObj.update(str);
        const hash = shaObj.getHash("ARRAYBUFFER");
        const view = new DataView(hash);
        for (let i = 0; i < hash.byteLength; i += 4) {
            result += view.getUint32(i).toString(36);
        }
        return result;
    }

}

function xQuery(x, q) { return x.querySelector(q) }
const xq = xQuery

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearCPF(cpf) {
    return cpf.replace(/([^a-z0-9]+)/gi, '')
}

function getUnitType(bc) {
    if (bc.startsWith("2")) return "kilo"
    return "price"
}

function bcToCacheName(bc) {
    let cacheName = ""
    switch (bc.length) {
        case 13:
            if (bc.startsWith("2")) {
                cacheName = bc.substr(0, 7) + "000000"
            } else {
                cacheName = bc
            }
            break
        case 12://UPC-A
        case 8://EAN-8
            cacheName = bc
            break;
        default://any other
            cacheName = bc
            break;
    }
    return cacheName
}

//var cacheIMGs
async function openImageCache() {
    //cacheIMGs = await caches.open("IMGs");
    //let keys = await cacheIMGs.keys()
    //console.log(keys.map(x => x.url));
}

function bcLenCheck(bc) {
    switch (bc.length) {
        case 13:
        case 12:
        case 8:
            return true
        default:
            return false
    }
}

function bcDestruct(bc) {
    let r = { cacheName: bc }
    if (bc.startsWith("20") && bc.length === 13) {
        r.type = bc.substr(0, 2)
        r.cacheName = bc.substr(0, 7) + "000000"
        r.icode = bc.substr(2, 5)
        r.dataType = "w"
        if (r.icode === "00000") r.dataType = "p"
        r.data = bc.substr(7, 5)
        switch (OPTIONS.scalePrint) {
            case "price":
                r.value = $g.money(r.data).format()
                break;
            case "weight":
                r.value = $g.weight(r.data).format()
                break;
        }
    }
    return r
}

function entries(obj) { return Object.entries(obj) }
function okeys(obj) { return Object.keys(obj) }
function ovals(obj) { return Object.values(obj) }
function create(type) { return document.createElement(type) }
function gid(id) { return document.getElementById(id) }
function quickE(type, id, txt, actions) {
    let e = this.create(type)
    e.id = id || null
    e.innerText = txt || ""
    if (actions) { for (const action of this.entries(actions)) { let [a, f] = action; e[a] = f } }
    return e
}

function blobToURL(blob) {
    return window.URL.createObjectURL(blob)
}

async function blobToBase64(blob) {
    return new Promise((res) => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            res(reader.result)
        }
    })
}

async function base64ToBlob(url) {
    let res = await fetch(url)
    let blob = await res.blob()
    return blob
}

function updateObj(obj) {
    for (var i = 1; i < arguments.length; i++) {
        for (var prop in arguments[i]) {
            var val = arguments[i][prop];
            if (typeof val == "object") // this also applies to arrays or null!
                update(obj[prop], val);
            else
                obj[prop] = val;
        }
    }
    return obj;
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function genNumbWithPad0(min = 0, max = 1) {
    let n = nBetween(min, max)
    if (n < 10) n = "0" + n
    return "" + n
}

function rBool() {
    return nBetween(0, 1)
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function makeid(length, mlen = 64) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * mlen || characters.length));
    }
    return result;
}

function makeNumid(length) {
    var result = '';
    var characters = '0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function makeUpperId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function pickDigitInt() {
    var chars = '123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length))
}
function pickDigitAny() {
    var chars = '0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length))
}
function pickUpper() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return chars.charAt(Math.floor(Math.random() * chars.length))
}
function pickLower() {
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    return chars.charAt(Math.floor(Math.random() * chars.length))
}
function pickAnyCase() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return chars.charAt(Math.floor(Math.random() * chars.length))
}
function pickUpperNum() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length))
}
function pickLowerNum() {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length))
}
function pickAny() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length))
}
var getDaysArray = function (s, e) { for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) { a.push(new Date(d)); } return a; };

function genTimedPid() {
    return "" + Date.now()
}

function applyPadStart(n) {
    return n.toString().padStart(2, "0")
}

function nBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function fBetween(min, max) {
    return (Math.random() * (max - min + 1) + min);
}

function sortAscend(a, b, prop) {
    return a[prop] - b[prop]
}

function sortString(a, b) {
    return b - a
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isObj(x) {
    return typeof x === 'object' && x !== null && !Array.isArray(x)
}

function rndDayInMonth() {
    let t = new Date()
    let lastDayOfMonth = new Date(t.getFullYear(), t.getMonth() + 1, 0);
    return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + applyPadStart(nBetween(1, lastDayOfMonth.getDate()))
}
function rndDayInYear(year) {
    let start = new Date(year, 01, 01)
    let end = new Date(year, 12, 31)
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
        .toISOString().slice(0, 10);
}

function downloadContent(name, content) {
    var atag = document.createElement("a");
    var file = new Blob([content], { type: 'text/plain' });
    atag.href = URL.createObjectURL(file);
    atag.download = name;
    atag.click();
}

async function verifyPermission(fileHandle, readWrite) {
    const options = {};
    if (readWrite) {
        options.mode = 'readwrite';
    }
    // Check if permission was already granted. If so, return true.
    if ((await fileHandle.queryPermission(options)) === 'granted') {
        return true;
    }
    // Request permission. If the user grants permission, return true.
    if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true;
    }
    // The user didn't grant permission, so return false.
    return false;
}

async function loadScript2(id, url) {
    return await new Promise(resolve => {
        if (!gid(id)) {
            let scr = document.createElement("script");
            scr.src = url;
            scr.id = id
            scr.onload = function () { resolve(id + " loaded.") }
            document.head.appendChild(scr);
        } else {
            resolve(id + " ready.")
        }
    });
}

function handleMenu(el) {
    //console.log(el);
    let e = event.target
    if (e.classList.contains("menuOpener")) {
        $g.sidebarLinks.forEach((c) => { c.classList.remove("w3-theme") })
        el.querySelector("a").classList.add("w3-theme")
    }

    let cl = el.querySelector("div").classList
    if (cl.contains("w3-hide")) cl.replace("w3-hide", "w3-show")
    else cl.replace("w3-show", "w3-hide")
}

async function saveFileTxt(data) {
    const textFile = new File([data], null, { type: "text/plain" })
    const handle = await window.showSaveFilePicker()
    const writable = await handle.createWritable()
    await writable.write(textFile)
    await writable.close()
}

function stringToDouble(s) {
    return parseFloat(s.replace(",", "."))
}

async function getIP() {
    let ipdata = await fetch('https://www.cloudflare.com/cdn-cgi/trace')
    ipdata = await ipdata.text()
    let data = ipdata.trim().split('\n').reduce(function (obj, pair) {
        pair = pair.split('=');
        return obj[pair[0]] = pair[1], obj;
    }, {});
    console.log(data.ip);
    Nfx.Notify.Info(data.ip);
}

function stripSeparators(s) {
    return s.replace(/[^0-9]/g, '')
}

function stripSeparators2(s) {
    return s.replace(/[^0-9A-Z-a-z]/g, '')
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function chk(target, times, delay) {
    return new Promise((res, rej) => {                       // return a promise

        (function rec(i) {                                   // recursive IIFE
            fetch(target, { mode: 'no-cors' }).then((r) => {   // fetch the resourse
                res(r);                                      // resolve promise if success
            }).catch(err => {
                if (times === 0)                             // if number of tries reached
                    return rej(err);                         // don't try again

                setTimeout(() => rec(--times), delay)       // otherwise, wait and try 
            });                                              // again until no more tries
        })(times);

    });
}

const appRGX = {
    onlyNumbers: /^\d+$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}/
}

const allAvaliators = {//the boring part
    isArray: (o, f) => Array.isArray(o) === f,
    minElems: (a, n) => Array.isArray(a) && a.length >= n,
    empty: (s, f) => (s === "") === f,
    notEqual: (s1, s2) => s1 !== s2,
    mustContains: (s, v) => s.toUpperCase().includes(v.toUpperCase()),
    mustNotContains: (s, v) => !s.toUpperCase().includes(v.toUpperCase()),
    maxLen: (s, v) => s.length <= v,
    minLen: (s, v) => s.length >= v,
    max: (n, v) => n <= v,
    min: (n, v) => n >= v,
    onlyNumbers: (s, b) => (appRGX.onlyNumbers).test(s) === b,
    isCPF: (s, b) => (appRGX.cpf).test(s) === b,
    minLen: (s, v) => s.length >= v,
    isPositive: (n, b) => Number.isInteger(n) & n > 0,
    isEmail: (m, b) => {
        let p = m.split("@");
        if (p.length != 2) return false;
        return true;
    }
}

const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function log(str) {
    console.log(str);
}

/* var t = "https://google.com/favicon.ico";

chk(t, 3, 1000).then(image => {
    console.log('success')
}).catch(err => {
    console.log('error')
}); */


/* let schema = {}
   ovals(prodVals.schema).forEach((s) => {
     for (const x of okeys(s)) {
       schema[x] = allAvaliators[x]
     }
   })

   console.log(schema); */

/* Notiflix.Notify.Success('Sol lucet omnibus');

 Notiflix.Report.Success('Notiflix Success','"Do not try to become a person of success but try to become a person of value." <br><br>- Albert Einstein','OK');

 Notiflix.Confirm.Show('Notiflix Confirm','Do you agree with me?','Yes','No',function(){ alert('Thank you.');},function(){ alert('If you say so...');});

 Notiflix.Loading.Circle('Please wait...'); */

    //if (uName) document.getElementById("loginArea").style.display = "none"


/* var API_KEY = '21396544-cf243907f0f196d9046cf4346';
  console.log(API_KEY);
  var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent('red roses');
  fetch(URL)
    .then(response => response.json())
    .then(data => console.log(data)); */

/* $.getJSON(URL, function (data) {
  if (parseInt(data.totalHits) > 0)
    $.each(data.hits, function (i, hit) { console.log(hit.pageURL); });
  else
    console.log('No hits');
}) */

//console.log(Date.now() + makeid(15, 62));//1618400877766xBXpWUjKNBLxf7m

 // config

  //console.log("" + window.navigator.onLine);
      //console.log(navigator.hardwareConcurrency);

/* var enc = new TextEncoder(); // always utf-8
let arr = enc.encode(JSON.stringify(t1))
console.log(arr);

let objX = {
  a : arr
}
console.log(JSON.stringify(objX)); */

/* let dec = new TextDecoder()
let decoded = dec.decode(arr)
console.log(decoded); */