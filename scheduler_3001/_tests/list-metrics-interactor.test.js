var assert = require('assert');
var listMetricsInteractor = require('../_scripts/list-metrics-interactor');

var metrics_data = [
	{
		metric_id: 'x0',
		cred_id: 'c0',
		metric_name: 'entrepreneur',
		metric_description: 'make money off of an internet based company',
		engagement_id: 'e12'
	}
];

describe('listMetricsInteractor', function(){
	it('should list all metric_objs from metrics_data ', function(done){
		var data = {metrics_data: metrics_data};
		var config = {};
		var args = {
			cred_id: 'r0'
		};
		var ext = {};
		listMetricsInteractor(data, config, args, ext, function(err, metrics_arr){
			//console.log('goals_arr: ', JSON.stringify(goals_arr));
			assert(metrics_arr.length==1);
			done();
		});
	});
});