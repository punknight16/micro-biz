var assert = require('assert');
var receivePostData = require('../_scripts/receive-post-data');

describe('receivePostData', function(){
	it('should parse json_str', function(done){
		var req = {
			end: function(msg){console.log(msg)},
			on: function(event, cb){ 
				var chunk = JSON.stringify({token_id: 't1', resource_id: 'r1'});
				return cb(chunk)}
		};
		receivePostData(req, function(err, post_obj){
			assert(post_obj.hasOwnProperty("token_id"));
			assert(post_obj.hasOwnProperty("resource_id"));
			done();
		});
	});
	it('should parse string with =', function(done){
		var req = {
			end: function(msg){console.log(msg)},
			on: function(event, cb){ 
				var chunk = 'token_id=t1&resource_id=r1';
				return cb(chunk)}
		};
		receivePostData(req, function(err, post_obj){
			assert(post_obj.hasOwnProperty("token_id"));
			assert(post_obj.hasOwnProperty("resource_id"));
			done();
		});
	});
});