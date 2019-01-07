function listSalesInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var sales_data = data.sales_data;
	if(args.universal_id=='r0') return cb(null, sales_data);
	var result_arr1 = sales_data.filter((item)=>{
		return (item.cred_id==args.universal_id);
	});
	var result_arr2 = sales_data.filter((item)=>{
		return (item.organization_id==args.universal_id);
	});
	var sales_arr = result_arr2.concat(result_arr1);
	return cb(null, sales_arr);
}

module.exports = listSalesInteractor;