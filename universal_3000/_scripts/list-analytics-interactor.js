function listAnalyticsInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var analytics_data = data.analytics_data;
	if(args.cred_id=='r0') return cb(null, analytics_data);
	var analytics_arr = analytics_data.filter((item)=>{
		return (item.cred_id==args.cred_id);
	})
	return cb(null, analytics_arr);
}

module.exports = listAnalyticsInteractor;