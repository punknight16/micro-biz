var assert = require('assert');
var addAnalyticInteractor = require('../../_scripts/add-analytic-interactor');
var searchEngagementsInteractor = require('../../_scripts/search-engagements-interactor');
var searchSalesInteractor = require('../../_scripts/search-sales-interactor');
var searchDemographicsInteractor = require('../../_scripts/search-demographics-interactor');
var getEngagements = require('../../_scripts/get-engagements');
var getSales = require('../../_scripts/get-sales');
var getVenture = require('../../_scripts/get-venture');

var ventures_data = [
	{
		venture_id: 'v-test',
		start_date: '2013-08-01T10:09:08Z', 
		end_date: '2013-08-03T10:09:08Z',	
		engagements_search_arr: [
			{form_id: 'sales-add-form-v1.2', parent_form_id: 'permissions-add-form-v1.2'},
			{form_id: 'permissions-add-form-v1.2', parent_form_id: 'permissions-list-form-v1.2'},
			{form_id: 'permissions-list-form-v1.2', parent_form_id: 'login-form-v1.2'},
			{form_id: 'login-form-v1.2', parent_form_id: '--'},
		],
		demographics_search_arr: [
			{search_key: 'age', search_values: ['25-34', '35-44']},
			{search_key: 'marital_status', search_values: ['married']}
		]
	}
];
var engagements_data = [
	{engagement_id:'e1', date: '2013-08-02T10:09:08Z', parent_id: '--', cred_id: 'c2', form_id:'login-form-v1.2' },
	{engagement_id:'e2', date: '2013-08-02T10:10:08Z', parent_id: 'e1', cred_id: 'c2', form_id:'permissions-list-form-v1.2' },
	{engagement_id:'e3', date: '2013-08-02T10:11:08Z', parent_id: 'e2', cred_id: 'c2', form_id:'permissions-add-form-v1.2' },
	{engagement_id:'e4', date: '2013-08-02T10:20:08Z', parent_id: 'e3', cred_id: 'c2', form_id:'sales-add-form-v1.2' }
];

var sales_data = [
	{sale_id:'s1', date: '2013-08-02T10:09:08Z', engagement_id: 'e1', cred_id: 'c1', organization_id:'o1', payment_amount:"$2.00" },
	{sale_id:'s2', date: '2013-08-02T10:09:08Z', engagement_id: 'e2', cred_id: 'c2', organization_id:'o1', payment_amount:"$2.00" },
	{sale_id:'s3', date: '2013-08-02T10:09:08Z', engagement_id: 'e3', cred_id: 'c2', organization_id:'o1', payment_amount:"$2.00" },
	{sale_id:'s4', date: '2013-08-02T10:09:08Z', engagement_id: 'e4', cred_id: 'c2', organization_id:'o1', payment_amount:"$2.00" }
];
var demographics_data = [
	{
		demographic_id: 'd-test',
		cred_id: 'c0',
		age: '25-34',
		ethnicity: 'white',
		education: 'professional_degree',
		marital_status: 'married',
		employment_status: 'self-employed',
		engagement_id: 'e7'
	},
	{
		demographic_id: 'd-test',
		cred_id: 'c1',
		age: '35-44',
		ethnicity: 'black',
		education: 'professional_degree',
		marital_status: 'married',
		employment_status: 'self-employed',
		engagement_id: 'e7'
	},
	{
		demographic_id: 'd-test',
		cred_id: 'c0',
		age: '55-64',
		ethnicity: 'white',
		education: 'professional_degree',
		marital_status: 'married',
		employment_status: 'self-employed',
		engagement_id: 'e7'
	}
]
describe('addAnalyticInteractor', function(){
	it('should add analytic_obj to analytics_data', function(done){
		var data = {
			analytics_data: [], 
			engagements_data: engagements_data, 
			sales_data: sales_data,
			demographic_data: demographics_data,
			ventures_data: ventures_data
		};
		var config = {engagement_id: 'e0'};
		var args = {
			cred_id: 'c_test',
			venture_id: 'v-test'
		};
		var ext = {
			searchEngagementsInteractor: searchEngagementsInteractor,
			searchSalesInteractor: searchSalesInteractor,
			searchDemographicsInteractor: searchDemographicsInteractor,
			getEngagements: getEngagements,
			getSales: getSales,
			getVenture: getVenture
		};
		addAnalyticInteractor(data, config, args, ext, function(err, analytic_id){
			console.log(data.analytics_data)
			assert(data.analytics_data.length==1);
			assert(analytic_id);
			done();
		});
	});
});