var fs = require('fs');
var AWS = require("aws-sdk");

var s3 = new AWS.S3({
	"region": "us-west-2"
});

var bucket = 'micro-biz';


function loadFileByFileId(file_arr, file_id, cb){
	var file_index = file_arr.findIndex((item)=>{
		return (item.file_id==file_id);
	});
	if(file_index==-1){
		return cb(undefined);
	} else {
		var params = {
			Bucket: bucket,
			Key: file_arr[file_index].file_key,
			ResponseContentEncoding: 'utf8'
		};
		s3.getObject(params, function(err, data) {
			if (err) return cb([]);
			var file_data = JSON.parse(data.Body.toString() || '[]');
			cb(file_data);
		});
	}
}

function storeFileByFileId(file_arr, write_queue, file_id, file_data, cb){
	var file_index = file_arr.findIndex((item)=>{
		return (item.file_id==file_id);
	});
	if(file_index==-1){
		return cb(undefined);
	} else {
		checkoutFileByFileKey(file_arr, write_queue, file_arr[file_index].file_key, file_data, function(err1){
			if(err1) return cb(err1);
			checkinFileByFileKey(file_arr, write_queue, file_arr[file_index].file_key, function(err2){
				if(err2) return cb(err2);
				return cb();
			})
		});
	}
}

function checkoutFileByFileKey(file_arr, write_queue, file_key, file_data, cb){
	var file_index = file_arr.findIndex((file_obj)=>{
		return (file_obj.file_key === file_key);
	});
	if(file_index==-1){
		return cb('file not found');
	} else {
		if(file_arr[file_index].is_checked_out){
			//if file already checked out, then add to queue, and call queueLooper
			write_queue.push({file_id: file_arr[file_index].file_id, file_data: file_data});
		} else {
			file_arr[file_index].is_checked_out = true;
			var body_str = JSON.stringify(file_data);
			var params = {
				Body: body_str,
				Bucket: bucket,
				Key: file_arr[file_index].file_key,
				ACL: "public-read",
				ContentType: "String",
				ContentLength: body_str.length
			};
			s3.putObject(params, function(err, data) {
			//fs.writeFile(filename, JSON.stringify(file_data), 'utf8', function(err){
				return cb(err)
			});
		}
	}
}

function checkinFileByFileKey(file_arr, write_queue, file_key, cb){
	//call queueLooper()
	queueLooper(write_queue);
	//then check the file back in
	var file_index = file_arr.findIndex((file_obj)=>{
		return (file_obj.file_key === file_key);
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
		//fs.writeFileSync(write_req.filename, JSON.stringify(write_req.file_data), 'utf8');
		var body_str = JSON.stringify(write_req.file_data);
		var params = {
				Body: body_str,
				Bucket: bucket,
				Key: write_req.file_data,
				ACL: "public-read",
				ContentType: "String",
				ContentLength: body_str.length
			};
			s3.putObject(params, function(err, data) {
			//fs.writeFile(filename, JSON.stringify(file_data), 'utf8', function(err){
				return cb(err)
			});
	};
}

exports.loadFileByFileId = loadFileByFileId;
exports.storeFileByFileId = storeFileByFileId;