'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 4000;
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.get('/webhook', function (req, res) {
    var text = req.body.events[0].message.text;
    var sender = req.body.events[0].source.userId;
    var replyToken = req.body.events[0].replyToken;
    console.log(text, sender, replyToken);
    console.log(typeof sender === 'undefined' ? 'undefined' : _typeof(sender), typeof text === 'undefined' ? 'undefined' : _typeof(text));
    // console.log(req.body.events[0])
    if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
        sendText(sender, text);
    }
    res.sendStatus(200);
});

function sendText(sender, text) {
    var data = {
        to: sender,
        messages: [{
            type: 'text',
            text: 'test'
        }]
    };
    (0, _request2.default)({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer key Api'
        },
        url: 'https://api.line.me/v2/bot/message/push',
        method: 'POST',
        body: data,
        json: true
    }, function (err, res, body) {
        if (err) console.log('error');
        if (res) console.log('success');
        if (body) console.log(body);
    });
}

app.listen(port, function () {
    console.log('run app at port : ', port);
});