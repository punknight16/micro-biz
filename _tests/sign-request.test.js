var assert = require('assert');
var signRequest = require('../_scripts/sign-request');
var compareKeys = require('../_scripts/compare-keys');

describe('signRequest', function(){
	it('should process a public_token, and return a response_obj', function(done){
		var data = {};
		var config = {token_secret: ''};
		var args = {
			token_id: 't1',
			public_token: 'k1',
			resource_id: 'r1',
			universal_id: 'u1'
		};
		var ext =  {
			http: {clientRequest: function(){}},
			compareKeys: compareKeys,
			forwardRequest: function(token_id, public_token, resource_id, universal_id, http, cb){
				var response_obj = {
					cred_id: 'c1',
					engagement_id: 'e1',
					private_token: 'l1'
				}
				return cb(null, response_obj)
			}
		}
		signRequest(data, config, args, ext, function(err, response_obj){
			assert(response_obj.hasOwnProperty('engagement_id'));
			assert(response_obj.hasOwnProperty('cred_id'));
			assert(response_obj.hasOwnProperty('private_token'));
			done();
		})
	})
})