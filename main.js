var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var port = (process.env.PORT || 4000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('V1.0.2' + process.env.version);
});

app.post('/webhook', function (req, res) {
    var text = req.body.events[0].message.text;
    var type = req.body.events[0].message.type;
    var sender = req.body.events[0].source.userId;
    var replyToken = req.body.events[0].replyToken;
    console.log(text, sender, replyToken)
    console.log(typeof sender, typeof text)
    // console.log(req.body.events[0])
    if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
        sendText(sender, text, type)
    }
    res.sendStatus(200)
});

function sendText(sender, text, type) {
    let data = {
        to: sender,
        messages: [
            {
                type: 'text',
                text: 'test ' + type
            }
        ]
    }
    sendRequest(data);
}

function sendRequest(data) {
    request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.APIKEY
        },
        url: 'https://api.line.me/v2/bot/message/push',
        method: 'POST',
        body: data,
        json: true
    }, function (err, res, body) {
        if (err) console.log('error')
        if (res) console.log('success')
        if (body) console.log(body)
    })
}

app.listen(port, function () {
    console.log('run app at port : ', port);
});