var assert = require('assert');
var addAccessInteractor = require('../../_scripts/add-permission-interactor');

describe('addAccessInteractor', function(){
	it('should add permission to authorization_data', function(done){
		var data = {authorization_data: []};
		var config = {};
		var args = {
			cred_id: 'c_test',
			resource_id: 'r_test',
			universal_id: 'u_test'
		};
		var ext = {
		//functions
		};
		addAccessInteractor(data, config, args, ext, function(err, permission_id){
			assert(data.authorization_data.length==1);
			assert(permission_id);
			done();
		});
	});
});