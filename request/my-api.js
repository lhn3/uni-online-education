import request from "./request.js"

//查询个人余额
const updateFeedback=(data)=>{
	return request({
		method:"POST",
		url:'/system/api/feedback',
		data
	})
}

export {
	updateFeedback
}