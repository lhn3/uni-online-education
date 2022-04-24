import request from "./request.js"
import upload from "@/utils/upload.js"

//查询个人余额
const updateFeedback = (data) => {
	return request({
		method:"POST",
		url:'/system/api/feedback',
		data
	})
}

//获取短信验证码
const getSms = (data) => {
	return request({
		method:"POST",
		url:'/system/sms/code',
		data
	})
}

//手机号码登录
const authLogin = (data) => {
	return request({
		method:"POST",
		url:'/auth/login',
		data
	})
}

// 第三方登录
const authorizationLogin = (data) => {
	return request({
		method:"POST",
		url:'/auth/login/provider',
		data
	})
}

//手机号码绑定或修改
const resetMobile = (data) => {
	return request({
		method:'PUT',
		url:'/auth/user/mobile',
		data
	})
}

//更新用户信息
const updateUserInfo = (data) => {
	return request({
		method:'PUT',
		url:'/system/user',
		data
	})
}

//上传图片接口
const uploadImg=(filePath)=>{
	return upload({
		url:'/article/file/upload',
		filePath
	})
}

export {
	updateFeedback,
	getSms,
	authLogin,
	authorizationLogin,
	resetMobile,
	updateUserInfo,
	uploadImg
}