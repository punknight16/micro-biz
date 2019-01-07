function listEngagementsInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var engagements_data = data.engagements_data;
	if(args.cred_id=='r0') return cb(null, engagements_data);
	var engagements_arr = engagements_data.filter((item)=>{
		return (item.cred_id==args.cred_id);
	});
	return cb(null, engagements_arr);
}

module.exports = listEngagementsInteractor;