var assert = require('assert');
var inspectDemographicInteractor = require('../../_scripts/inspect-demographic-interactor');

describe('inspectDemographicInteractor', function(){
	it('should inspect one demographic survey from permission_arr', function(done){
		var data = {demographic_data: [
			{
				demographic_id: 'd0',
				cred_id: 'c0',
				age: '25-34',
				ethnicity: 'white',
				education: 'professional_degree',
				marital_status: 'married',
				employment_status: 'self-employed'
			}
		]};
		var config = {};
		var args = {
			cred_id: 'c0'
		};
		var ext = {
		//functions
		};
		inspectDemographicInteractor(data, config, args, ext, function(err, demographic_obj){
			assert(demographic_obj);
			done();
		});
	});
});