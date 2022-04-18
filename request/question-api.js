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

const getHotQuestionList=(current = 1,size = 10)=>{
	return request({
		method:'POST',
		url:'/question/api/question/hot',
		data:{current,size}
	})
}
const getNewQuestionList=(current = 1,size = 10)=>{
	return request({
		method:'POST',
		url:'/question/api/question/new',
		data:{current,size}
	})
}
const getWaitQuestionList=(current = 1,size = 10)=>{
	return request({
		method:'POST',
		url:'/question/api/question/wait',
		data:{current,size}
	})
}

// 查询问题详情
const getQuestionDetail=(id)=>{
	return request({
		url:'/question/api/question/' + id
	})
}

// 查询问题的回答列表
const getQuestionAnswerList=(id)=>{
	return request({
		url:'/question/api/reply/list/' + id
	})
}

// 新增回答	
const addQuestionAnswer=(data)=>{
	return request({
		method:"POST",
		url:'/question/reply',
		data
	})
}

// 关注问题
const focusQuestion=(id)=>{
	return request({
		method:"PUT",
		url:'/question/question/star/' + id
	})
}


export {
	getQuestionList,
	getHotQuestionList,
	getNewQuestionList,
	getWaitQuestionList,
	getQuestionDetail,
	getQuestionAnswerList,
	addQuestionAnswer,
	focusQuestion
}