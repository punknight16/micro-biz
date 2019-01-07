var assert = require('assert');
var listEngagementsInteractor = require('../../_scripts/list-engagements-interactor');

var engagements_data = [
	{engagement_id:'e1', date: 'test', parent_id: '--', cred_id: 'c0', form_id:'login-form-v1.2' },
	{engagement_id:'e2', date: 'test', parent_id: 'e1', cred_id: 'c1', form_id:'list-access-form-v1.2' },
	{engagement_id:'e3', date: 'test', parent_id: 'e2', cred_id: 'c2', form_id:'add-access-form-v1.2' },
	{engagement_id:'e4', date: 'test', parent_id: 'e3', cred_id: 'c2', form_id:'list-sales-form-v1.2' }
];

describe('listSalesInteractor', function(){
	it('should list all engagements from the engagements_data that meets the cred_id constraint', function(done){
		var data = {engagements_data: engagements_data};
		var config = {};
		var args = {
			cred_id: 'r0'
		};
		var ext = {
		//functions
		};
		listEngagementsInteractor(data, config, args, ext, function(err, engagements_arr){
			assert(engagements_arr.length==4);
			done();
		});
	});
	it('should list 1 engagement from the engagements_data that meets the cred_id constraint', function(done){
		var data = {engagements_data: engagements_data};
		var config = {};
		var args = {
			cred_id: 'c1'
		};
		var ext = {
		//functions
		};
		listEngagementsInteractor(data, config, args, ext, function(err, engagements_arr){
			assert(engagements_arr.length==1);
			done();
		});
	});
});