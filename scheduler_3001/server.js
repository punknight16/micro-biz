var http = require('http');
var fs = require('fs');

const TOKEN_SECRET = require('../_config/creds').token_secret;

var receivePostData = require('../_scripts/receive-post-data');
var compareKeys = require('../_scripts/compare-keys');
var forwardRequest = require('../_scripts/forward-request');
var signRequest = require('../_scripts/sign-request');
var listGoalsInteractor = require('./_scripts/list-goals-interactor');
var addGoalInteractor = require('./_scripts/add-goal-interactor');
var listTasksInteractor = require('./_scripts/list-tasks-interactor');
var addTaskInteractor = require('./_scripts/add-task-interactor');
var listMetricsInteractor = require('./_scripts/list-metrics-interactor');
var addMetricInteractor = require('./_scripts/add-metric-interactor');
var listLinksInteractor = require('./_scripts/list-links-interactor');
var addLinkInteractor = require('./_scripts/add-link-interactor');


var data = {
	goals_data: [
		{
			goal_id: 'x0',
			goal_name: 'entrepreneur',
			goal_description: 'build a successful website',
			engagement_id: 'e12'
		}
	],
	tasks_data: [
		{
			task_id: 'y0',
			task_name: 'paypal',
			task_description: 'build paypal portal to accept paypal and credit card',
			engagement_id: 'e13'
		}
	],
	metrics_data: [
		{	
			metric_id: 'z0',
			metric_name: 'revenue',
			metric_description: 'build revenue from existing users',
			engagement_id: 'e13'
		}
	],
	link_data: [
		{link_id: 'w0', cred_id: 'c0', goal_id: 'x0', task_id: 'y0', metric_id: 'z0'}
	]
};

var server = http.createServer(function(req, res){
	var url_params = req.url.split('/');
	switch(url_params[1]){
		case '':
			var stream = fs.createReadStream(__dirname+'/_pages/index.html');
			stream.pipe(res);
			break;
		case 'goals':
			switch(url_params[2]){
				case 'list':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/goals-list-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) return res.end(JSON.stringify(err));
								var data1 = {};
								var config1 = {token_secret: TOKEN_SECRET};
								var args1 = {
									token_id: post_obj.token_id, 
									public_token: post_obj.public_token, 
									resource_id: 'r12', 
									universal_id: post_obj.cred_id
								};
								var ext1 = {
									http: http,
									compareKeys: compareKeys,
									forwardRequest: forwardRequest
								};
								signRequest(data1, config1, args1, ext1, function(err, res_obj){
									if(err) return res.end(JSON.stringify(err));
									if(!res_obj || typeof res_obj == 'undefined') return res.end('no auth');
									var data2 = {goals_data: data.goals_data};
									var config2 = {};
									var args2 = {
										cred_id: res_obj.cred_id,
									};
									var ext2 = {}
									listGoalsInteractor(data2, config2, args2, ext2, function(err, goals_arr){
										if(err) return res.end(JSON.stringify(err));
										res.end(res_obj.engagement_id+":"+JSON.stringify(goals_arr));
									});
								});
							});
							break;
						default:
							res.end('bad request in goals/list route');
					}	
					break;
				case 'add':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/goals-add-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) return res.end(JSON.stringify(err));
								var data1 = {};
								var config1 = {token_secret: TOKEN_SECRET};
								console.log('cred_id: ', post_obj.cred_id);
								var args1 = {
									token_id: post_obj.token_id, 
									public_token: post_obj.public_token, 
									resource_id: 'r13', 
									universal_id: post_obj.cred_id
								};
								var ext1 = {
									http: http,
									compareKeys: compareKeys,
									forwardRequest: forwardRequest
								};
								signRequest(data1, config1, args1, ext1, function(err, res_obj){
									console.log('err: ', err);
									console.log('res_obj: ', res_obj);
									if(err) return res.end(JSON.stringify(err));
									if(!res_obj || typeof res_obj == 'undefined') return res.end('no auth');
									var data2 = {goals_data: data.goals_data};
									var config2 = {};
									var args2 = {
										cred_id: res_obj.cred_id,
										goal_name: post_obj.goal_name,
										goal_description: post_obj.goal_description,
										engagement_id: res_obj.engagement_id
									};
									var ext2 = {}
									addGoalInteractor(data2, config2, args2, ext2, function(err, goal_id){
										if(err) return res.end(JSON.stringify(err));
										res.end(res_obj.engagement_id+":"+JSON.stringify(goal_id));
									});
								});
							});
							break;
						default:
							res.end('bad request in goals/add route');
					}
					break;
				default:
					res.end('bad request in goals route');
			}
			break;
		case 'tasks':
			switch(url_params[2]){
				case 'list':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/tasks-list-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) return res.end(JSON.stringify(err));
								var data1 = {};
								var config1 = {token_secret: TOKEN_SECRET};
								console.log('cred_id: ', post_obj.cred_id);
								var args1 = {
									token_id: post_obj.token_id, 
									public_token: post_obj.public_token, 
									resource_id: 'r14', 
									universal_id: post_obj.cred_id
								};
								var ext1 = {
									http: http,
									compareKeys: compareKeys,
									forwardRequest: forwardRequest
								};
								signRequest(data1, config1, args1, ext1, function(err, res_obj){
									if(err) return res.end(JSON.stringify(err));
									if(!res_obj || typeof res_obj == 'undefined') return res.end('no auth');
									var data2 = {tasks_data: data.tasks_data};
									var config2 = {};
									var args2 = {
										cred_id: res_obj.cred_id,
									};
									var ext2 = {}
									listTasksInteractor(data2, config2, args2, ext2, function(err, tasks_arr){
										if(err) return res.end(JSON.stringify(err));
										res.end(res_obj.engagement_id+":"+JSON.stringify(tasks_arr));
									});
								});
							});
							break;
						default:
							res.end('bad request in goals/list route');
					}	
					break;
				case 'add':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/tasks-add-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) return res.end(JSON.stringify(err));
								var data1 = {};
								var config1 = {token_secret: TOKEN_SECRET};
								console.log('cred_id: ', post_obj.cred_id);
								var args1 = {
									token_id: post_obj.token_id, 
									public_token: post_obj.public_token, 
									resource_id: 'r13', 
									universal_id: post_obj.cred_id
								};
								var ext1 = {
									http: http,
									compareKeys: compareKeys,
									forwardRequest: forwardRequest
								};
								signRequest(data1, config1, args1, ext1, function(err, res_obj){
									console.log('err: ', err);
									console.log('res_obj: ', res_obj);
									if(err) return res.end(JSON.stringify(err));
									if(!res_obj || typeof res_obj == 'undefined') return res.end('no auth');
									var data2 = {tasks_data: data.tasks_data};
									var config2 = {};
									var args2 = {
										cred_id: res_obj.cred_id,
										task_name: post_obj.task_name,
										task_description: post_obj.task_description,
										engagement_id: res_obj.engagement_id
									};
									var ext2 = {}
									addTaskInteractor(data2, config2, args2, ext2, function(err, task_id){
										if(err) return res.end(JSON.stringify(err));
										res.end(res_obj.engagement_id+":"+JSON.stringify(task_id));
									});
								});
							});
							break;
						default:
							res.end('bad request in goals/add route');
					}
					break;
				default:
					res.end('bad request in goals route');
			}
			break;
		case 'metrics':
			switch(url_params[2]){
				case 'list':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/metrics-list-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) return res.end(JSON.stringify(err));
								var data1 = {};
								var config1 = {token_secret: TOKEN_SECRET};
								console.log('cred_id: ', post_obj.cred_id);
								var args1 = {
									token_id: post_obj.token_id, 
									public_token: post_obj.public_token, 
									resource_id: 'r16', 
									universal_id: post_obj.cred_id
								};
								var ext1 = {
									http: http,
									compareKeys: compareKeys,
									forwardRequest: forwardRequest
								};
								signRequest(data1, config1, args1, ext1, function(err, res_obj){
									if(err) return res.end(JSON.stringify(err));
									if(!res_obj || typeof res_obj == 'undefined') return res.end('no auth');
									var data2 = {metrics_data: data.metrics_data};
									var config2 = {};
									var args2 = {
										cred_id: res_obj.cred_id,
									};
									var ext2 = {}
									listMetricsInteractor(data2, config2, args2, ext2, function(err, metrics_arr){
										if(err) return res.end(JSON.stringify(err));
										res.end(res_obj.engagement_id+":"+JSON.stringify(metrics_arr));
									});
								});
							});
							break;
						default:
							res.end('bad request in goals/list route');
					}	
					break;
				case 'add':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/metrics-add-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) return res.end(JSON.stringify(err));
								var data1 = {};
								var config1 = {token_secret: TOKEN_SECRET};
								console.log('cred_id: ', post_obj.cred_id);
								var args1 = {
									token_id: post_obj.token_id, 
									public_token: post_obj.public_token, 
									resource_id: 'r13', 
									universal_id: post_obj.cred_id
								};
								var ext1 = {
									http: http,
									compareKeys: compareKeys,
									forwardRequest: forwardRequest
								};
								signRequest(data1, config1, args1, ext1, function(err, res_obj){
									console.log('err: ', err);
									console.log('res_obj: ', res_obj);
									if(err) return res.end(JSON.stringify(err));
									if(!res_obj || typeof res_obj == 'undefined') return res.end('no auth');
									var data2 = {metrics_data: data.metrics_data};
									var config2 = {};
									var args2 = {
										cred_id: res_obj.cred_id,
										goal_name: post_obj.goal_name,
										goal_description: post_obj.goal_description,
										engagement_id: res_obj.engagement_id
									};
									var ext2 = {}
									addMetricInteractor(data2, config2, args2, ext2, function(err, metric_id){
										if(err) return res.end(JSON.stringify(err));
										res.end(res_obj.engagement_id+":"+JSON.stringify(metric_id));
									});
								});
							});
							break;
						default:
							res.end('bad request in metrics/add route');
					}
					break;
				default:
					res.end('bad request in metrics route');
			}
			break;
		case 'links':
			switch(url_params[2]){
				case 'list':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/links-list-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) return res.end(JSON.stringify(err));
								var data1 = {};
								var config1 = {token_secret: TOKEN_SECRET};
								console.log('cred_id: ', post_obj.cred_id);
								var args1 = {
									token_id: post_obj.token_id, 
									public_token: post_obj.public_token, 
									resource_id: 'r18', 
									universal_id: post_obj.cred_id
								};
								var ext1 = {
									http: http,
									compareKeys: compareKeys,
									forwardRequest: forwardRequest
								};
								signRequest(data1, config1, args1, ext1, function(err, res_obj){
									if(err) return res.end(JSON.stringify(err));
									if(!res_obj || typeof res_obj == 'undefined') return res.end('no auth');
									var data2 = {links_data: data.links_data};
									var config2 = {};
									var args2 = {
										cred_id: res_obj.cred_id,
									};
									var ext2 = {}
									listLinksInteractor(data2, config2, args2, ext2, function(err, links_arr){
										if(err) return res.end(JSON.stringify(err));
										res.end(res_obj.engagement_id+":"+JSON.stringify(links_arr));
									});
								});
							});
							break;
						default:
							res.end('bad request in goals/list route');
					}	
					break;
				case 'add':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/links-add-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) return res.end(JSON.stringify(err));
								var data1 = {};
								var config1 = {token_secret: TOKEN_SECRET};
								console.log('cred_id: ', post_obj.cred_id);
								var args1 = {
									token_id: post_obj.token_id, 
									public_token: post_obj.public_token, 
									resource_id: 'r13', 
									universal_id: post_obj.cred_id
								};
								var ext1 = {
									http: http,
									compareKeys: compareKeys,
									forwardRequest: forwardRequest
								};
								signRequest(data1, config1, args1, ext1, function(err, res_obj){
									if(err) return res.end(JSON.stringify(err));
									if(!res_obj || typeof res_obj == 'undefined') return res.end('no auth');
									var data2 = {links_data: data.links_data};
									var config2 = {};
									var args2 = {
										cred_id: res_obj.cred_id,
										goal_id: post_obj.goal_id,
										task_id: post_obj.task_id,
										metric_id: post_obj.metric_id,
										engagement_id: res_obj.engagement_id
									};
									var ext2 = {}
									addLinkInteractor(data2, config2, args2, ext2, function(err, link_id){
										if(err) return res.end(JSON.stringify(err));
										res.end(res_obj.engagement_id+":"+JSON.stringify(link_id));
									});
								});
							});
							break;
						default:
							res.end('bad request in goals/add route');
					}
					break;
				default:
					res.end('bad request in goals route');
			}
			break;
		default:
			res.end('bad request');
	}
}).listen(3001, function(){
	console.log('schedule creator is running on 3001');
});


