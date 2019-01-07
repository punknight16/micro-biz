function addAccessInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the permission already exists
	//need to add check if the universal_id already exists;
	var permission_id = 'p-test'+Math.random().toString(32);
	var permission_obj = {
		permission_id: permission_id,
		cred_id: args.cred_id,
		resource_id: args.resource_id,
		universal_id: args.universal_id,
		engagement_id: args.engagement_id
	};
	data.authorization_data.push(permission_obj);
	return cb(null, permission_id);
};

module.exports = addAccessInteractor;