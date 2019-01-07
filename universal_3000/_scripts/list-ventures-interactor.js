function listVenturesInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var ventures_data = data.ventures_data;
	if(args.cred_id=='r0') return cb(null, ventures_data);
	var ventures_arr = ventures_data.filter((item)=>{
		return (item.cred_id==args.cred_id);
	})
	return cb(null, ventures_arr);
}

module.exports = listVenturesInteractor;