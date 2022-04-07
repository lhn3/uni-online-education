<template>
	<view>
		<view class="center column">
			<image src="/static/images/no.png" lazy-load mode="aspectFill"></image>
			<text class="title">{{desc}}</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		desc: {
			type: String,
			default: '暂无数据'
		}
	}
}
</script>

<style>
.title {
	color: #999;
	font-size: 30rpx;
	margin-top: 30rpx;
}
</style>
