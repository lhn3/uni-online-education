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
		
		<!-- 输入提示框 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose"  mode="input" title="修改昵称" :value="content"
				placeholder="请输入昵称" @confirm="changeNickName">
			</uni-popup-dialog>
		</uni-popup>
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
		let inputDialog = ref(null)	//昵称修改提示框
		
		list.value = data()
		onActivated(()=>{
			// 判断是否登录
			if(!store.state.token){
				uni.redirectTo({
					url:'/pages/auth/login'
				})
			}
			// 修改手机号码后回来更新数据
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
		let nickNameProxy = {}
		const editName = (e) => {
			inputDialog.value.open()
			content.value = e.text
			nickNameProxy = e			//浅拷贝
		}
		
		//修改性别
		const chooseSex = (e) => {
			uni.showActionSheet({
				itemList:['女','男'],//0女,1男
				success: async (res) => {
					let sex = res.tapIndex?'男':'女'	//选择出的为index
					if(sex == e.text) return;
					uni.showLoading({mask: false})
					await updateUserInfo({sex:res.tapIndex})
					e.text = sex
					store.commit('saveUserSex',{sex:res.tapIndex})
					uni.hideLoading()
				}
			})
		}
		
		// 退出登录
		const logout = async () => {
			await proxy.$message.confirm('确定退出登录')
			store.commit('loginOut')
			proxy.navBack()
		}
		
		//提交修改昵称
		let changeNickName = async (value) => {
			if(value == content.value) return;
			uni.showLoading({mask: false})
			await updateUserInfo({nickName:value})
			nickNameProxy.text = value
			store.commit('saveUserNickName',{nickName:value})
			uni.hideLoading()
		}
		return{
			list,
			content,
			isUpdate,
			inputDialog,
			
			chooseImg,
			editUsername,
			editMobile,
			editName,
			chooseSex,
			logout,
			changeNickName
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
</style>
