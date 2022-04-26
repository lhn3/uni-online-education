<template>
	<view>
		<view class="center column">
			<image class="logo" src="/static/images/logo.png" lazy-load mode="widthFix"></image>
			<text class="version">Version 1.0.0</text>
		</view>
		
		<view class="center-content">
			<p>昭和系奥特曼：佐菲、初代、赛文、杰克、艾斯、泰罗、雷欧、爱迪、奥特之王、阿斯特拉、尤迪安、葛雷、帕瓦特。</p>
			<p>平成系奥特曼：哉阿斯、迪迦、戴拿、盖亚、阿古茹、高斯、杰斯提斯、雷杰多、奈克瑟斯、诺亚。</p>
			<p>复古系奥特曼：雷欧斯、赛文21、麦克斯、杰诺、梦比优斯、希卡利、赛罗。</p>
			<p>黑暗奥特曼：夏德、邪恶迪迦、卡蜜拉、希特拉、达拉姆、卡欧斯、强化奈欧斯、黑暗浮士德、黑暗梅菲斯特、邪恶蓝色赛文、卡欧斯奥特曼、黑暗迪迦、贝利亚·奥特曼 、扎基。</p>
		</view>
		<image class="atm" src="/static/images/atm.png" mode="widthFix"></image>
		<view class="bottom">
			Copyright &copy; 2022 mengxuegu.com All rights reserved
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		
	}
}
</script>

<style lang="scss">
page {
	background-color: $mxg-color-grey;
}
.logo {
	width: 360rpx;
}
.version {
	font-size: 30rpx;
	color: $mxg-color-primary;
	font-weight: 500;
}

.center-content {
	font-size: 26rpx;
	color: $mxg-text-color-black;
	margin-top: 50rpx;
	padding: 0 30rpx;
	width: 750rpx;
	overflow: hidden;
	p {
		text-indent: 2em;
		margin-bottom: 20rpx;
		width: 100%;
	}
}
.atm{
	display: block;
	width: 750rpx;
}
.bottom {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 20rpx;
	font-size: 20rpx;
	color: $mxg-text-color-grey;
	text-align: center;
}
</style>
