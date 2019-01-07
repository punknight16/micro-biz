function trackEngagement(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the engagement_id already exists
	//
	//pull the parent_id from the last_engagement_arr
	var parent_engagement_index = config.last_engagement_arr.findIndex((item)=>{
		return (item.cred_id==args.cred_id)
	});
	var parent_id;
	if(parent_engagement_index>=0){
		parent_id = config.last_engagement_arr[parent_engagement_index].engagement_id;
	} else {
		parent_id = '--';
		parent_engagement_index = config.last_engagement_arr.length;
	}
	//create the engagement_obj
	var engagement_id = 'e-test'+Math.random().toString(32);
	var engagement_obj = {
		engagement_id: engagement_id,
		parent_id: parent_id,
		cred_id: args.cred_id,
		date: new Date().toISOString(),
		form_id: args.form_id
	};
	data.engagements_data.push(engagement_obj);
	//reset the last_engagement_arr;
	var last_engagement_obj = {cred_id: args.cred_id, engagement_id: engagement_id};
	config.last_engagement_arr[parent_engagement_index] = last_engagement_obj
	return cb(null, engagement_id);
}

module.exports = trackEngagement;