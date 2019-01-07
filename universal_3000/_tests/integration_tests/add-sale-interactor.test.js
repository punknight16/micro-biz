var assert = require('assert');
var addSaleInteractor = require('../../_scripts/add-sale-interactor');

describe('addSaleInteractor', function(){
	it('should add salle to sales_data', function(done){
		var data = {sales_data: []};
		var config = {};
		var args = {
			cred_id: 'c_test',
			account_id: 'r_test',
			payment_amount: '$3.14'
		};
		var ext = {
		//functions
		};
		addSaleInteractor(data, config, args, ext, function(err, sale_id){
			assert(data.sales_data.length==1);
			assert(sale_id);
			done();
		});
	});
});