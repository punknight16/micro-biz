var assert = require('assert');
var compareKeys = require('../_scripts/compare-keys');

describe('compareKeys', function(){
	it('should compare public token with private token using token secret and return boo', function(done){
		var public_token = 'k1';
		var private_token = 'l1';
		const TOKEN_SECRET = '';
		compareKeys(public_token, private_token, TOKEN_SECRET, function(err, boo){
			assert(boo);
			done();
		})
	})
})