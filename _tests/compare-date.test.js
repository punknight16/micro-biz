var assert = require('assert');
var compareDate = require('../_scripts/compare-date.js');

describe('compareDate', function(){
	it('should show test_date to be in trial period', function(done){
		var start_date_str = '2013-08-02T10:09:08Z';
		var end_date_str = '2013-08-02T10:20:08Z';
		var test_date_str = '2013-08-02T10:11:08Z';

		compareDate(start_date_str, end_date_str, test_date_str, function(err, boo){
			assert(boo);
			done();
		});
	});
	it('should show test_date to be before trial period', function(done){
		var start_date_str = '2013-08-02T10:09:08Z';
		var end_date_str = '2013-08-02T10:20:08Z';
		var test_date_str = '2013-08-02T10:07:08Z';

		compareDate(start_date_str, end_date_str, test_date_str, function(err, boo){
		 assert(!boo);
		 done();
		});
	})
	it('should show test_date to be after trial period', function(done){
		var start_date_str = '2013-08-02T10:09:08Z';
		var end_date_str = '2013-08-02T10:20:08Z';
		var test_date_str = '2013-08-02T10:21:08Z';

		compareDate(start_date_str, end_date_str, test_date_str, function(err, boo){
		 assert(!boo);
		 done();
		});
	})
})