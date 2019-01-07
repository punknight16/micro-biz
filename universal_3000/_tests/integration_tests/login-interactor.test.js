var assert = require('assert');
var loginInteractor = require('../../_scripts/login-interactor');

describe('loginInteractor', function(){
	it('should log a person in and add their token to a token_arr', function(done){
		var token_arr = [];
		var data = {authorization_data: []};
		var config = {token_arr: token_arr, pass_secret: ''};
		var args = {
			email: 'u1%40mail.com',
			password: '123'
		};
		var ext = {
		//functions
		};
		loginInteractor(data, config, args, ext, function(err, token_obj){
			assert(token_obj.hasOwnProperty('cred_id'));
			assert(token_obj.hasOwnProperty('token_id'));
			assert(token_obj.hasOwnProperty('public_token'));
			assert(token_arr.length==1);
			done();
		});
	});
});