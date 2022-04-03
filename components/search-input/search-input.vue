<template>
	<view class="header">
		<input class="search" type="text" placeholder="请输入搜索内容" disabled>
	</view>
</template>

<script>
export default {
	setup(){
		
	}
}
</script>

<style lang="scss">
.header{
	position:fixed;
	padding: 10rpx;
	z-index: 1;
	background-color: $mxg-color-primary;
	.search{
		text-align: center;
		width: 730rpx;
		height: 60rpx;
		background-color: rgba(255,255,255,0.5);
		border-radius: 30rpx;
	}
}


</style>
