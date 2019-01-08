function addOrganizationInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the sale_id already exists
	
	var organization_id = 'o-test'+Math.random().toString(32);
	var organization_obj = {
		organization_id: args.organization_id,
		engagement_id: config.engagement_id
	};
	data.organizations_data.push(organization_obj);
	return cb(null, organization_id);
};

module.exports = addOrganizationInteractor;