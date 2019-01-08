var fs = require('fs');

function loadFileByFileId(file_arr, file_id, cb){
	var file_index = file_arr.findIndex((item)=>{
		return (item.file_id==file_id);
	});
	if(file_index==-1){
		return cb(undefined);
	} else {
		fs.exists(file_arr[file_index].filename, function(exists){
			if(exists){
				fs.readFile(file_arr[file_index].filename, 'utf8', function(err, data){
					if(err) throw err;
					var file_data = JSON.parse(data || '[]');
					cb(file_data);
				});
			} else {
				cb([]);
			}
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
		checkoutFileByFilename(file_arr, write_queue, file_arr[file_index].filename, file_data, function(err1){
			if(err1) return cb(err1);
			checkinFileByFilename(file_arr, write_queue, file_arr[file_index].filename, function(err2){
				if(err2) return cb(err2);
				return cb();
			})
		});
	}
}

function checkoutFileByFilename(file_arr, write_queue, filename, file_data, cb){
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

function checkinFileByFilename(file_arr, write_queue, filename, cb){
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

exports.loadFileByFileId = loadFileByFileId;
exports.storeFileByFileId = storeFileByFileId;