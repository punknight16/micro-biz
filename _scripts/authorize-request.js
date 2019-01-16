function authorizeRequest(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters for auth req');
	var compareKeys = ext.compareKeys;
	requestPrivateKey(config.token_arr, args.token_id, function(err, token_obj){
		if(err) return cb(err);
		
		comparePermission(data.authorization_data, token_obj.cred_id, args.resource_id, args.universal_id, function(err, permission_boo){
			if(err) return cb(err);
			if(!permission_boo) return cb('permission not found');
			
			compareKeys(args.public_token, token_obj.private_token, config.token_secret, function(err, sign_boo){			
				if(err) return cb(err);
				return cb(null, token_obj);
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
	console.log('authorization_data: ', authorization_data);
	console.log('cred_id: ', cred_id);
	console.log('resource_id: ', resource_id);
	console.log('universal_id: ', universal_id);
	
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

module.exports = authorizeRequest;