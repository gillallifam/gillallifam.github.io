var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
const users = {
    User1: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    User2: "481f6cc0511143ccdd7e2d1b1b94faf0a700a8b49cd13922a70b5ae28acaa8c5",
    User3: "481f6cc0511143ccdd7e2d1b1b94faf0a700a8b49cd13922a70b5ae28acaa8c5",
    Server1: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
}

const connecteds = {}

app.ws('/', function (ws, req) {
    ws.connName = req.query.userid
    //console.log(ws);
    //console.log(req.socket.remoteAddress);
    console.log(req.query);
    connecteds[req.query.userid] = ws
    if (req.query.target && connecteds[req.query.target]) {
        console.log("target connected");
        connecteds[req.query.target].send(JSON.stringify(
            { action: 'autorization', userid: req.query.userid, passhash: req.query.passhash }
        ))
    } else {
        if (req.query.target) {
            console.log("target offline");
            //connecteds[req.query.userid] = ws
            ws.send(JSON.stringify({ action: "offline", peer: req.query.target }))
            ws.close()
            ws.destroy()
            connecteds[req.query.userid] = null
        }
    }

    console.log(Object.keys(connecteds));

    ws.on('message', function (msg) {
        let data = JSON.parse(msg)
        switch (data.action) {
            case "autorization":
                console.log(data);
                if (data.status) {
                    console.log("offer connection");
                    connecteds[data.userid].send(JSON.stringify({ action: "access", status: true }))
                } else {
                    ws.send(JSON.stringify({ action: "access", status: false }))
                    ws.close()
                    ws.destroy()
                    connecteds[req.query.userid] = null
                }
                break
            /* case "activate":
                if (users[data.userid] && users[data.userid] === data.passhash) { 
                    connecteds[data.userid] = ws
                }
                console.log(Object.keys(connecteds));
                ws.send(JSON.stringify({ action: "access", status: true }))
                break; */
            case "offer":
                //console.log(data);
                let offer = data.offer
                console.log("offer to " + offer.target);
                if (connecteds[offer.target]) {
                    connecteds[offer.target].send(msg)
                } else {
                    ws.send(JSON.stringify({ action: "offline", peer: offer.target }))
                }
                break;
            case "answer":
                let answer = data.answer
                console.log("answer " + answer.target);
                if (connecteds[answer.target]) {
                    connecteds[answer.target].send(msg)
                }
                break;
            default:
                console.log(data);
                console.error("Unknow action");
                break;
        }
    });
});

app.listen(3456);