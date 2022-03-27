import { msg } from './util.js'

// 基础URL
// #ifndef H5
// 非h5端，改为自己的服务地址
let BASE_URL = 'https://mock.mengxuegu.com/mock/5fdc6ffb5b350029c77c973a/mxg-education-app'
// #endif

// #ifdef H5
// h5, 进行代理转发
let BASE_URL = '/api'
// #endif

// 上传图片
const upload = (options = {}) => {
	// resolve 正常响应，reject异常响应
	return new Promise((resolve, reject) => {
		uni.uploadFile({
		    url: BASE_URL + options.url, // 服务器 url
		    filePath: options.filePath, // 要上传文件资源的路径。
		    name: options.name || 'file', // File 对象对应 key
			formData: options.data || {}, //额外的 form data 
			timeout: 8000, // 8秒超时时间，单位ms
			success: (res) => {
				if(res.statusCode === 200) {
					console.log('res.data', res.data)
					// 响应的数据是json字符串，把它转成对象
					resolve(JSON.parse(res.data))
				}else {
					// 404 ，500等错误码
					reject(res)
				}
			},
			fail: (err) => {
				msg('请求接口失败')
				reject(err)
			},
		})
	}) 
}

// 导出
export default upload