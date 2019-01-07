var http = require('http');
var fs = require('fs');

var receivePostData = require('../_scripts/receive-post-data.js');
var authorizeRequest = require('../_scripts/authorize-request.js');
var trackEngagement = require('../_scripts/track-engagement.js');
var loginInteractor = require('./_scripts/login-interactor.js');
var listPermissionsInteractor = require('./_scripts/list-permissions-interactor.js');
var addPermissionInteractor = require('./_scripts/add-permission-interactor.js');
var listSalesInteractor = require('./_scripts/list-sales-interactor.js');
var addSaleInteractor = require('./_scripts/add-sale-interactor.js');
var listEngagementsInteractor = require('./_scripts/list-engagements-interactor.js');
var inspectDemographicInteractor = require('./_scripts/inspect-demographic-interactor.js');
var addDemographicInteractor = require('./_scripts/add-demographic-interactor.js');
var listVenturesInteractor = require('./_scripts/list-ventures-interactor.js');
var addVentureInteractor = require('./_scripts/add-venture-interactor.js');
var listAnalyticsInteractor = require('./_scripts/list-analytics-interactor.js');
var addAnalyticInteractor = require('./_scripts/add-analytic-interactor.js');
var searchEngagementsInteractor = require('./_scripts/search-engagements-interactor');
var searchSalesInteractor = require('./_scripts/search-sales-interactor');
var searchDemographicsInteractor = require('./_scripts/search-demographics-interactor');
var getEngagements = require('./_scripts/get-engagements');
var getSales = require('./_scripts/get-sales');
var getVenture = require('./_scripts/get-venture');


var data = { 
	authorization_data: [],
	sales_data: [],
	engagements_data: [],
	demographic_data: [],
	ventures_data: [],
	analytics_data: []
};

var token_arr = [
	{token_id: 't0', cred_id: 'c0', public_token: 'k0', private_token: 'l0'},
	{token_id: 't1', cred_id: 'c1', public_token: 'k1', private_token: 'l1'},
	{token_id: 't2', cred_id: 'c2', public_token: 'k2', private_token: 'l2'}
];


var last_engagement_arr = [
	{cred_id: '--', engagement_id: '--'}
];

var write_queue = [];

var path_arr = __dirname.split('/');
path_arr.pop()
var absolute_path = path_arr.join('/');

var file_arr = [
	{file_id: 'f1', filename: absolute_path+'/_data/authorization_data.cso', is_checked_out: false},
	{file_id: 'f2', filename: absolute_path+'/_data/sales_data.cso', is_checked_out: false},
	{file_id: 'f3', filename: absolute_path+'/_data/engagements_data.cso', is_checked_out: false},
	{file_id: 'f4', filename: absolute_path+'/_data/demographic_data.cso', is_checked_out: false},
	{file_id: 'f5', filename: absolute_path+'/_data/ventures_data.cso', is_checked_out: false},
	{file_id: 'f6', filename: absolute_path+'/_data/analytics_data.cso', is_checked_out: false}
];

loadFileByFilename(absolute_path+'/_data/authorization_data.cso', function(authorization_data){
	data.authorization_data = authorization_data;
});
loadFileByFilename(absolute_path+'/_data/sales_data.cso', function(sales_data){
	data.sales_data = sales_data;
});
loadFileByFilename(absolute_path+'/_data/engagements_data.cso', function(engagements_data){
	data.engagements_data = engagements_data;
});
loadFileByFilename(absolute_path+'/_data/demographic_data.cso', function(demographic_data){
	data.demographic_data = demographic_data;
});
loadFileByFilename(absolute_path+'/_data/ventures_data.cso', function(ventures_data){
	data.ventures_data = ventures_data;
});
loadFileByFilename(absolute_path+'/_data/analytics_data.cso', function(analytics_data){
	data.analytics_data = analytics_data;
});
var server = http.createServer(function(req, res){
	var url_params = req.url.split('/');
	switch(url_params[1]){
		case '':
			var stream = fs.createReadStream(__dirname+'/_pages/index.html');
			stream.pipe(res);
			break;
		case 'login':
			switch(url_params[2]){
				case 'form':
					var stream = fs.createReadStream(__dirname+'/_pages/login.html');
					stream.pipe(res);
					break;
				case 'submit':
					receivePostData(req, function(err, post_obj){
						if(err) res.end(JSON.stringify(err));
						var data1 = {authentication_data: []};
						var config1 = {token_arr: token_arr, pass_secret: ''};
						var args1 = {
							email: post_obj.email,
							password: post_obj.password
						};
						var ext1 = {
						//functions
						};
						loginInteractor(data1, config1, args1, ext1, function(err, token_obj){
							if(err) res.end(JSON.stringify(err));
							var data2 = {engagements_data: data.engagements_data};
							var config2 = {last_engagement_arr: last_engagement_arr};
							var args2 = {cred_id: token_obj.cred_id, form_id: post_obj.form_id};
							var ext2 = {}
							trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
								storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
									if(err) res.end(JSON.stringify(err));
									res.end(JSON.stringify({
										cred_id: token_obj.cred_id,
										token_id: token_obj.token_id, 
										public_token: token_obj.public_token,
										engagement_id: engagement_id
									}));
								});
							});
						})
					});
					break;
				default:
					res.end('bad request in the login route');
      }
      break;	
		case 'permissions':
			switch(url_params[2]){
				case 'list':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/permissions-list-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = {authorization_data: data.authorization_data};
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									resource_id: 'r1',
									universal_id: post_obj.universal_id,
									public_token: post_obj.public_token
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
											if(err) res.end(JSON.stringify(err));
											var data3 = {authorization_data: data.authorization_data};
											var config3 = {};
											var args3 = {universal_id: post_obj.universal_id};
											var ext3 = {
												//functions
											};						
											listPermissionsInteractor(data3, config3, args3, ext3, function(err, permissions_arr){
												if(err) res.end(JSON.stringify(err));
												res.end(engagement_id+":"+JSON.stringify(permissions_arr));
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /permisisons/list route');
		      }
		      break;	
		    case 'add':
		    	switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/permissions-add-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = {authorization_data: data.authorization_data};
								var config1 = {token_arr: token_arr, token_secret: ''};
								//first test whether you have permission over the cred_id
								var args1A = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r2',
									universal_id: post_obj.cred_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1A, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('no permission over that user');
									//then check if you have the permission to do it yourself
									var args1B = {
										token_id: post_obj.token_id,
										public_token: post_obj.public_token,
										resource_id: post_obj.resource_id,
										universal_id: post_obj.universal_id
									};
									authorizeRequest(data1, config1, args1B, ext1, function(err, cred_id2){
										if(err) res.end(JSON.stringify(err));
										if(typeof cred_id2 == 'undefined') res.end('not authorized');
										var data2 = {engagements_data: data.engagements_data};
										var config2 = {last_engagement_arr: last_engagement_arr};
										var args2 = {cred_id: cred_id2, form_id: post_obj.form_id};
										var ext2 = {}
										trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
											storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
												if(err) res.end(JSON.stringify(err));
												var data3 = {authorization_data: data.authorization_data};
												var config3 = {};
												var args3 = {
													cred_id: post_obj.cred_id,
													resource_id: post_obj.resource_id,
													universal_id: post_obj.universal_id,
													engagement_id: engagement_id
												};
												var ext3 = {
													//functions
												};						
												addPermissionInteractor(data3, config3, args3, ext3, function(err, permission_id){
													if(err) res.end(JSON.stringify(err));
													storeFileByFilename(absolute_path+'/_data/authorization_data.cso', data.authorization_data, function(err){
														if(err) res.end(JSON.stringify(err));
														res.end(JSON.stringify({
															permission_id: permission_id,
															engagement_id: engagement_id
														}));
													});
												});
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /permissions/add route');
					}
					break;
		    default:
		    	res.end('bad request in the /permissions route');
			}
			break;
		case 'sale':
			switch(url_params[2]){
				case 'list':
					switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/sale-list-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = {authorization_data: data.authorization_data};
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r3',
									universal_id: post_obj.universal_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
											if(err) res.end(JSON.stringify(err));
											var data3 = {sales_data: data.sales_data};
											var config3 = {};
											var args3 = {universal_id: post_obj.universal_id};
											var ext3 = {
												//functions
											};						
											listSalesInteractor(data3, config3, args3, ext3, function(err, sales_arr){
												if(err) res.end(JSON.stringify(err));
												res.end(engagement_id+":"+JSON.stringify(sales_arr));
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /sale/list route');
		      }
		      break;	
		    case 'add':
		    	switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/sale-add-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = {authorization_data: data.authorization_data};
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r4',
									universal_id: post_obj.organization_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										if(err) res.end(JSON.stringify(err));
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
											if(err) res.end(JSON.stringify(err));
											var data3 = {sales_data: data.sales_data};
											var config3 = {};
											var args3 = {
												cred_id: cred_id,
												organization_id: post_obj.organization_id,
												payment_amount: post_obj.payment_amount,
												engagement_id: engagement_id
											};
											var ext3 = {
												//functions
											};						
											addSaleInteractor(data3, config3, args3, ext3, function(err, sale_id){
												if(err) res.end(JSON.stringify(err));
												storeFileByFilename(absolute_path+'/_data/sales_data.cso', data.sales_data, function(err){
													if(err) res.end(JSON.stringify(err));
													res.end(JSON.stringify({
														sale_id: sale_id,
														engagement_id: engagement_id
													}));
												});
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /sale/add route');
					}
					break;
		    default:
		    	res.end('bad request in the /sale route');
			}
			break;
		case 'tracking':
			switch(url_params[2]){
				case 'list':
		    	switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/tracking-list-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = data;
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r5',
									universal_id: post_obj.cred_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){					
											if(err) res.end(JSON.stringify(err));
											var data3 = {engagements_data: data.engagements_data};
											var config3 = {};
											var args3 = {cred_id: post_obj.cred_id};
											var ext3 = {
												//functions
											};
											listEngagementsInteractor(data3, config3, args3, ext3, function(err, engagements_arr){
												if(err) res.end(JSON.stringify(err));
												res.end(engagement_id+":"+JSON.stringify(engagements_arr));
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /tracking/list route');
					}
					break;
				default:
					res.end('bad request for tracking route');
			}
			break;
		case 'demographic':
			switch(url_params[2]){
				case 'inspect':
		    	switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/demographic-inspect-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = data;
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r6',
									universal_id: post_obj.cred_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
										if(err) res.end(JSON.stringify(err));
											var data3 = {demographic_data: data.demographic_data};
											var config3 = {};
											var args3 = {cred_id: post_obj.cred_id};
											var ext3 = {
												//functions
											};
											inspectDemographicInteractor(data3, config3, args3, ext3, function(err, demographic_obj){
												if(err) res.end(JSON.stringify(err));
												res.end(engagement_id+":"+JSON.stringify(demographic_obj));
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /demographic/list route');
					}
					break;
				case 'add':
		    	switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/demographic-add-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = {authorization_data: data.authorization_data};
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r7',
									universal_id: post_obj.cred_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
											if(err) res.end(JSON.stringify(err));
											var data3 = {demographic_data: data.demographic_data};
											var config3 = {};
											var args3 = {
												cred_id: post_obj.cred_id,
												age: post_obj.age,
												ethnicity: post_obj.ethnicity,
												education: post_obj.education,
												marital_status: post_obj.marital_status,
												employment_status: post_obj.employment_status,
												engagement_id: engagement_id
											};
											var ext3 = {
												//functions
											};						
											addDemographicInteractor(data3, config3, args3, ext3, function(err, demographic_id){
												storeFileByFilename(absolute_path+'/_data/demographic_data.cso', data.demographic_data, function(err){
													if(err) res.end(JSON.stringify(err));
													res.end(JSON.stringify({
														demographic_id: demographic_id,
														engagement_id: engagement_id
													}));
												});
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /demographic/add route');
					}
					break;
				default:
					res.end('bad request for demographic route');
			}
			break;
		case 'venture':
			switch(url_params[2]){
				case 'list':
		    	switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/venture-list-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = {authorization_data: data.authorization_data};
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r8',
									universal_id: post_obj.cred_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
											if(err) res.end(JSON.stringify(err));
											var data3 = {ventures_data: data.ventures_data};
											var config3 = {};
											var args3 = {
												cred_id: post_obj.cred_id
											};
											var ext3 = {};						
											listVenturesInteractor(data3, config3, args3, ext3, function(err, ventures_arr){
												if(err) res.end(JSON.stringify(err));
												res.end(engagement_id+':'+JSON.stringify(ventures_arr));
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /venture/list route');
					}
					break;
				case 'add':
		    	switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/venture-add-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = {authorization_data: data.authorization_data};
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r9',
									universal_id: post_obj.universal_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
											if(err) res.end(JSON.stringify(err));
											var data3 = {ventures_data: data.ventures_data};
											var config3 = {engagement_id: engagement_id};
											var args3 = {
												cred_id: cred_id,
												venture_description: post_obj.venture_description,
												start_date: post_obj.start_date,
												end_date: post_obj.end_date,
												sales_search_arr: [
													{
														amount_min: post_obj.amount_min,
														amount_max: post_obj.amount_max,
														start_date: post_obj.start_date, 
														end_date: post_obj.end_date
													}
												],
												engagements_search_arr: [
													{
														form_id: post_obj.engagement1, 
														parent_form: '--', 
														start_date: post_obj.start_date, 
														end_date: post_obj.end_date
													},
													{
														form_id: post_obj.engagement2, 
														parent_form: post_obj.engagement1, 
														start_date: post_obj.start_date, 
														end_date: post_obj.end_date
													},
													{
														form_id: post_obj.engagement3, 
														parent_form: post_obj.engagement2, 
														start_date: post_obj.start_date, 
														end_date: post_obj.end_date
													},
													{
														form_id: post_obj.engagement4, 
														parent_form: post_obj.engagement3, 
														start_date: post_obj.start_date, 
														end_date: post_obj.end_date
													}
												],
												demographics_search_arr: [
													{
														search_key: 'age',
														search_values: [
															post_obj.age1, 
															post_obj.age2,
															post_obj.age3, 
															post_obj.age4,
															post_obj.age5, 
															post_obj.age6,
															post_obj.age7, 
															post_obj.age8,
															post_obj.age9
														]
													},
													{
														search_key: 'ethnicity',
														search_values: [
															post_obj.ethnicity1, 
															post_obj.ethnicity2,
															post_obj.ethnicity3, 
															post_obj.ethnicity4,
															post_obj.ethnicity5, 
															post_obj.ethnicity6
														]
													},
													{
														search_key: 'education',
														search_values: [
															post_obj.education1, 
															post_obj.education2,
															post_obj.education3, 
															post_obj.education4,
															post_obj.education5, 
															post_obj.education6,
															post_obj.education7, 
															post_obj.education8,
															post_obj.education9,
															post_obj.education10,
															post_obj.education11
														]
													},
													{
														search_key: 'marital_status',
														search_values: [
															post_obj.marital_status1, 
															post_obj.marital_status2,
															post_obj.marital_status3, 
															post_obj.marital_status4,
															post_obj.marital_status5
														]
													},
													{
														search_key: 'employment_status',
														search_values: [
															post_obj.employment_status1, 
															post_obj.employment_status2,
															post_obj.employment_status3, 
															post_obj.employment_status4,
															post_obj.employment_status5, 
															post_obj.employment_status6,
															post_obj.employment_status7, 
															post_obj.employment_status8,
															post_obj.employment_status9
														]
													}
												]
											};
											var ext3 = {};						
											addVentureInteractor(data3, config3, args3, ext3, function(err, ventures_arr){
												storeFileByFilename(absolute_path+'/_data/ventures_data.cso', data.ventures_data, function(err){
													if(err) res.end(JSON.stringify(err));
													res.end(engagement_id+':'+JSON.stringify(ventures_arr));
												});
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /analytics/gather route');
					}
					break;
				default:
					res.end('bad request for analytics route');
			}
			break;
		case 'analytics':
			switch(url_params[2]){
				case 'list':
		    	switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/analytics-list-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = {authorization_data: data.authorization_data};
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r10',
									universal_id: post_obj.cred_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
										if(err) res.end(JSON.stringify(err));
											var data3 = {analytics_data: data.analytics_data};
											var config3 = {};
											var args3 = {
												cred_id: post_obj.cred_id
											};
											var ext3 = {};						
											listAnalyticsInteractor(data3, config3, args3, ext3, function(err, analytics_arr){
												if(err) res.end(JSON.stringify(err));
												res.end(engagement_id+':'+JSON.stringify(analytics_arr));
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /analytics/list route');
					}
					break;
				case 'add':
		    	switch(url_params[3]){
						case 'form':
							var stream = fs.createReadStream(__dirname+'/_pages/analytics-add-form.html');
							stream.pipe(res);
							break;
						case 'submit':
							receivePostData(req, function(err, post_obj){
								if(err) res.end(JSON.stringify(err));
								var data1 = {authorization_data: data.authorization_data};
								var config1 = {token_arr: token_arr, token_secret: ''};
								var args1 = {
									token_id: post_obj.token_id,
									public_token: post_obj.public_token,
									resource_id: 'r11',
									universal_id: post_obj.venture_id
								};
								var ext1 = {
								//functions
								};
								authorizeRequest(data1, config1, args1, ext1, function(err, cred_id){
									if(err) res.end(JSON.stringify(err));
									if(typeof cred_id == 'undefined') res.end('not authorized');
									var data2 = {engagements_data: data.engagements_data};
									var config2 = {last_engagement_arr: last_engagement_arr};
									var args2 = {cred_id: cred_id, form_id: post_obj.form_id};
									var ext2 = {}
									trackEngagement(data2, config2, args2, ext2, function(err, engagement_id){
										storeFileByFilename(absolute_path+'/_data/engagements_data.cso', data.engagements_data, function(err){
											if(err) res.end(JSON.stringify(err));
											var data3 = {
												analytics_data: data.analytics_data,
												demographic_data: data.demographic_data,
												engagements_data: data.engagements_data,
												ventures_data: data.ventures_data,
												sales_data: data.sales_data
											};
											var config3 = {
												engagement_id: engagement_id
											};
											var args3 = {
												cred_id: cred_id,
												venture_id: post_obj.venture_id
											};
											var ext3 = {
												searchEngagementsInteractor: searchEngagementsInteractor,
												searchSalesInteractor: searchSalesInteractor,
												searchDemographicsInteractor: searchDemographicsInteractor,
												getEngagements: getEngagements,
												getSales: getSales,
												getVenture: getVenture
											};					
											addAnalyticInteractor(data3, config3, args3, ext3, function(err, analytic_id){
												storeFileByFilename(absolute_path+'/_data/analytics_data.cso', data.analytics_data, function(err){
													if(err) res.end(JSON.stringify(err));
													res.end(engagement_id+':'+JSON.stringify(analytic_id));
												});
											});
										});
									});
								});
							});
							break;
						default:
							res.end('bad request in the /analytics/add route');
					}
					break;
				default:
					res.end('bad request for analytics route');
			}
			break;
		default:
			res.end('bad request');
	}
}).listen(process.env.PORT || 3000, function(){
	console.log('universal server running on port 3000');
});

function loadFileByFilename(filename, cb){
	fs.exists(filename, function(exists){
		if(exists){
			fs.readFile(filename, 'utf8', function(err, data){
				if(err) throw err;
				var file_data = JSON.parse(data || '[]');
				cb(file_data);
			});
		} else {
			cb([]);
		}
	});
}

function storeFileByFilename(filename, file_data, cb){
	checkoutFileByFilename(file_arr, filename, file_data, function(err1){
		if(err1) return cb(err1);
		checkinFileByFilename(file_arr, filename, function(err2){
			if(err2) return cb(err2);
			return cb();
		})
	});
}

function checkoutFileByFilename(file_arr, filename, file_data, cb){
	var file_index = file_arr.findIndex((file_obj)=>{
		return (file_obj.filename === filename);
	});
	if(file_index==-1){
		return cb('file not found');
	} else {
		if(file_arr[file_index].is_checked_out){
			//if file already checked out, then add to queue, and call queueLooper
			write_queue.push({filename: filename, file_data: file_data});
		} else {
			file_arr[file_index].is_checked_out = true;
			fs.writeFile(filename, JSON.stringify(file_data), 'utf8', function(err){
				return cb(err)
			});
		}
	}
}

function checkinFileByFilename(file_arr, filename, cb){
	//call queueLooper()
	queueLooper(write_queue);
	//then check the file back in
	var file_index = file_arr.findIndex((file_obj)=>{
		return (file_obj.filename === filename);
	});
	if(file_index==-1){
		return cb();
	} else {
		file_arr[file_index].is_checked_out = false;
		return cb();
	}
}

function queueLooper(write_queue){
	for (var i = write_queue.length - 1; i >= 0; i--) {
		var write_req = write_queue.pop();
		fs.writeFileSync(write_req.filename, JSON.stringify(write_req.file_data), 'utf8');
	};
}