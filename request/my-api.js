import request from "./request.js"

//查询个人余额
const updateFeedback=(data)=>{
	return request({
		method:"POST",
		url:'/system/api/feedback',
		data
	})
}

//获取短信验证码
const getSms=(data)=>{
	return request({
		method:"POST",
		url:'/system/sms/code',
		data
	})
}

//登录
const authLogin=(data)=>{
	return request({
		method:"POST",
		url:'/auth/login',
		data
	})
}

export {
	updateFeedback,
	getSms,
	authLogin
}