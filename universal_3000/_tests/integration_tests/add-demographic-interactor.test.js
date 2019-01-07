var assert = require('assert');
var addDemographicInteractor = require('../../_scripts/add-demographic-interactor');

describe('addDemographicInteractor', function(){
	it('should add salle to sales_data', function(done){
		var data = {demographic_data: []};
		var config = {};
		var args = {
			cred_id: 'c_test',
			age: '25-34',
			ethnicity: 'white',
			education: 'professional_degree',
			marital_status: 'married',
			employment_status: 'self-employed'
		};
		var ext = {
		//functions
		};
		addDemographicInteractor(data, config, args, ext, function(err, demographic_id){
			assert(data.demographic_data.length==1);
			assert(demographic_id);
			done();
		});
	});
});