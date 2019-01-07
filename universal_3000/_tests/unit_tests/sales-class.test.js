var assert = require('assert');
var searchSalesInteractor = require('../../_scripts/search-sales-interactor.js');

var sales_data = [
	{sale_id:'s1', date: '2013-08-02T10:09:08Z', engagement_id: 'e1', cred_id: 'c1', organization_id:'o1', payment_amount:"$2.00" },
	{sale_id:'s2', date: '2013-08-02T10:09:08Z', engagement_id: 'e2', cred_id: 'c2', organization_id:'o1', payment_amount:"$2.00" },
	{sale_id:'s3', date: '2013-08-02T10:09:08Z', engagement_id: 'e3', cred_id: 'c2', organization_id:'o1', payment_amount:"$2.00" },
	{sale_id:'s4', date: '2013-08-02T10:09:08Z', engagement_id: 'e4', cred_id: 'c2', organization_id:'o1', payment_amount:"$2.00" }
];

describe('searchSalesInteractor', function(){
	it('should return the number of results that meet the constraints', function(done){
		var data = {sales_data: sales_data};
		var config = {};
		var args = {
			start_date: '2013-08-01T10:09:08Z', 
			end_date: '2013-08-03T10:09:08Z'
		}
		var ext = {};
		searchSalesInteractor(data, config, args, ext, function(err, num_results){
			console.log(num_results);
			assert(num_results==="$8.00");
			done();
		});
	});
});
