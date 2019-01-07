var assert = require('assert');
var listVenturesInteractor = require('../../_scripts/list-ventures-interactor');
var ventures_data = [
	{
		venture_id: 'v0',
		cred_id: 'c0',
		venture_description: 'post article1 to FB for $50 ROI through add-sale-form-v1.2 of early adopter users 18-35',
		demographic_search_arr: [
			{search_key: 'age', search_values: ['18-24', '25-34']}
		],
		engagement_search_arr: [
			{form_id: 'login-form-v1.2', parent_form: '--', after: '2019-1-1', before: '2019-1-7'},
			{form_id: 'access-list-form-v1.2', parent_form: 'login-form-v1.2', after: '2019-1-1', before: '2019-1-7'},
			{form_id: 'sale-add-form-v1.2', parent_form: 'access-list-form-v1.2', after: '2019-1-1', before: '2019-1-7'}
		],
		sale_search_arr: [
			{amount_min: '$0.01', amount_max: '$10.00', after: '2019-1-1', before: '2019-1-7'}
		]
	},
	{
		venture_id: 'v1',
		cred_id: 'c1',
		venture_description: 'post article2 to FB for $100 ROI through add-sale-form-v1.2 of early adopter users 18-35',
		demographic_search_arr: [
			{search_key: 'age', search_values: ['18-24', '25-34']}
		],
		engagement_search_arr: [
			{form_id: 'login-form-v1.2', parent_form: '--', after: '2019-1-1', before: '2019-1-7'},
			{form_id: 'access-list-form-v1.2', parent_form: 'login-form-v1.2', after: '2019-1-1', before: '2019-1-7'},
			{form_id: 'sale-add-form-v1.2', parent_form: 'access-list-form-v1.2', after: '2019-1-1', before: '2019-1-7'}
		],
		sale_search_arr: [
			{amount_min: '$0.01', amount_max: '$10.00', after: '2019-1-1', before: '2019-1-7'}
		]
	}
];


describe('listVenturesInteractor', function(){
	it('should list all ventures from the ventures_data', function(done){
		var data = {ventures_data: ventures_data};
		var config = {};
		var args = {
			cred_id: 'r0'
		};
		var ext = {};
		listVenturesInteractor(data, config, args, ext, function(err, ventures_arr){
			assert(ventures_arr.length==2);
			done();
		});
	});
	it('should list all ventures from ventures_data that meets the cred_id constraint', function(done){
		var data = {ventures_data: ventures_data};
		var config = {};
		var args = {
			cred_id: 'c1'
		};
		var ext = {
		//functions
		};
		listVenturesInteractor(data, config, args, ext, function(err, sales_arr){
			assert(sales_arr.length==1);
			done();
		});
	});
});