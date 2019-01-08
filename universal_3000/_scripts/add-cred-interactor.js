function addCredInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the email already exists
	
	var email_index = data.authentication_data.findIndex((item)=>{
		return (args.email == item.email)
	});
	
	if(email_index < 0 && typeof email_index !== 'undefined'){
		var cred_id = 'c-test'+Math.random().toString(32);
		encryptPassword(args.password, config.pass_secret, ext.crypto, function(err, hash){
			var cred_obj = {
				cred_id: cred_id,
				email: args.email,
				hash: hash
			};
			data.authentication_data.push(cred_obj);
			return cb(null, cred_id);
		});
	} else {
		
		return cb('that email has already registered!');
	}
};

module.exports = addCredInteractor;

function encryptPassword(password, pass_secret, crypto, cb){
	const hash = crypto.createHmac('sha256', pass_secret)
   .update(password)
   .digest('hex');
	return cb(null, hash);
}