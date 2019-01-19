var mu = require("mu2-updated"); //mustache template engine
var http = require('http');

var authorization_data = [
	{"cred_id":"c0","resource_id":"r1","universal_id":"r0"},
	{"cred_id":"c1","resource_id":"r1","universal_id":"c1"}
];
var universal_data = [
	{"universal_id": "c0", "universal_name": "punknight"},
	{"universal_id": "c1", "universal_name": "lopmiller"},
	{"universal_id": "r0", "universal_name": "root access"},
	{"universal_id": "r1", "universal_name": "/permissions/list"}
];

var server = http.createServer(function(req, res){
	swapIdForName(universal_data, authorization_data, function(err, data){
		changeUniversalNameToAccessType(data, function(err, access_data){
			var stream = mu.compileAndRender("index.html", {Objects: access_data});
			stream.pipe(res);	
		});
	});
}).listen(3002, function(){
	console.log('templater up and running on 3002')
});

function swapIdForName(universal_data, args_data, cb){
	var swapped_data = args_data.map((obj)=>{
		var swapped_obj = {}
		for (var prop in obj) {
			var uni_obj = universal_data.find((item)=>{
				return (item.universal_id == obj[prop])
			})
		  swapped_obj[prop] = uni_obj.universal_name;
		}
		return swapped_obj;
	});
	return cb(null, swapped_data);
}

function changeUniversalNameToAccessType(data, cb){
	var changed_data = data.map((obj)=>{
		if(obj.cred_id == obj.universal_id){
			obj.universal_id = 'user access';
		}
		return obj;
	});
	return cb(null, changed_data);
}