import message from './showMessage.js'
import store from '@/store/index.js'


let BASE_URL = 'https://mock.mengxuegu.com/mock/6246a1929a111d2ee2cb4f92/education'

// 上传图片
const upload = (options = {}) => {
	// resolve 正常响应，reject异常响应
	return new Promise((resolve, reject) => {
		//判断是否登录
		if(!store.state.token){
			return uni.redirectTo({
				url:'/pages/auth/login'
			})
		}
		
		uni.uploadFile({
		    url: BASE_URL + options.url, // 服务器 url
		    filePath: options.filePath, // 要上传文件资源的路径。
		    name: options.name || 'file', // File 对象对应 key
			formData: options.data || {}, //额外的 form data 
			timeout: 8000, // 8秒超时时间，单位ms
			header:{'Authorization':'Bearer '+store.state.token},
			success: (res) => {
				if(res.statusCode === 200) {
					// 响应的数据是json字符串，把它转成对象
					resolve(JSON.parse(res.data))
				}else {
					// 404 ，500等错误码
					reject(res)
				}
			},
			fail: (err) => {
				message.toast('请求接口失败','error')
				reject(err)
			},
		})
	}) 
}

// 导出
export default upload