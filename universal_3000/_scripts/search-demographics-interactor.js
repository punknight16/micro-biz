


function searchDemographicsInteractor(demographics_data, search_arr){
	var cred_ids = demographics_data.reduce((acc, cur)=>{
		var boo = true;
		search_arr.map((item)=>{
			if(item.search_values.indexOf(cur[item.search_key])==-1){
				boo = false;
			}
		})
		if(boo){
			acc.push(cur.cred_id)		
		}
		return acc;
	}, []);
	return cred_ids;
};



module.exports = searchDemographicsInteractor;
