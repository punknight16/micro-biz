var assert = require('assert');
var listSalesInteractor = require('../../_scripts/list-sales-interactor');

describe('listSalesInteractor', function(){
	it('should list all sales from the sales_data that meets the universal_id constraint', function(done){
		var data = {sales_data: [
			{sale_id:'s1', cred_id: 'c1', account_id:'a1', payment_amount:"$2.00" },
			{sale_id:'s2', cred_id: 'c2', account_id:'a1', payment_amount:"$2.00" },
			{sale_id:'s3', cred_id: 'c2', account_id:'a1', payment_amount:"$2.00" },
			{sale_id:'s4', cred_id: 'c2', account_id:'a1', payment_amount:"$2.00" }
		]};
		var config = {};
		var args = {
			universal_id: 'r0'
		};
		var ext = {
		//functions
		};
		listSalesInteractor(data, config, args, ext, function(err, sales_arr){
			assert(sales_arr.length==4);
			done();
		});
	});
	it('should list all sales from the sales_data that meets the universal_id constraint', function(done){
		var data = {sales_data: [
			{sale_id:'s1', cred_id: 'c1', account_id:'a1', payment_amount:"$2.00" },
			{sale_id:'s2', cred_id: 'c2', account_id:'a1', payment_amount:"$2.00" },
			{sale_id:'s3', cred_id: 'c2', account_id:'a1', payment_amount:"$2.00" },
			{sale_id:'s4', cred_id: 'c2', account_id:'a1', payment_amount:"$2.00" }
		]};
		var config = {};
		var args = {
			universal_id: 'c1'
		};
		var ext = {
		//functions
		};
		listSalesInteractor(data, config, args, ext, function(err, sales_arr){
			assert(sales_arr.length==1);
			done();
		});
	});
});