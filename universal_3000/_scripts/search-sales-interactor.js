
function searchSalesInteractor(data, config, args, ext, cb){

	var sales_arr = filterSalesByDate(data.sales_data, args.start_date, args.end_date);
	
	var sales_arr_w_nums = sales_arr.map((item)=>{
		
		var number = Number(item.payment_amount.replace(/[^0-9\.]+/g, ""));	
		return {payment_total: number}
	});
	var sales_total_num = reduceBy(sales_arr_w_nums, 'payment_total')
	
	var sales_total = '$'.concat(sales_total_num.toFixed(2))
	return cb(null, sales_total);

};

function filterSalesByDate(sales_data, start_date, end_date){
	var sales_arr = sales_data.filter((item)=>{
		return(compareDate(start_date, end_date, item.date));
	});
	return sales_arr;
}



function compareDate(start_date_str, end_date_str, test_date_str, cb){
	var start_date = new Date(start_date_str);
  var end_date = new Date(end_date_str);
  var test_date = new Date(test_date_str);

  var diff1 = test_date - start_date;
  var diff2 = test_date - end_date;
  //diff1 should be positve and diff2 should be negative;
  if(diff2 * diff1 <= 0){
		return true; 	
  } else {
  	return false
  }
}

function reduceBy(objectArray, sum_property) {
  return objectArray.reduce((acc, obj)=>{
   	acc += obj[sum_property];
   	return acc; 
  }, 0);
}



module.exports = searchSalesInteractor;
