<template>
	<view class="mxg-code center" @click="sendSmsCode">
		<text class="code-btn" >
			{{codeDuration > 0 ? codeDuration+'s':  '获取验证码'}} 
		</text>
	</view>
</template>

<script>
let interval = null
export default {
	props: {
		mobile: { // 手机号码
			type: String,
			default: ''
		},
		templateCode: { // 短信模板代码
			type: String,
			default: ''
		}
	},
	setup(){
		
	}
}
</script>

<style lang="scss">
	.mxg-code {
		background-color: $mxg-color-primary;
		border-radius: 10rpx;
		width: 160rpx;
	}
	
	.code-btn {
		font-size: 25rpx;
		padding: 10rpx 0;
		color: #FFFFFF;
	}
</style>
