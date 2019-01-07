function compareDate(start_date_str, end_date_str, test_date_str, cb){
	if(typeof start_date_str == 'undefined' ||
		end_date_str == 'undefined' ||
		test_date_str == 'undefined') return cb('bad parameters for compareDate');

	var start_date = new Date(start_date_str);
    var end_date = new Date(end_date_str);
    var test_date = new Date(test_date_str);

    var diff1 = test_date - start_date;
    var diff2 = test_date - end_date;
    //diff1 should be positve and diff2 should be negative;
    if(diff2 * diff1 <= 0){
  		return cb(null, true);  	
    } else {
    	return cb(null, false);
    }
	
}

module.exports = compareDate;

