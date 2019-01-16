function listMetricsInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var metrics_data = data.metrics_data;
	if(args.cred_id=='r0') return cb(null, metrics_data);
	var metrics_arr = metrics_data.filter((item)=>{
		return (item.cred_id==args.cred_id);
	})
	return cb(null, metrics_arr);
}

module.exports = listMetricsInteractor;