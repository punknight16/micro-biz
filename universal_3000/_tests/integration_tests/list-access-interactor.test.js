var assert = require('assert');
var listAccessInteractor = require('../../_scripts/list-permissions-interactor');
var authorization_data = [{"cred_id":"c0","resource_id":"r1","universal_id":"r0"},{"cred_id":"c1","resource_id":"r1","universal_id":"c1"}];

describe('listAccessInteractor', function(){
	it('should list all accessible permissions from permission_arr', function(done){
		var data = {authorization_data: authorization_data};
		var config = {};
		var args = {
			universal_id: 'r0'
		};
		var ext = {
		//functions
		};
		listAccessInteractor(data, config, args, ext, function(err, permission_arr){
			assert(permission_arr.length==2);
			done();
		});
	});
	it('should list c0\'s accessible permissions from permission_arr', function(done){
		var data = {authorization_data: authorization_data};
		var config = {};
		var args = {
			universal_id: 'c0'
		};
		var ext = {
		//functions
		};
		listAccessInteractor(data, config, args, ext, function(err, permission_arr){
			assert(permission_arr.length==1);
			done();
		});
	});
	it('should list c1\'s accessible permissions from permission_arr', function(done){
		var data = {authorization_data: authorization_data};
		var config = {};
		var args = {
			universal_id: 'c1'
		};
		var ext = {
		//functions
		};
		listAccessInteractor(data, config, args, ext, function(err, permission_arr){
			assert(permission_arr.length==1);
			done();
		});
	});
	it('should list c2\'s accessible permissions from permission_arr', function(done){
		var data = {authorization_data: authorization_data};
		var config = {};
		var args = {
			universal_id: 'c2'
		};
		var ext = {
		//functions
		};
		listAccessInteractor(data, config, args, ext, function(err, permission_arr){
			assert(permission_arr.length==0);
			done();
		});
	});
});