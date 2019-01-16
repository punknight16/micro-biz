var assert = require('assert');
var addGoalInteractor = require('../_scripts/add-goal-interactor');

describe('addGoalInteractor', function(){
	it('should add goal to goal_data', function(done){
		var data = {goals_data: []};
		var config = {};
		var args = {
			cred_id: 'c_test',
			goal_name: 'x_test_name',
			goal_description: 'x_test_description'
		};
		var ext = {
		//functions
		};
		addGoalInteractor(data, config, args, ext, function(err, goal_id){
			assert(data.goals_data[0].hasOwnProperty('goal_id'));
			assert(data.goals_data[0].hasOwnProperty('goal_name'));
			assert(data.goals_data[0].hasOwnProperty('goal_description'));
			assert(data.goals_data[0].hasOwnProperty('engagement_id'));
			assert(goal_id);
			done();
		});
	});
});