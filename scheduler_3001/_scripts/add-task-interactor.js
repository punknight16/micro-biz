function addTaskInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the sale_id already exists
	
	var task_id = 'y-test'+Math.random().toString(32);
	var task_obj = {
		task_id: task_id,
		goal_id: args.goal_id,
		cred_id: args.cred_id,
		task_name: args.task_name,
		task_description: args.task_description,
		engagement_id: args.engagement_id
	};
	data.tasks_data.push(task_obj);
	return cb(null, task_id);
};

module.exports = addTaskInteractor;