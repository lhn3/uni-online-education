import {createStore} from 'vuex'

const store = createStore({
	state:{
		mobile:'',
		token:'',
		username:'',
		nickName:'',
		imageUrl:''
	},
	mutations:{
		// 登陆成功保存用户信息
		saveUserInfo(state,value){
			state.mobile = value.mobile
			state.token = value.token
			state.username = value.username
			state.nickName = value.nickName
			state.imageUrl = value.imageUrl
			uni.setStorageSync('educationToken',value.token)
			uni.setStorageSync('educationUserInfo',value)
		},
		
		// 退出登录清除用户信息
		removeUserInfo(state){
			state.mobile = ''
			state.token = ''
			state.username = ''
			state.nickName = ''
			state.imageUrl = ''
			uni.removeStorageSync('educationToken')
			uni.removeStorageSync('educationUserInfo')
		},
		
		// 刷新vuex数据持久化
		keepUserInfo(state){
			let res = uni.getStorageSync('educationUserInfo')
			state.mobile = res.mobile
			state.token = res.token
			state.username = res.username
			state.nickName = res.nickName
			state.imageUrl = res.imageUrl
		}
		
	},
	action:{},
	getters:{},
	modules:{}
})

// 刷新保持vueX数据
const keepVuex=()=>{
	store.commit('keepUserInfo')
}

export {
	store,
	keepVuex
}