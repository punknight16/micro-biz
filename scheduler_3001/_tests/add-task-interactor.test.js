var assert = require('assert');
var addTaskInteractor = require('../_scripts/add-task-interactor');

describe('addTaskInteractor', function(){
	it('should add task to task_data', function(done){
		var data = {tasks_data: []};
		var config = {};
		var args = {
			cred_id: 'c_test',
			task_name: 'y_test_name',
			task_description: 'y_test_description'
		};
		var ext = {
		//functions
		};
		addTaskInteractor(data, config, args, ext, function(err, task_id){
			assert(data.tasks_data[0].hasOwnProperty('task_id'));
			assert(data.tasks_data[0].hasOwnProperty('task_name'));
			assert(data.tasks_data[0].hasOwnProperty('task_description'));
			assert(data.tasks_data[0].hasOwnProperty('task_id'));
			assert(task_id);
			done();
		});
	});
});