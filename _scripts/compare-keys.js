function compareKeys(public_token, private_token, token_secret, cb){
	console.log('public_token: ', public_token);
	console.log('private_token: ', private_token);
	console.log('token_secret: ', token_secret);
	if(typeof public_token == 'undefined' ||
		typeof private_token == 'undefined' ||
		typeof token_secret == 'undefined') return cb('bad paramaters for compare keys');

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

module.exports = compareKeys;