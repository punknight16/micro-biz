function listAccessInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var authorization_data = data.authorization_data;
	if(args.universal_id=='r0') return cb(null, authorization_data);
	var permissions_arr = authorization_data.filter((item)=>{
		return (item.cred_id==args.universal_id);
	});
	return cb(null, permissions_arr);
}

module.exports = listAccessInteractor;