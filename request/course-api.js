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

//根据id查询课程详细信息
const getCourseDetail=(id)=>{
	return request({
		url:'/course/api/course/'+id,
	})
}

//通过id查询课程章节信息
const getCourseSection=(id)=>{
	return request({
		url:'/course/api/chapter/section/list/'+id,
	})
}

//通过id查询评论列表
const getCourseComment=(id)=>{
	return request({
		url:'/course/api/commont/ist/'+id,
	})
}

//通过id查询套餐
const getCoursePackage=(id)=>{
	return request({
		url:'/course/api/group/list/'+id,
	})
}

export {
	getBanners,
	getCategory,
	getCourseList,
	getCourseDetail,
	getCourseSection,
	getCourseComment,
	getCoursePackage
}