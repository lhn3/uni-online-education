<template>
	<view>
		<!-- #ifndef MP -->
		<!-- 头部空出的距离 -->
		<view class="status_bar"></view>
		<!-- #endif -->
		
		<!-- 头部用户信息 -->
		<view class="my-header">
			<view @click="navTo('/pages/auth/login')" class="header-content space-between center">
				<view class="left center">
					<image class="header-image" src="/static/logo.png" ></image>
					<view v-if="false" class="header-info column">
						<text class="nickname">梦小二</text>
						<text class="username">用户名：mengxuegu</text>
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
import {getCurrentInstance,ref,reactive} from "vue";
export default {
	setup(){
		let {proxy} = getCurrentInstance()
		let list = ref(data)
		
		return{
			list
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
