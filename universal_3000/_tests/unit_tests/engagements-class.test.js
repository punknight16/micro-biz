var assert = require('assert');
var searchEngagementsInteractor = require('../../_scripts/search-engagements-interactor.js');

var engagements_data = [
	{engagement_id:'e1', date: '2013-08-02T10:09:08Z', parent_id: '--', cred_id: 'c2', form_id:'login-form-v1.2' },
	{engagement_id:'e2', date: '2013-08-02T10:10:08Z', parent_id: 'e1', cred_id: 'c2', form_id:'permissions-list-form-v1.2' },
	{engagement_id:'e3', date: '2013-08-02T10:11:08Z', parent_id: 'e2', cred_id: 'c2', form_id:'permissions-add-form-v1.2' },
	{engagement_id:'e4', date: '2013-08-02T10:20:08Z', parent_id: 'e3', cred_id: 'c2', form_id:'sales-add-form-v1.2' }
];

describe('searchEngagementsInteractor', function(){
	it('should return the number of results that meet the constraints', function(done){
		var data = {engagements_data: engagements_data};
		var config = {};
		var args = {
			start_date: '2013-08-01T10:09:08Z', 
			end_date: '2013-08-03T10:09:08Z',
			engagements_search_arr: [
				{form_id: 'sales-add-form-v1.2', parent_form_id: 'permissions-add-form-v1.2'},
				{form_id: 'permissions-add-form-v1.2', parent_form_id: 'permissions-list-form-v1.2'},
				{form_id: 'permissions-list-form-v1.2', parent_form_id: 'login-form-v1.2'},
				{form_id: 'login-form-v1.2', parent_form_id: '--'},
			]
			
		}
		var ext = {};
		searchEngagementsInteractor(data, config, args, ext, function(err, num_results){
			console.log(num_results);
			assert(num_results===1);
			done();
		});
	});
});

/*
describe('getEngagementFormIdById', function(){
		it('should return str: form_id  given an engagemnet_id', function(){
			var engagement_id = 'e1';
			var form_id = getEngagementFormIdById(engagements_data, engagement_id);
			assert(form_id);
		});
	});
	describe('filterEngagementsByFormIdAndParentFormId', function(){
		it('should return an engagements_arr given two form_ids', function(done){
			var form_id='permissions-list-form-v1.2';
			var parent_form_id = 'login-form-v1.2';
			filterEngagementsByFormIdAndParentFormId(engagements_data, form_id, parent_form_id, function(err, arr){
				assert(arr.length>0);
				done();
			});
		});
	});
	*/