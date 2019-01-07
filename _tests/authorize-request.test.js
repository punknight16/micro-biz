var assert = require('assert');
var authorizeRequest = require('../_scripts/authorize-request');

describe('authorizeRequest', function(){
	it('sign key and check permissions ', function(done){
		var data = { authorization_data: [
			{cred_id: 'c0', resource_id: 'r1', universal_id: 'r0'},
			{cred_id: 'c0', resource_id: 'r2', universal_id: 'r0'},
			{cred_id: 'c0', resource_id: 'r3', universal_id: 'r0'},
			{cred_id: 'c0', resource_id: 'r4', universal_id: 'r0'},
			{cred_id: 'c1', resource_id: 'r1', universal_id: 'c1'},
			{cred_id: 'c1', resource_id: 'r1', universal_id: 'c2'},
			{cred_id: 'c1', resource_id: 'r2', universal_id: 'c1'},
			{cred_id: 'c1', resource_id: 'r2', universal_id: 'c2'},
			{cred_id: 'c1', resource_id: 'r2', universal_id: 'r1'},
			{cred_id: 'c1', resource_id: 'r2', universal_id: 'r3'},
			{cred_id: 'c1', resource_id: 'r3', universal_id: 'a1'},
			{cred_id: 'c1', resource_id: 'r3', universal_id: 'c1'},
			{cred_id: 'c1', resource_id: 'r3', universal_id: 'c2'},
			{cred_id: 'c2', resource_id: 'r1', universal_id: 'c2'},
			{cred_id: 'c2', resource_id: 'r3', universal_id: 'c2'},
			{cred_id: 'c2', resource_id: 'r4', universal_id: 'a1'},
			{cred_id: 'c2', resource_id: 'r4', universal_id: 'c2'}
		]}
		var config = {
			token_arr: [
				{token_id: 't0', cred_id: 'c0', public_token: 'k0', private_token: 'l0'},
				{token_id: 't1', cred_id: 'c1', public_token: 'k1', private_token: 'l1'},
				{token_id: 't2', cred_id: 'c2', public_token: 'k2', private_token: 'l2'}
			],
			token_secret: ''
		};
		var args = {token_id: 't0', cred_id: 'c0', public_token: 'k0', resource_id: 'r1', universal_id: 'r1'};
		var ext = {};
		authorizeRequest(data, config, args, ext, function(err, boo){
			assert(boo);
			done();
		});
	});
});