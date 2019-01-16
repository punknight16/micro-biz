var assert = require('assert');
var listMarketInteractor = require('../../_scripts/list-analytics-interactor');

var analytics_data = [
	{
		market_id: 'm0',
		cred_id: 'c0',
		venture_id: 'v0',
		start_date: '2019-1-1',
		end_date: '2019-1-7',
		demographics_total: '20',
		engagements_total: '30',
		sales_total: '$300.00'
	}
];

describe('listMarketInteractor', function(){
	it('should list all market_objs from market_data ', function(done){
		var data = {analytics_data: analytics_data};
		var config = {engagement_id: 'e0'};
		var args = {
			cred_id: 'r0'
		};
		var ext = {};
		listMarketInteractor(data, config, args, ext, function(err, market_arr){
			assert(market_arr.length==1);
			done();
		});
	});
});