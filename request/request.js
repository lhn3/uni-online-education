import message from '../utils/showMessage.js'

// 基础URL
let BASE_URL = 'https://mock.mengxuegu.com/mock/6246a1929a111d2ee2cb4f92/education'

const request = (options = {}) => {
	// resolve 正常响应，reject异常响应
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			timeout: 6000, // 8秒超时时间，单位ms
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