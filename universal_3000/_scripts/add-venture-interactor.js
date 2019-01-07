function addVentureInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the sale_id already exists

	var sales_search_arr = args.sales_search_arr.filter((item)=>{
		return (
			item.amount_min != null &&
			item.amount_max != null &&
			(item.amount_max != '' || item.amount_min != '') &&
			item.start_date != null &&
			item.end_date != null
		);
	});
	var engagements_search_arr = args.engagements_search_arr.filter((item)=>{
		return (
			item.form_id != null &&
			item.form_id != 'empty' &&
			item.parent_form != null &&
			item.start_date != null &&
			item.end_date != null
		);
	});
	var demographics_search_arr = args.demographics_search_arr.filter((item)=>{
		var search_values = item.search_values.filter((param)=>{
			return (param != null)
		});
		item.search_values = search_values;
		return (
			item.search_key != null &&
			search_values.length != 0
		);
	});
	var venture_id = 'v-test'+Math.random().toString(32);
	var venture_obj = {
		venture_id: venture_id,
		cred_id: args.cred_id,
		venture_description: args.venture_description,
		sales_search_arr: sales_search_arr,
		engagements_search_arr: engagements_search_arr,
		demographics_search_arr: demographics_search_arr,
		engagement_id: config.engagement_id
	};
	data.ventures_data.push(venture_obj);
	return cb(null, venture_id);
};

module.exports = addVentureInteractor;