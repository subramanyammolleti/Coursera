var express = require('express'); 
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(cookieParser('12345-67890-09876-54321')); //Secret Key

function auth(req, res, next){
	console.log(req.headers);

console.log('Signed cookie: '+req.signedCookies.user);


	if(!req.signedCookies.user){
		var authHeader = req.headers.authorization;
		console.log('AuthHeader: '+authHeader);
	if(!authHeader){
		var err = new Error('Your are not authenticated!');
		err.status = 401;
		next(err);
		return;
	}

	var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	if(user == 'admin' && pass == 'password'){
		res.cookie('user','admin',{signed: true});
		next(); // authorized
	} 
	else {
		var err = new Error('Your are not authenticated!');
		err.status = 401;
		next(err);
	}

	}

	 else {
        if (req.signedCookies.user === 'admin') {
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }



};
app.use(auth);	
app.use(express.static(__dirname + '/public'));

app.use(function(err, req, res, next){

	res.writeHead(err.status || 500 , {
		'WWW-Authenticate': 'Basic',
		'Content-type': 'text/plain'
	});

	res.end(err.message);

});

app.listen(port, hostname, function(){
	console.log(`Server has just started at http://${hostname}:${port}/`);
});