var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
const users = {
    User1: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    User2: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    User3: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    Server1: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    Server2: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
}

const connecteds = {}

app.ws('/public', function (ws, req) {
    console.log("public"); 
    console.log(req.query); 
    connecteds[req.query.userid] = ws
    if (req.query.target && connecteds[req.query.target]) {
        //console.log("target connected"); 
        //console.log(connecteds[req.query.target]);
        connecteds[req.query.target].send(JSON.stringify(
            { action: 'autorization', userid: req.query.userid, passhash: req.query.passhash, cliIp: req.socket.remoteAddress }
        ))
    } else {
        if (req.query.target) {
            //console.log("target offline");
            ws.send(JSON.stringify({ action: "offline", peer: req.query.target }))
            ws.close()
            ws.destroy()
            delete connecteds[req.query.userid]
        }
    }

    console.log(Object.keys(connecteds));

    ws.on('message', function (msg) {
        let data = JSON.parse(msg)
        switch (data.action) {
            case "autorization":
                //console.log(data);
                if (data.status) {
                    connecteds[data.userid].send(JSON.stringify({ action: "access", status: true }))
                } else {
                    ws.send(JSON.stringify({ action: "access", status: false }))
                    ws.close()
                    connecteds[req.query.userid] = null
                }
                break
            case "offer":
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
                console.log("answer to " + answer.target);
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

app.ws('/private', function (ws, req) {
    console.log("private");
    console.log(req.query);

})

app.listen(3456);