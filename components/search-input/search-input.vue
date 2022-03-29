<template>
	<view class="header">
		<input class="search" type="text" placeholder="请输入搜索内容" disabled>
	</view>
</template>

<script>
	export default {
		name:"search-input",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.header{
		position:fixed;
		margin: 10rpx;
	}
	.search{
		text-align: center;
		width: 730rpx;
		height: 60rpx;
		background-color: rgba(255,255,255,0.5);
		border-radius: 30rpx;
	}

</style>
