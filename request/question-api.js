import request from "./request.js"

//查询课程
//query条件 current页数，size每页数据
const getQuestionList=(query,current = 1,size = 10)=>{
	return request({
		method:'POST',
		url:'/question/api/question/search',
		data:{...query,current,size}
	})
}

export {
	getQuestionList
}