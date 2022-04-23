<template>
	<view>
		<!-- #ifndef MP -->
		<!-- 头部空出的距离 -->
		<view class="status_bar"></view>
		<!-- #endif -->
		
		<!-- 头部用户信息 -->
		<view class="my-header">
			<view @click="handleClick" class="header-content space-between center">
				<view class="left center">
					<image class="header-image" :src="$store.state.token?$store.state.imageUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.doubanio.com%2Fview%2Frichtext%2Flarge%2Fpublic%2Fp206989042.jpg&refer=http%3A%2F%2Fimg2.doubanio.com&app=2002&size=f9999,10000'" ></image>
					<view v-if="isLogin" class="header-info column">
						<text class="nickname">{{$store.state.username}}</text>
						<text class="username">用户名：{{$store.state.nickName}}</text>
					</view>
					<view v-else class="header-info">
						<text class="nickname">请登录</text>
					</view>
				</view>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		
		<!-- 功能列表 -->
		<my-list :list="list" ></my-list>
	</view>
</template>

<script>
import data from '@/config/my-list-bar.js'
import {getCurrentInstance,ref,reactive,computed} from "vue";
import {useStore} from 'vuex'
export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let store = useStore()
		let userInfo = ref({})
		let list = ref(data)
		let isLogin = ref(false)
		
		//获取是否登录
		isLogin = computed(()=>{
			if(store.state.token) {
				return true
			}else{
				return false
			}
		})
		
		//点击头像部分
		let handleClick=()=>{
			if(isLogin.value){
				//前往个人信息页面
				console.log('前往个人信息页面')
				// proxy.navTo('/pages/auth/login')
			}else{
				proxy.navTo('/pages/auth/login')
			}
		}
		return{
			list,
			isLogin,
			
			handleClick
		}
	}
}
</script>

<style lang="scss">
.status_bar {
	height: calc(var(--status-bar-height) + 48px);
	width: 100%;
	background-color: $mxg-color-primary;
}

.my-header {
	background-color: $mxg-color-primary;
	.header-content {
		padding: 50rpx 39rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx 30rpx 0 0;
	}
	
	.left {
		.header-image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 80rpx;
		}
		.header-info{
			margin-left: 30rpx;
			.nickname {
				font-size: 39rpx;
				font-weight: bold;
			}
			.username {
				font-size: 33rpx;
				color: $mxg-text-color-grey;
			}
		}
	}
	
	.icon-right {
		font-size: 35rpx;
		color: $mxg-text-color-grey;
	}
}
</style>
