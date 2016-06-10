// started
// used to recieve http requests
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//simplified way to do http requests
var request = require('request');

// used to write to file system
var fs = require('fs');

//hardcoded client name into url for testing
var bitServerCaptchaReset = 'http://localhost:7990/rest/api/1.0/admin/users/captcha?name=client';
//url for REST Call
var url = 'http://localhost:7990/rest/api/1.0/admin/users/captcha?name=';
var adminName = 'overlord';
var adminPass = '96rNAowc4Zet';
var rootFolder = '/Computer\ Science\ OSU/BitBucket\ Shim/LogFile.txt';

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/resetCredentials', function(req, res) {
	console.log("I received a delete request!!!");
	request.delete(bitServerCaptchaReset, function optionalCallback(err, httpResponse, body) {res.json(httpResponse)}).auth(adminName, adminPass, true)
	{
		console.log("sent delete request");
	};
});

// Receives the POST request then passes the client to the person.
app.post('/resetCredentials', function(req, res) {
	console.log ("received POST");
	// make sure there is a client name
	if (req.body.username == null)
	{
		console.log("No client name provided");
	}
	else
	{
		var urlClient = url + req.body.username;
		console.log("the client connecting is: " + req.body.username);
		request.delete(urlClient, 
			function optionalCallback(err, httpResponse, body) 
				{res.json(httpResponse)}
		).auth(adminName, adminPass, true);
	}
});

//listens on port 3001 for a http requests
app.listen(3001);

//creates log file
fs.appendFile(rootFolder, "Log entered!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
console.log("Server running on port 3001");
