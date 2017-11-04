"use strict"
let express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 8081));

app.listen(app.get('port'), function() {
    console.log("Приложение запущено на localhost:" + app.get('port'))
});

let result = new Array;
let obj;
let stringFindObject;
let output = new Array;
let bodyString = '';

let fin = {
	vendor: "",
	model: "",
	version: ""
}

app.post('/api', function(req, res) {
    
    obj = Object.assign({}, req.headers);
    bodyString = JSON.stringify(req.body);

	if (titleCheck(bodyString)) {
	    for(let i in obj) {
	    	result.push(obj[i]);
	    }
		searchString(result);
	}

    res.status(200).send(req.headers);
});	

const searchString = function(expressions) {
	let strMatch = /(?=.*?(tp-link))/i;
    let len = expressions.length, i = 0;
    let myRe = /(?=.*?(tp-link)\s(.*[a-zA-Z0-9-])\s(.*[a-zA-Z0-9-]))/i;
    
    for (; i < len; i++) {
        if (expressions[i].match(strMatch) !== null) {
        	stringFindObject = Object.assign({}, expressions[i].match(myRe));
        	fin.vendor  	 = stringFindObject[1];
        	fin.model   	 = stringFindObject[2];
        	fin.version 	 = stringFindObject[3];
        	consol(fin);
        } else {
        	consol(`Out of case`);
        }
    }
    return false;
};

const titleCheck = function (bodyString) {
	let regex = /<title>(.*?)<\/title>/gi; 
	let log, result;
	let isTrue = false;
	if(regex.test(bodyString)) {
	  let matches = bodyString.match(regex);
	  for(let match in matches) {
	    log = matches[match];
		result = log.match(/<title>(.*?)<\/title>/gi).map(function(val){
		   if(val.replace(/<\/?title>/gi,'').toLowerCase() === "login page"){
		   	isTrue = true;
		   }
		});
	  }
	  return isTrue;
	} 
}

const consol = (arg) => {console.log(arg)}
