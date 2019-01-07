var assert = require('assert');
var listAccessInteractor = require('../../_scripts/list-access-interactor');

describe('listAccessInteractor', function(){
	it('should list all accessible permissions from permission_arr', function(done){
		var data = {authorization_data: []};
		var config = {};
		var args = {
			universal_id: 'r1'
		};
		var ext = {
		//functions
		};
		listAccessInteractor(data, config, args, ext, function(err, permission_arr){
			assert(permission_arr.length==17);
			done();
		});
	});
	it('should list c0\'s accessible permissions from permission_arr', function(done){
		var data = {authorization_data: []};
		var config = {};
		var args = {
			universal_id: 'c0'
		};
		var ext = {
		//functions
		};
		listAccessInteractor(data, config, args, ext, function(err, permission_arr){
			assert(permission_arr.length==4);
			done();
		});
	});
	it('should list c1\'s accessible permissions from permission_arr', function(done){
		var data = {authorization_data: []};
		var config = {};
		var args = {
			universal_id: 'c1'
		};
		var ext = {
		//functions
		};
		listAccessInteractor(data, config, args, ext, function(err, permission_arr){
			assert(permission_arr.length==9);
			done();
		});
	});
	it('should list c2\'s accessible permissions from permission_arr', function(done){
		var data = {authorization_data: []};
		var config = {};
		var args = {
			universal_id: 'c2'
		};
		var ext = {
		//functions
		};
		listAccessInteractor(data, config, args, ext, function(err, permission_arr){
			assert(permission_arr.length==4);
			done();
		});
	});
});