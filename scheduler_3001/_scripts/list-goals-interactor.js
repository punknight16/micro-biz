function listGoalsInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var goals_data = data.goals_data;
	if(args.cred_id=='r0') return cb(null, goals_data);
	var goals_arr = goals_data.filter((item)=>{
		return (item.cred_id==args.cred_id);
	})
	return cb(null, goals_arr);
}

module.exports = listGoalsInteractor;