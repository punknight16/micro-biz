function listLinksInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var links_data = data.links_data;
	if(args.cred_id=='r0') return cb(null, links_data);
	var links_arr = links_data.filter((item)=>{
		return (item.cred_id==args.cred_id);
	})
	return cb(null, links_arr);
}

module.exports = listLinksInteractor;