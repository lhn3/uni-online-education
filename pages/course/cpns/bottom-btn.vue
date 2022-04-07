<template>
	<view class="bottom center" @click="clickHandler">
		<text class="bottom-btn">{{btnText}}</text>
	</view>
</template>

<script>
export default {
	props: {
		btnText: {
			type: String, 
			default: '默认按钮'
		},
		courseId: [String, Number]
	},
	setup(props,{emit}){
		const clickHandler=()=>{
			emit('clickBottom')
		}
		return{
			clickHandler
		}
	}
}
</script>

<style lang="scss">
.bottom {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #FFFFFF; 
	height: 100rpx;
	border-top: $mxg-underLine;
}

.bottom-btn {
	width: 700rpx;
	background-color: $mxg-color-primary;
	text-align: center;
	font-size: 35rpx;
	color: #FFFFFF;
	border-radius: 50rpx;
	line-height: 80rpx;
}
</style>
