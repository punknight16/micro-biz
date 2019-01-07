function getVenture(ventures_data, venture_id){
	var venture_obj = ventures_data.find((item)=>{
		return (item.venture_id == venture_id)
	})
	if(typeof venture_obj == 'undefined'){
		return null
	} else {
		return venture_obj
	}
};

module.exports = getVenture;