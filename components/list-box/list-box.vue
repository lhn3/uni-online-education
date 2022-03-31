<template>
	<view class="list-box">
		<view class="title space-between center">
			<view class="center">
				<text class="name">{{title}}</text>
				<text class="word" v-if="word">{{word}}</text>
			</view>
			<view class="all" v-if="all">
				<text>全部</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
import {getCurrentInstance} from "vue";
import { onShow,onReady } from '@dcloudio/uni-app';
export default {
	props:{
		title:{
			type:String,
			default:'默认标题',
			},
		word:{
			type:String,
			default:''
		},
		all:{
			type:Boolean,
			default:false
		},
	},
	setup(){
		return{}
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
}
</style>
