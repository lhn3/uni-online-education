<template>
	<view class="feedback-box center column">
		<radio-group class="radio-group" @change="radioChange">
			<label class="label">
				<radio value="1" checked color="#A2CD5A" style="transform: scale(0.7);" />内容意见
			</label>
			<label class="label">
				<radio value="2" color="#A2CD5A" style="transform: scale(0.7);" />产品建议
			</label>
			<label class="label">
				<radio value="3" color="#A2CD5A" style="transform: scale(0.7);" />其他
			</label>
		</radio-group>
		
		<textarea  v-model="state.content" maxlength="500" placeholder="请填写具体内容帮助我们了解您的意见和建议" />
		<input v-model="state.qq" maxlength="15" type="text" placeholder="填写您的QQ">
		<input v-model="state.weixin" maxlength="25" type="text" placeholder="填写您的微信">
		
		<!-- #ifdef APP-PLUS -->
		<view class="location">
			<view>您的当前位置：</view>
			<text>{{location || '获取信息中...'}} </text>
		</view>
		<!-- #endif -->
		
		<button :loading="loading" :disabled="loading" type="primary" @click="submitHandler">提交</button>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive} from "vue";
import {updateFeedback} from '@/request/my-api.js'
export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let loading = ref(false)
		let location = ref(null)
		
		let state = reactive({
			feedback:1,
			content:'',
			qq:'',
			weixin:'',
		})
		
		// 获取所在位置
		// #ifdef APP-PLUS
		uni.getLocation({
			geocode:true,
			success:(e)=>{
				location.value = e.address.province+e.address.city+e.address.district+'\n'+e.address.street
			}
		})
		// #endif
		
		//选择意见类型
		const radioChange = (e) => {
			state.feedback = e.detail.value
		}
		
		// 提交按钮
		const submitHandler = async () => {
			if(state.content.trim().length < 10){
				proxy.$message.toast('至少输入十个反馈字符')
				return;
			}else if(!state.qq.trim() && !state.weixin.trim()){
				proxy.$message.toast('请填写至少一种联系方式')
				return;
			}else if(!proxy.$utils.checkStr(state.qq.trim(),'QQ') && !proxy.$utils.checkStr(state.weixin.trim(),'weixin')){
				proxy.$message.toast('微信或QQ格式不正确')
				return;
			}
			
			loading.value = true
			uni.showLoading()
			//发送请求
			await updateFeedback(state)
			loading.value = false
			uni.hideLoading()
			proxy.$message.toast('意见反馈成功','success')
			uni.navigateBack()
		}
		return {
			loading,
			location,
			state,
			
			radioChange,
			submitHandler
		}
	}
}
</script>

<style lang="scss">
page {
		background-color: $mxg-color-grey;
	}
	
.feedback-box {
	padding: 0 30rpx;
}

.radio-group {
	margin: 30rpx 0;
	.label {
		margin-right: 30rpx;
		font-size: 30rpx;
		color: $mxg-text-color-black;
	}
}

textarea {
	border: 1px solid #e9e9e9;
	width: 100%;
	padding: 10rpx;
	line-height: 60rpx;
}

input {
	width: 100%;
	border: 1px solid #e9e9e9;
	margin-top: 30rpx;
	padding: 10rpx;
	height: 70rpx;
}

.location {
	margin: 50rpx 0;
	align-self: flex-start;
	font-size: 30rpx;
	color: $mxg-text-color-grey;
	line-height: 50rpx;
	text {
		color: $mxg-text-color-black;
	}
}
button[type=primary] {
	width: 100%;
	margin-top: 50rpx;
	background-color: $mxg-color-primary !important;
}
// .button-hover[type=primary] {
// 	background-color: $mxg-color-primary !important;
// }
</style>
