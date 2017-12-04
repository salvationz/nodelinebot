var express = require('express');
var bodyParser = require ('body-parser');

var app = express();
var port = (process.env.PORT || 4000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('Hello');
});

app.listen(port, function(){
    console.log('run app at port : ', port);
});