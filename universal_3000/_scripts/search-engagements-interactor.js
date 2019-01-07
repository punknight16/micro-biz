
function searchEngagementsInteractor(data, config, args, ext, cb){
	
	var engagements_arr = filterEngagementsByDate(data.engagements_data, args.start_date, args.end_date);
	
	var reduce_arr = args.engagements_search_arr.reduce((acc, cur)=>{
		
		var filter_arr = acc.filter((item)=>{
			
			var parent_obj = getEngagementObjById(engagements_arr, item.parent_id);
			
			
			
			if(parent_obj.form_id == cur.parent_form_id  && item.form_id == cur.form_id && 
				(item.cred_id == parent_obj.cred_id || parent_obj.cred_id == '--')){
				item.parent_id = parent_obj.parent_id;
				item.form_id = parent_obj.form_id;
				return true;
			}
		});
		
		return filter_arr
	}, engagements_arr);
	
	return cb(null, reduce_arr.length);

};

function filterEngagementsByDate(engagements_data, start_date, end_date){
	
	var engagements_arr = engagements_data.filter((item)=>{
		return(compareDate(start_date, end_date, item.date));
	});
	return engagements_arr;
}



function getEngagementObjById(engagements_data, engagement_id){
	var engagement_obj = engagements_data.find((item)=>{
		return (item.engagement_id == engagement_id);
	});
	if(typeof engagement_obj == 'undefined'){
		return {parent_id: '--', form_id: '--', cred_id: '--'};
	} else {
		return engagement_obj;
	}
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

module.exports = searchEngagementsInteractor;
