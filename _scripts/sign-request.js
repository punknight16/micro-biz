function signRequest(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters for auth req');
	ext.forwardRequest(args.token_id, args.public_token, args.resource_id, args.universal_id, ext.http, function(err, res_obj){
		console.log('err_forward_request: ', err);
		console.log('res_obj at forward request: ', res_obj);
		if(err) return cb(err);
		ext.compareKeys(args.public_token, res_obj.private_token, config.token_secret, function(err, sign_boo){			
			console.log('err_compare_key: ', err);
			if(err) return cb(err);
			return cb(null, res_obj);
		});	
	});
}

module.exports = signRequest;