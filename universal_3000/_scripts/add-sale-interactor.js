function addSaleInteractor(data, config, args, ext, cb){
	if(typeof data == 'undefined' ||
		typeof config == 'undefined' ||
		typeof args == 'undefined' ||
		typeof ext == 'undefined') return cb('bad paramaters');
	//need to add check if the sale_id already exists
	
	var sale_id = 's-test'+Math.random().toString(32);
	var sale_obj = {
		sale_id: sale_id,
		cred_id: args.cred_id,
		organization_id: args.organization_id,
		payment_amount: args.payment_amount,
		engagement_id: args.engagement_id
	};
	data.sales_data.push(sale_obj);
	return cb(null, sale_id);
};

module.exports = addSaleInteractor;