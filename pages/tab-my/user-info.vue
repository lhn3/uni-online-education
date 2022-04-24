<template>
	<view>
		<my-list :list="list" 
			@chooseImg="chooseImg"
			@editUsername="editUsername"
			@editMobile="editMobile"
			@editName="editName"
			@chooseSex="chooseSex"
		/>
		<button class="logout-btn" @click="logout" type="default">退出登录</button>
		
		<view v-if="isUpdate" @click="isUpdate = false" class="mask"></view>
		<view v-if="isUpdate" class="update-box">
			<input v-model="content" class="input" focus maxlength="20" type="text">
			<view class="btn">
				<text @click="isUpdate = false" class="cancel">取消</text>
				<text @click="submitUpdate" class="update">完成</text>
			</view>
		</view>
		
	</view>
</template>

<script>
import data from '@/config/user-list-bar.js'
import {getCurrentInstance,ref,reactive,onActivated} from "vue";
import {useStore} from 'vuex'
import {uploadImg,updateUserInfo} from '@/request/my-api.js'
export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let store = useStore()
		let list = ref(null)
		let content = ref('')
		let isUpdate = ref(false)
		
		list.value = data()
		// 修改手机号码后回来更新数据
		onActivated(()=>{
			list.value = data()
		})
		
		//选择修改头像
		const chooseImg = (e) => {
			// 选择本地图片或拍照
			uni.chooseImage({
			count: 1,//默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// sourceType: ['album'], 					//从相册选择
			success: async (filePaths)=>{
				// 发送图片上传请求
				uni.showLoading({mask:true})
				let res = await uploadImg(filePaths[0])
				uni.hideLoading()
				if(res.code == 200){
					//发送更新用户信息请求
					uni.showLoading({mask:true})
					await updateUserInfo({imageUrl:res.data})
					e.src=res.data
					store.commit('saveUserImageUrl',{imageUrl:res.data})
					uni.hideLoading()
				}else{
					proxy.toast('上传失败','error')
				}
				}
			})
		}
		
		//修改用户名
		const editUsername = (e) => {
			proxy.$message.toast('用户名无法修改')
			return;
		}
		
		//修改手机号码
		const editMobile = (e) => {
			proxy.navTo('/pages/auth/bind-mobile?title=修改手机')
		}
		
		// 修改昵称
		const editName = (e) => {
			isUpdate.value = true
			content.value = e.text
		}
		
		//修改性别
		const chooseSex = (e) => {
			return;
		}
		
		// 退出登录
		const logout = async ()=>{
			await proxy.$message.confirm('确定退出登录')
			store.commit('loginOut')
			proxy.navBack()
		}
		
		//提交修改
		let submitUpdate=()=>{
			 
			return;
		}
		return{
			list,
			content,
			isUpdate,
			
			chooseImg,
			editUsername,
			editMobile,
			editName,
			chooseSex,
			logout,
			submitUpdate
		}
	}
}
</script>

<style lang="scss">
page {
	background-color: $mxg-color-grey;
}

.logout-btn {
	margin-top: 39rpx;
	background-color: #FFFFFF !important; 
	color: $mxg-text-color-black;
	border-radius: 0;
	font-weight: bold;
	&::after {
		border: 0;
	}
}
.button-hover {
	background-color: $mxg-color-grey !important;
}

.update-box {
	z-index: 10;
	position: fixed;
	// top: var(--window-top);
	top:1100rpx;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #f7f7f7;
}

.input {
	width: 100%;
	border: $mxg-underLine;
	height: 90rpx;
	font-size: 35rpx;
	padding: 0 20rpx;
	background-color: #FFFFFF;
}
.btn{
	display: flex;
	justify-content: space-between;
	.update{
		display: block;
		width: 110rpx;
		height: 70rpx;
		border-radius: 10rpx;
		margin: 20rpx;
		background-color: $mxg-color-primary;
		line-height: 70rpx;
		text-align: center;
		color: #FFFFFF;
	}
	.cancel{
		line-height: 70rpx;
		color: $mxg-color-primary;
		margin: 20rpx;
	}
}

</style>
