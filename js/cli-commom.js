var totalItems = 10000;
var socketPort = 9001;
var peerServer = "192.168.0.2"
var peerPort = "9099"
/**
 * todo:
 * @param {*} length 
 */
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function timedId() {
    return Date.now() +"-"+ makeid(10)
}

function nBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}