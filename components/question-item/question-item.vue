<template>
	<view class="question-item" @click="navTo(`/pages/question/details?id=${item.id}`)">
		<text class="title text-ellipsis">
			{{item.title}}
		</text>
		<view class="foot space-between">
			<view class="info-left">
				<text>
					{{formatCount(item.reply)}} 回答 · 
				</text>
				<text>
					{{formatCount(item.viewCount)}} 浏览 
				</text>
			</view>
			<view class="info-right">
				<text>{{item.nickName}} · </text>
				<text>{{ $utils.dateFormat(item.updateDate)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import {formatCount} from '@/utils/format.js'
export default {
	props: {
		item: {
			type: Object,
			default: () => ({
				id: 1,
				title: '梦老师您好，测试刷新令牌，点击浏览器刷新按钮无法触发axios的响应拦截',
				reply: 199,
				viewCount: 1000,
				nickName: '梦小二',
				updateDate: new Date()
			})
		}
	},
	setup(){
		return{
			formatCount
		}
	}
}
</script>

<style lang="scss">
.question-item {
	padding: 30rpx;
	border-bottom: 1rpx solid #f1f1f1;
	min-height: 80rpx;
	.title {
		font-size: 33rpx;
		font-weight: bold;
	}
	.foot {
		text {
			font-size: 26rpx;
			color: #999;
			padding-right: 10rpx;
		}
	}
}
</style>
