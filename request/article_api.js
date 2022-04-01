import request from "./request.js"

//查询轮播图
const getBanners = (position = 1) => {
	return request({
		url:'/article/api/advert/show/'+position
	})
}

// 查询分类
const getCategory = () => {
	return request({
		url:'/article/api/category/label/list'
	})
}

export {
	getBanners,
	getCategory
}