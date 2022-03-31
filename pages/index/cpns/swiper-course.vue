<template>
	<view class="list-box">
		<view class="title space-between center">
			<view class="center">
				<text class="name">热门推荐</text>
				<text class="word">HOT</text>
			</view>
			<view class="all">
				<text>全部</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		<swiper class="list-scroll" next-margin="20rpx">
			<swiper-item class="list-scroll-view">
				<course-item></course-item>
				<view>123</view>
				<view>123</view>
				<view>123</view>
			</swiper-item>
			<swiper-item>
				<view>456</view>
				<view>456</view>
				<view>456</view>
				<view>456</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import {getCurrentInstance} from "vue";
import { onShow,onReady } from '@dcloudio/uni-app';
export default {
	setup(){
		
	}
}
</script>

<style lang="scss">
.list-box {
	margin-top: 60rpx;
	.name {
		font-size: 38rpx;
		font-weight: 500;
		color: #303133;
		margin-right: 10rpx;
	}
	.word {
		font-size: 20rpx;
		background-image: linear-gradient(to right, $mxg-color-orange, $mxg-text-color-red);
		color: #fff;
		padding: 0 10rpx;
		border-radius: 30rpx 30rpx 30rpx 0;
	}
	.all {
		font-weight: normal;
		color: $mxg-text-color-grey;
		font-size: 28rpx;
		.iconfont {
			font-size: 25rpx;
		}
	}
	.list-scroll {
		// 不换行，一行显示
		white-space: nowrap;
		height: 380rpx;
		.list-scroll-view {
			display: inline-block;
			width: 310rpx;
			padding: 0 10rpx;
			margin-right: 20rpx;
			border-radius: 20rpx;
			box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
			background-color: #fff;
		}
	}
}
</style>
