function forwardRequest(token_id, public_token, resource_id, universal_id, http, cb){
	var body = JSON.stringify({
		token_id: token_id,
		public_token: public_token,
		resource_id: resource_id,
		universal_id: universal_id
	});
	var request = new http.ClientRequest({
    hostname: "localhost",
    port: 3000,
    path: "/sign/submit",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body)
    }
	});
	//send the request
	request.end(body);
	//wait for a response
	request.on('response', function (response) {
	  //console.log('STATUS: ' + response.statusCode);
	  //console.log('HEADERS: ' + JSON.stringify(response.headers));
	  var res_str = ''
	  response.setEncoding('utf8');
	  response.on('data', function (chunk) {
	    res_str+= chunk;
	  });
	  response.on('end', function(){
	  	try {
	  		console.log('res_str: ', res_str);
	    	res_obj = JSON.parse(res_str);
				return cb(null, res_obj);
	    } catch (e) {
	        return cb(e)
	    }
	  })
	});
}

module.exports = forwardRequest;