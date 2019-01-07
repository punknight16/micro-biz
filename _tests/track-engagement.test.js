var assert = require('assert');
var trackEngagement = require('../_scripts/track-engagement');

var engagements_data = [
	{engagement_id:'e1', date: 'test', parent_id: '--', cred_id: 'c0', form_id:'login-form-v1.2' },
	{engagement_id:'e2', date: 'test', parent_id: 'e1', cred_id: 'c1', form_id:'list-access-form-v1.2' },
	{engagement_id:'e3', date: 'test', parent_id: 'e2', cred_id: 'c2', form_id:'add-access-form-v1.2' },
	{engagement_id:'e4', date: 'test', parent_id: 'e3', cred_id: 'c2', form_id:'list-sales-form-v1.2' }
];

var last_engagement_arr = [
	{cred_id: 'c0', engagement_id: 'e1'}
];

describe('trackEngagement', function(){
	it('should add an engagement_obj to engagements_data, and update last_eng_arr ', function(done){
		var data = {engagements_data: engagements_data};
		var config = {last_engagement_arr: last_engagement_arr};
		var args = {cred_id: 'c0', form_id: 'login-form-v1.2'};
		var ext = {};
		trackEngagement(data, config, args, ext, function(err, engagement_id){
			assert(err===null)
			assert(engagement_id);
			done();
		});
	});
});