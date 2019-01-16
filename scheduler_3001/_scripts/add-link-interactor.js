function addLinkInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the sale_id already exists
	
	var link_id = 'w-test'+Math.random().toString(32);
	var link_obj = {
		link_id: link_id,
		cred_id: args.cred_id,
		goal_id: args.goal_id,
		task_id: args.task_id,
		metric_id: args.metric_id,
		engagement_id: args.engagement_id
	};
	data.metrics_data.push(metric_obj);
	return cb(null, metric_id);
};

module.exports = addLinkInteractor;