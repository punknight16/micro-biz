function authorizeRequest(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters for auth req');
	
	requestPrivateKey(config.token_arr, args.token_id, function(err, token_obj){
		if(err) return cb(err);
		
		comparePermission(data.authorization_data, token_obj.cred_id, args.resource_id, args.universal_id, function(err, permission_boo){
			if(err) return cb(err);
			if(!permission_boo) return cb('permission not found');
			
			compareKeys(args.public_token, token_obj.private_token, config.token_secret, function(err, sign_boo){			
				if(err) return cb(err);
				return cb(null, token_obj.cred_id);
			});	
		});	
	})
}

function requestPrivateKey(token_arr, token_id, cb){
	if(typeof token_arr == 'undefined' ||
		typeof token_id == 'undefined') return cb('bad paramaters for req priv key');
	var token_obj = token_arr.find((item)=>{
		return (item.token_id === token_id)
	});
	if(typeof token_obj=='undefined'){
		return cb('token not found');
	} else {
		return cb(null, token_obj);
	}
}

function comparePermission(authorization_data, cred_id, resource_id, universal_id, cb){
	if(typeof authorization_data == 'undefined' ||
		typeof cred_id == 'undefined' ||
		typeof resource_id == 'undefined' ||
		typeof universal_id == 'undefined') return cb('bad paramaters for compare permission');
	var root_permission_index = authorization_data.findIndex((item)=>{
			return (
				item.cred_id === cred_id && 
				item.resource_id === resource_id && 
				item.universal_id === 'r0'
			);	
	});
	
	if(root_permission_index>=0){
		return cb(null, true);
	}
	
	var permission_obj = authorization_data.find((item)=>{
		
		return (
			item.cred_id === cred_id && 
			item.resource_id === resource_id && 
			item.universal_id === universal_id 
		);
	});
	
	if(typeof permission_obj=='undefined'){
		return cb('permission not found');
	} 
	
	return cb(null, true);
}

function compareKeys(public_token, private_token, token_secret, cb){
	if(typeof public_token == 'undefined' ||
		typeof private_token == 'undefined' ||
		typeof token_secret == 'undefined') return cb('bad paramaters for compare permission');

	var boo = false;
	switch(public_token){
		case 'k0':
			if(private_token=='l0') boo = true;
			break;
		case 'k1':
			if(private_token=='l1') boo = true;
			break;
		case 'k2':
			if(private_token=='l2') boo = true;
			break;
	}
	return cb(null, boo);
}

module.exports = authorizeRequest;