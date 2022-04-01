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

//查询课程
//query条件 current页数，size每页数据
const getCourseList=(query,current = 1,size = 10)=>{
	return request({
		method:'POST',
		url:'/course/api/course/search',
		data:{...query,current,size}
	})
}

export {
	getBanners,
	getCategory,
	getCourseList
}