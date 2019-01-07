var assert = require('assert');
var addVentureInteractor = require('../../_scripts/add-venture-interactor');

describe('addVentureInteractor', function(){
	it('should venture_obj to ventures_data', function(done){
		var data = {ventures_data: []};
		var config = {engagement_id: 'e0'};
		var args = {
			cred_id: 'c0',
			venture_description: 'making a test for $30 ROI against 24-25 year olds',
			sales_search_arr: [
				{
					amount_min: '$1.00',
					amount_max: '$10.00',
					start_date: '2019-1-1', 
					end_date: '2019-1-7'
				}
			],
			engagements_search_arr: [
				{
					form_id: 'login-form-v1.2', 
					parent_form: '--', 
					start_date: '2019-1-1', 
					end_date: '2019-1-7'
				},
				{
					form_id: undefined, 
					parent_form: '', 
					start_date: '', 
					end_date: ''
				},
				{
					form_id: undefined, 
					parent_form: '', 
					start_date: '',
					end_date: ''
				},
				{
					form_id: undefined,
					parent_form: '',
					start_date: '',
					end_date: ''
				}
			],
			demographics_search_arr: [
				{
					search_key: 'age',
					search_values: [
						undefined, 
						undefined,
						'18-24', 
						'25-34',
						undefined, 
						undefined,
						undefined, 
						undefined,
						undefined
					]
				},
				{
					search_key: 'ethnicity',
					search_values: [
						undefined, 
						undefined,
						undefined,
						undefined,
						undefined,
						undefined
					]
				},
				{
					search_key: 'education',
					search_values: [
						undefined, 
						undefined,
						undefined, 
						undefined,
						undefined, 
						undefined,
						undefined, 
						undefined,
						undefined,
						undefined,
						undefined
					]
				},
				{
					search_key: 'marital_status',
					search_values: [
						undefined, 
						undefined,
						undefined, 
						undefined,
						undefined
					]
				},
				{
					search_key: 'employment_status',
					search_values: [
						undefined, 
						undefined,
						undefined, 
						undefined,
						undefined, 
						undefined,
						undefined, 
						undefined,
						undefined
					]
				}
			]
		};
		var ext = {};						
		addVentureInteractor(data, config, args, ext, function(err, venture_id){
			assert(data.ventures_data.length==1);
			console.log(JSON.stringify(data.ventures_data));
			assert(venture_id);
			done();
		});
	});
});