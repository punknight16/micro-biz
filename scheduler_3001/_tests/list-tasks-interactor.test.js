var assert = require('assert');
var listTasksInteractor = require('../_scripts/list-tasks-interactor');

var tasks_data = [
	{
		task_id: 'x0',
		cred_id: 'c0',
		task_name: 'entrepreneur',
		task_description: 'make money off of an internet based company',
		engagement_id: 'e12'
	}
];

describe('listTasksInteractor', function(){
	it('should list all task_objs from tasks_data ', function(done){
		var data = {tasks_data: tasks_data};
		var config = {};
		var args = {
			cred_id: 'r0'
		};
		var ext = {};
		listTasksInteractor(data, config, args, ext, function(err, tasks_arr){
			assert(tasks_arr.length==1);
			done();
		});
	});
});