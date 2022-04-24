<template>
	<view class="content">
		<view class="input-group">
			<view class="center">
				<text class="title">手机号：</text>
				<view class="row">
					<input v-model="mobile" class="mxg-input" type="number" maxlength="11" placeholder="请输入手机号码">
				</view>
			</view>
			<view class="center">
				<text class="title">验证码：</text>
				<view class="row">
					<input v-model="code" class="mxg-input" type="number" maxlength="6" placeholder="请输入验证码">
					<my-code :mobile="mobile" templateCode="SMS_1993234234"></my-code>
				</view>
			</view>
		</view>
		<button @click="submitHandler" :loading="loading" type="primary" >提交</button>
	</view>
</template>

<script>
import {getCurrentInstance,ref,reactive,computed} from "vue";
import {useStore} from 'vuex'
import {resetMobile} from '@/request/my-api.js'
export default {
	onLoad(option) {
		if(option.data) this.data = JSON.parse(option.data);
		if(option.title) {
			uni.setNavigationBarTitle({
				title: option.title
			})
		}
	}, 
	setup(){
		let {proxy} = getCurrentInstance()
		let store = useStore()
		let loading = ref(false)
		let data = ref(null)
		let mobile = ref('')
		let code = ref('')

		const submitHandler = async () => {
			if(!proxy.$utils.checkStr(mobile.value,'mobile')){
				proxy.$message.toast('请输入正确格式的手机号')
				return;
			}else if(!proxy.$utils.checkStr(code.value,'mobileCode')){
				proxy.$message.toast('请输入正确格式的验证码')
				return;
			}else if(code.value != '666666' ){
				proxy.$message.toast('验证码错误')
				return;
			}

			// 验证通过执行登录
			uni.showLoading({mask:true})
			loading.value=true
			// 绑定手机号码传入data
			let res = await resetMobile({mobile:mobile.value,code:code.value,data:data.value})
			loading.value=false
			uni.hideLoading()
			
			// 如果是绑定手机号码
			if(!data.value){
				store.commit('saveUserInfo',{
					mobile:mobile.value,
					token:res.access_token,
					username:res.userInfo.username,
					imageUrl:res.userInfo.imageUrl,
					nickName:res.userInfo.nickName
				})
				proxy.$message.toast('绑定成功','success')
			}else{
				//如果是修改手机号码
				store.commit('saveUserMobile',{
					mobile:mobile.value
				})
				proxy.$message.toast('修改成功','success')
			}

			//页面跳转
			setTimeout(()=>{
				uni.switchTab({
					url:'/pages/tab-my/my'
				})
			},1000)
		}
		return{
			data,
			loading,
			mobile,
			code,
			
			submitHandler
		}
	}
}
</script>

<style lang="scss">
page {
	background-color: $mxg-color-grey;
}
.content {
	margin: 80rpx 20rpx;
}
.input-group {
	padding: 0 25rpx;
	background-color: #FFFFFF;
	border-radius: 10rpx;
	.title {
		font-size: 35rpx;
		height: 100rpx;
		line-height: 100rpx;
		width: 190rpx;
	}
	.mxg-input {
		flex: 1;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 35rpx;
	}
	.row {
		width: 100%;
	}
}
button[type=primary] {
	background-color: $mxg-color-primary !important;
	margin-top: 80rpx;
}
</style>
