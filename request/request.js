import message from '../utils/showMessage.js'
import store from '@/store/index.js'

// 基础URL
let BASE_URL = 'https://mock.mengxuegu.com/mock/6246a1929a111d2ee2cb4f92/education'

const request = (options = {}) => {
	return new Promise((resolve, reject) => {
		//判断请求接口是否有api,没有的需要效验登录后才可访问
		if(options.url.indexOf('api') == -1){
			//判断是否登录
			if(!store.state.token){
				return uni.redirectTo({
					url:'/pages/auth/login'
				})
			}
		}
		
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			timeout: 6000,
			header: store.state.token ? {'Authorization':'Bearer '+store.state.token} : {},
			success: (res) => {
				if (res.data.code == 200 ){
					resolve(res.data.data)
				}else{
					message.toast('请求接口失败','error')
				}
			},
			fail: (err) => {
				// console.log('err', err)
				message.toast('请求接口失败','error')
				reject(err)
			}
		})
	}) 
}

// 导出
export default request