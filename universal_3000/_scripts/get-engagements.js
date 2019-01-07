function getEngagements(engagements_data, cred_ids){
	
	var engagements_arr = engagements_data.map((item)=>{
		if(typeof cred_ids.indexOf(item.cred_id) != 'undefined'){
			return item
		}
	});
	
	return engagements_arr;
}

module.exports = getEngagements;