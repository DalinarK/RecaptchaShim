// started
// used to recieve http requests
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//simplified way to do http requests
var request = require('request');

var bitServerCaptchaReset = 'http://localhost:7990/rest/api/1.0/admin/users/captcha?name=client';
var adminName = 'overlord';
var adminPass = '96rNAowc4Zet';

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/resetCredentials', function(req, res) {
	console.log("I received a delete request!!!");


	request.delete(bitServerCaptchaReset, function optionalCallback(err, httpResponse, body) {console.log(body)}).auth(adminName, adminPass, true)
	{
		console.log("sent delete request");
	};

});


// request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//     return console.error('upload failed:', err);
//   }
//   console.log('Upload successful!  Server responded with:', body);

//listens on port 3001 for a http requests
app.listen(3001);
console.log("Server running on port 3001");
