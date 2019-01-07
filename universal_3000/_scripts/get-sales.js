function getSales(sales_data, cred_ids){
	var sales_arr = sales_data.map((item)=>{
		if(typeof cred_ids.indexOf(item.cred_id) != 'undefined'){
			return item
		}
	});
	return sales_arr;
}

module.exports = getSales;