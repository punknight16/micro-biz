var assert = require('assert');
var searchDemographicsInteractor = require('../../_scripts/search-demographics-interactor.js');


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
var search_arr = [
	{search_key: 'age', search_values: ['25-34', '35-44']},
	{search_key: 'marital_status', search_values: ['married']},

];

describe('searchDemographicsInteractor', function(){
	it('should return cred_ids', function(){
		var cred_ids = searchDemographicsInteractor(demographics_data, search_arr);
		console.log(cred_ids);
		assert(cred_ids.length == 2);
	})
})
