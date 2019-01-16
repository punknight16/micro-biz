var assert = require('assert');
var listGoalsInteractor = require('../_scripts/list-goals-interactor');

var goals_data = [
	{
		goal_id: 'x0',
		cred_id: 'c0',
		goal_name: 'entrepreneur',
		goal_description: 'make money off of an internet based company',
		engagement_id: 'e12'
	}
];

describe('listGoalsInteractor', function(){
	it('should list all goal_objs from goals_data ', function(done){
		var data = {goals_data: goals_data};
		var config = {};
		var args = {
			cred_id: 'r0'
		};
		var ext = {};
		listGoalsInteractor(data, config, args, ext, function(err, goals_arr){
			//console.log('goals_arr: ', JSON.stringify(goals_arr));
			assert(goals_arr.length==1);
			done();
		});
	});
});