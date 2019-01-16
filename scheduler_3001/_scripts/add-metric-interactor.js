function addMetricInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the sale_id already exists
	
	var metric_id = 'z-test'+Math.random().toString(32);
	var metric_obj = {
		metric_id: metric_id,
		cred_id: args.cred_id,
		metric_name: args.metric_name,
		metric_description: args.metric_description,
		engagement_id: args.engagement_id
	};
	data.metrics_data.push(metric_obj);
	return cb(null, metric_id);
};

module.exports = addMetricInteractor;