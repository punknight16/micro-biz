function receiveCookieData (req, cb){
	var cookie_str = req.headers.cookie;
	var slice_index = cookie_str.indexOf('=');
	var cookie_arr = (cookie_str.slice(slice_index+1)).split('.');
	var cookie_obj = {
		token_id: cookie_arr[0],
		public_token: cookie_arr[1],
		cred_id: cookie_arr[2]
	};
	return cb(null, cookie_obj);
}

module.exports = receiveCookieData;