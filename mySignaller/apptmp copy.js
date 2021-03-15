var express = require('express');
//const cookieParser = require("cookie-parser");
var app = express();
//app.use(cookieParser());
var expressWs = require('express-ws')(app);
const users = {
    User1: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    User2: "481f6cc0511143ccdd7e2d1b1b94faf0a700a8b49cd13922a70b5ae28acaa8c5",
    Server1: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
}

const connecteds = {}

app.ws('/', function (ws, req) {
    //console.log(req.cookies);
    //console.log(ws);
    if (users[req.query.userid] && users[req.query.userid] === data.passhash) {
        connecteds[data.userid] = ws
    } else {
        ws.send(JSON.stringify({ action: "access", status: false }))
        ws.close()
        ws.destroy()
    }
    //console.log(req.socket.remoteAddress);
    ws.on('message', function (msg) {
        let data = JSON.parse(msg)
        switch (data.action) {
            case "activate":
                if (users[data.userid] && users[data.userid] === data.passhash) {
                    connecteds[data.userid] = ws
                }
                console.log(Object.keys(connecteds));
                ws.send(JSON.stringify({ action: "access", status: true }))
                break;
            case "offer":
                let cfg = data.cfg
                console.log("offer to " + cfg.target);
                if (connecteds[cfg.target]) {
                    connecteds[cfg.target].send(msg)
                } else {
                    ws.send(JSON.stringify({ action: "offline", peer: cfg.target }))
                }
                break;
            case "answer":
                //console.log(data);
                //let answer = data.answer
                //let cfg = data.cfg
                console.log("answer " + data.cfg.target);
                if (connecteds[data.cfg.target]) {
                    connecteds[data.cfg.target].send(msg)
                }
                break;
            default:
                console.error("Unknow action");
                break;
        }
    });
});

app.listen(3456);