function addDemographicInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');

	var demographic_id = 'd-test'+Math.random().toString(32);
	var demographic_obj = {
		demographic_id: demographic_id,
		cred_id: args.cred_id,
		age: args.age,
		ethnicity: args.ethnicity,
		education: args.education,
		marital_status: args.marital_status,
		employment_status: args.employment_status,
		engagement_id: args.engagement_id
	};
	
			
	data.demographic_data.push(demographic_obj);
	return cb(null, demographic_id);
};

module.exports = addDemographicInteractor;