//input id가 send인 타입이 submit인 버튼을 클릭하면
//디비에 저장되도록 하는 자바스크립트 파일 만들어야 될거같다.
//아니면 more_evaluation.ejs에서 
//<form method="post" action="/eval_log">이렇게 해줘서
//별도로 필요없을까?

var fs = require('fs');
var http = require('http');
var express = require('express');
var ejs = require('ejs');
var mysql = require('mysql');
var client = mysql.createConnection({ //수정요
	user: 'root',
	password: '',
	'database': 'movies'
});

var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();


// router.get('/evaluate', function (request, response, next) {
// 	response.render('more_evaluation');
// });
router.post('/', function (request, response, next) {
	console.log("ddd");
	var comment = request.param('comment');//파라미터를 받은 후 웹에 보여줌. <textarea id="comment" rows="50" cols="70" name=""></textarea> 이 부
	console.log('comment is : ', comment);

	var statement = 'INSERT INTO log (comment) VALUES("'+comment+'");'; //수정요 
	console.log('statement:'+statement);
	client.query(statement, function (error, result, fields) {
		if (result) {
			console.log('result:'+result);
		}
		//response.cookie('logined', true);//수정요
		response.redirect('/');
	
	});
});




module.exports = router;