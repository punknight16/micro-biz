function loginInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//pull authentication_data from data
	//compare
	//generateToken
	//store it in a token_arr
	var token_obj = {};
	switch(args.email){
		case 'u0%40mail.com':
			if(args.password=='123'){
				token_obj = {
					cred_id: 'c0',
					token_id: 't0',
					public_token: 'k0',
					private_token: 'l0'
				};
			}
			break;
		case 'u1%40mail.com':
			if(args.password=='123'){
				token_obj = {
					cred_id: 'c1',
					token_id: 't1',
					public_token: 'k1',
					private_token: 'l1'
				};
			}
			break;
		case 'u2%40mail.com':
			if(args.password=='123'){
				token_obj = {
					cred_id: 'c2',
					token_id: 't2',
					public_token: 'k2',
					private_token: 'l2'
				};
			}
			break;
		default: 
			return cb('This is just an alpha test. We will add your login soon!');
	}
	
	config.token_arr.push(token_obj);
	return cb(null, token_obj);
}

module.exports = loginInteractor;