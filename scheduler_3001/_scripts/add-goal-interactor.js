function addGoalInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the sale_id already exists
	
	var goal_id = 'x-test'+Math.random().toString(32);
	var goal_obj = {
		goal_id: goal_id,
		cred_id: args.cred_id,
		goal_name: args.goal_name,
		goal_description: args.goal_description,
		engagement_id: args.engagement_id
	};
	data.goals_data.push(goal_obj);
	return cb(null, goal_id);
};

module.exports = addGoalInteractor;