function addGroupInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the sale_id already exists
	
	var group_id = 'g-test'+Math.random().toString(32);
	var group_obj = {
		group_id: group_id,
		cred_id: args.cred_id,
		organization_id: args.organization_id,
		group_title: args.group_title,
		engagement_id: config.engagement_id
	};
	data.groups_data.push(group_obj);
	return cb(null, group_id);
};

module.exports = addGroupInteractor;