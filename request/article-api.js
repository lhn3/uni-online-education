import request from "./request.js"

//查询课程
//query条件 current页数，size每页数据
const getArticleList=(query,current = 1,size = 10)=>{
	return request({
		method:'POST',
		url:'/article/api/article/search',
		data:{...query,current,size}
	})
}

//获取文章详情
const getArticleDetail=(id)=>{
	return request({
		url:'/article/api/article/'+id,
	})
}

export {
	getArticleList,
	getArticleDetail
}