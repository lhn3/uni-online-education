import {createStore} from 'vuex'

export default createStore({
	state:{
		mobile:'',
		token:'',
		username:'',
		nickName:'',
		imageUrl:'',
		sex:''
	},
	mutations:{
		// 登陆成功保存用户信息
		saveUserInfo(state,value){
			state.mobile = value.mobile
			state.token = value.token
			state.username = value.username
			state.nickName = value.nickName
			state.imageUrl = value.imageUrl
			state.sex = value.sex
			uni.setStorageSync('educationToken',value.token)
			uni.setStorageSync('educationUserInfo',value)
		},
		
		// 退出登录清除用户信息
		loginOut(state){
			state.token = ''
			state.mobile = ''
			state.username = ''
			state.nickName = ''
			state.imageUrl = ''
			state.sex = ''
			uni.removeStorageSync('educationUserInfo')
			uni.removeStorageSync('educationToken')
		},
		
		// 刷新vuex数据持久化
		keepUserInfo(state){
			let res = uni.getStorageSync('educationUserInfo')
			state.mobile = res.mobile
			state.token = res.token
			state.username = res.username
			state.nickName = res.nickName
			state.imageUrl = res.imageUrl
			state.sex = res.sex
		},
		
		// 修改头像
		saveUserImageUrl(state,value){
			let res = uni.getStorageSync('educationUserInfo')
			state.imageUrl = value.imageUrl
			res.imageUrl = value.imageUrl
			uni.setStorageSync('educationUserInfo',res)
		},
		
		// 修改手机号码
		saveUserMobile(state,value){
			let res = uni.getStorageSync('educationUserInfo')
			state.mobile = value.mobile
			res.mobile = value.mobile
			uni.setStorageSync('educationUserInfo',res)
		},
		
		// 修改昵称
		saveUserNickName(state,value){
			let res = uni.getStorageSync('educationUserInfo')
			state.nickName = value.nickName
			res.nickName = value.nickName
			uni.setStorageSync('educationUserInfo',res)
		},
		
		// 修改性别
		saveUserSex(state,value){
			let res = uni.getStorageSync('educationUserInfo')
			state.sex = value.sex
			res.sex = value.sex
			uni.setStorageSync('educationUserInfo',res)
		},
		
	},
	action:{},
	getters:{},
	modules:{}
})
