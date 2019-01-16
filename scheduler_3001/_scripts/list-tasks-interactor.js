function listTasksInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var tasks_data = data.tasks_data;
	if(args.cred_id=='r0') return cb(null, tasks_data);
	var tasks_arr = tasks_data.filter((item)=>{
		return (item.cred_id==args.cred_id);
	})
	return cb(null, tasks_arr);
}

module.exports = listTasksInteractor;