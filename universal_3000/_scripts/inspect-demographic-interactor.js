function inspectDemographicInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var demographic_data = data.demographic_data;
	if(args.cred_id=='r0') return cb(null, demographic_data);
	var demographic_obj = demographic_data.find((item)=>{
		return (item.cred_id==args.cred_id);
	});
	if(typeof demographic_obj == 'undefined'){
		return cb('demographic survey not found');
	} else {
		return cb(null, demographic_obj);	
	}
}

module.exports = inspectDemographicInteractor;