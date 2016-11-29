var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// DEFINE MODEL
var Book = require("./models/book");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//view 파일 경로 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var port = process.env.PORT || 8080;

var router = require('./routes')(app, Book);

var server = app.listen(port, function(){
	console.log("Express server has started on port" + port);
});

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
	console.log("Connected to mongod server");
});



mongoose.connect('mongodb://localhost/mongodb_tutorial');