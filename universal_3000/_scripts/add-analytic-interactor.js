function addAnalyticInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	var venture_obj = ext.getVenture(data.ventures_data, args.venture_id);
	args.start_date = venture_obj.start_date;
	args.end_date = venture_obj.end_date;
	args.engagements_search_arr = venture_obj.engagements_search_arr;

	var cred_ids = ext.searchDemographicsInteractor(data.demographic_data, venture_obj.demographics_search_arr);
	var engagements_arr = ext.getEngagements(data.engagements_data, cred_ids);
	var sales_arr = ext.getSales(data.sales_data, cred_ids);

	ext.searchEngagementsInteractor(data, config, args, ext, function(err, engagements_total){
		ext.searchSalesInteractor({sales_data: sales_arr}, config, args, ext, function(err, sales_total){
			var analytic_id = 'a-test'+Math.random().toString(32);
			var analytic_obj = {
				analytic_id: analytic_id,
				cred_id: args.cred_id,
				venture_id: args.venture_id,
				demographics_total: cred_ids.length,
				engagements_total: engagements_total,
				sales_total: sales_total,
				engagement_id: config.engagement_id
			};
			data.analytics_data.push(analytic_obj);
			return cb(null, analytic_id);
		})
	});
}

module.exports = addAnalyticInteractor;